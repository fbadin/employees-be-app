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
          { name: new RegExp(search as string, 'i') },
          { position: new RegExp(search as string, 'i') },
        ],
      }),
    };

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

    const formattedEmployees = employees.map((employee) => {
      return {
        id: employee._id,
        name: employee.name,
				position: employee.position,
        department: employee.department,
      };
    });

    res.json({ employees: formattedEmployees });
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.post('/', async (req, res) => {
	try {
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
	} catch (error: any) {
		res.status(422).json({ error_message: error.message });
	}
});

router.get('/:id', async (req, res) => {
  try {
    const id = req.params.id as string;

		// Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ error_message: `Invalid employee ID: ${id}` });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(422).json({ error_message: `Unable to find employee with id ${id}` });
    }

    const responseData = employeeAggregate(
			employee._id,
			employee.name,
			employee.email,
			employee.position,
			employee.department,
			employee.salary,
			employee.start_date,
			employee.createdAt,
			employee.updatedAt
		)

    res.json(responseData);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
});

router.put('/:id', async (req, res)=>{
	try {
    const id = req.params.id as string;

		// Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ error_message: `Invalid employee ID: ${id}` });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(422).json({ error_message: `Unable to find employee with id ${id}` });
    }

		// Extract attributes from the POST request body
		const { name, email, position, department, salary, start_date } = req.body;

		employee.name = name;
		employee.email = email;
		employee.position = position;
		employee.department = department;
		employee.salary = salary;
		employee.start_date = start_date;

		// Save the new employee to the database
		const savedEmployee = await employee.save();

    const responseData = employeeAggregate(
			savedEmployee._id,
			savedEmployee.name,
			savedEmployee.email,
			savedEmployee.position,
			savedEmployee.department,
			savedEmployee.salary,
			savedEmployee.start_date,
			savedEmployee.createdAt,
			savedEmployee.updatedAt
		)

    res.json(responseData);
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
})

router.delete('/:id', async (req, res)=>{
	try {
    const id = req.params.id;

		// Check if the id is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(422).json({ error_message: `Invalid employee ID: ${id}` });
    }

    const employee = await Employee.findById(id);

    if (!employee) {
      return res.status(422).json({ error_message: `Unable to find employee with id ${id}` });
    }

		// Save the new employee to the database
		await employee.deleteOne();

    res.json({});
  } catch (error: any) {
    res.status(500).json({ error_message: error.message });
  }
})

export default router;

