import express from "express";
import User from '../../../models/user.js';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		// Fetch all users from the database
		const users = await User.find();

		// Map users to custom response format
		const formattedUsers = users.map(user => {
			return {
					id: user._id, // Rename _id to id
					name: user.name,
					email: user.email,
					position: user.position,
					department: user.department,
					salary: user.salary,
					start_date: user.start_date,
					created_at: user.createdAt,
					updated_at: user.updatedAt
			};
	});

	res.json({ users: formattedUsers });
	} catch (error) {
		res.status(500).json({ error_message: error.message });
	}
});

router.post('/', async (req, res) => {
	try {
		console.log('body:', req.body);

		// Extract attributes from the POST request body
		const { name, email, position, department, salary, start_date } = req.body;

		// Create a new user instance with the extracted attributes
		const user = new User({
			name,
			email,
			position,
			department,
			salary,
			start_date
		});

		// Save the new user to the database
		const savedUser = await user.save();

		// Extract necessary fields from the saved user object
		const { _id, createdAt, updatedAt } = savedUser;

		// Construct the response object
		const responseData = {
			id: _id,
			name,
			email,
			position,
			department,
			salary,
			start_date,
			create_at: createdAt,
			updated_at: updatedAt
		};

		res.json(responseData);
	} catch (error) {
		res.status(422).json({ error_message: error.message });
	}
});

// watch for dynamic routes should be after the static routes

router.get('/:id', (req, res)=>{
	const id = req.params.id;
	console.log('Get user with id: ', id)
	res.json({ user_id: id })
})

// fetch('http://localhost:3000/users/3', {
// 	method: 'PUT',
// 	headers: { 'Content-Type': 'application/json' },
// 	body: JSON.stringify({ x: 5 })
// })

router.put('/:id', (req, res)=>{
	const id = req.params.id;
	console.log('Put user with id: ', id)
	res.json({ user_id: id })
})

// fetch('http://localhost:3000/users/3', {
// 	method: 'DELETE',
// })

router.delete('/:id', (req, res)=>{
	const id = req.params.id;
	console.log('Delete user with id: ', id)
	res.json({ user_id: id })
})

export default router;

