import express from "express";
import mongoose from "mongoose";

import Employee from '../../../models/employee.js';
import { employeeAggregate } from "../../../views/employees.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const params = req.query;
    const search = params.search || null;
    let department = params.department || null;

    if (department === 'All') {
      department = null;
    }

    const sortBy = params.sortBy || 'none';

    const searchParams = {
      ...(department && { department }),
      ...(search && {
        $or: [
          { name: new RegExp(search, 'i') },
          { position: new RegExp(search, 'i') },
        ],
      }),
    };

    console.log({ searchParams });

    // Determine sorting order
    let sortOrder = {};
    if (sortBy === 'asc') {
      sortOrder = { name: 1 };
    } else if (sortBy === 'desc') {
      sortOrder = { name: -1 };
    }

    // Fetch all employees from the database with search and sorting
    const employees = await Employee
			.find(searchParams)
			.sort(sortOrder);

    // Map employees to custom response format
    const formattedEmployees = employees.map((employee) => {
      return {
        id: employee._id,
        name: employee.name,
        department: employee.department,
      };
    });

    res.json({ employees: formattedEmployees });
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

router.post('/', async (req, res) => {
	try {
		console.log('body:', req.body);

		// Extract attributes from the POST request body
		const { name, email, position, department, salary, start_date } = req.body;

		// Create a new employee instance with the extracted attributes
		const employee = new Employee({
			name,
			email,
			position,
			department,
			salary,
			start_date
		});

		// Save the new employee to the database
		const savedEmployee = await employee.save();

		// Extract necessary fields from the saved employee object
		const { _id, createdAt, updatedAt } = savedEmployee;

		const responseData = employeeAggregate(
			_id,
			name,
			email,
			position,
			department,
			salary,
			start_date,
			createdAt,
			updatedAt
		)

		res.json(responseData);
	} catch (error) {
		res.status(422).json({ error_message: error.message });
	}
});

// watch for dynamic routes should be after the static routes

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(`Get employee details id:`, id);

		// Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ error_message: `Invalid employee ID: ${id}` });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(422).json({ error_message: `Unable to find employee with id ${id}` });
    }

    const responseData = {
      id: employee._id,
      name: employee.name,
      email: employee.email,
      position: employee.position,
      department: employee.department,
      salary: employee.salary,
      start_date: employee.start_date,
      createdAt: employee.createdAt,
      updatedAt: employee.updatedAt
    };

    res.json(responseData);
  } catch (error) {
    res.status(500).json({ error_message: error.message });
  }
});

// fetch('http://localhost:3000/employees/3', {
// 	method: 'PUT',
// 	headers: { 'Content-Type': 'application/json' },
// 	body: JSON.stringify({ x: 5 })
// })

router.put('/:id', (req, res)=>{
	const id = req.params.id;
	console.log('Put employee with id: ', id)
	res.json({ employee_id: id })
})

// fetch('http://localhost:3000/employees/3', {
// 	method: 'DELETE',
// })

router.delete('/:id', (req, res)=>{
	const id = req.params.id;
	console.log('Delete employee with id: ', id)
	res.json({ employee_id: id })
})

export default router;

