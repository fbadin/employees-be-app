import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import employeesRouter from './routes/api/v1/employees.js';

const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
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

app.all('/*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	next();
});

app.get('/', (req, res) => {
  res.send('connected')
});

app.use('/api/v1/employees', employeesRouter);