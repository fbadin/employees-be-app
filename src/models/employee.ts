import mongoose from "mongoose";
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  department: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => {
        // Check if the value is in ISO format
        return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value);
      },
      message: (props: { value: string }) => `${props.value} is not in ISO format!`
    }
  }
}, {
  timestamps: true
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;