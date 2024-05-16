import express from 'express';
import mongoose from 'mongoose';

import userRouterV1 from './routes/api/v1/users.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json()) // for body on json requests

const password = 'Ud4fcSCalFq52ISi'
const database = 'paays';
const dbURI = `mongodb+srv://fbadin:${password}@cluster0.znezri5.mongodb.net/${database}?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURI)
	.then(response => {
		// console.log(response)
		console.log(`connected to ${database}`);
		console.log(`starting to listen on port: ${PORT}`);
		app.listen(PORT);
	})
	.catch(error => console.log(error));

app.get('/', (req, res) => {
  res.send('connected')
});

app.use('/api/v1/users', userRouterV1);