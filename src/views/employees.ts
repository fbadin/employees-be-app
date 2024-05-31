import mongoose from "mongoose";

export const employeeAggregate = (
	id: mongoose.Types.ObjectId,
	name: string,
	email: string,
	position: string,
	department: string,
	salary: string,
	start_date: string,
	created_at: NativeDate,
	updated_at: NativeDate
) => (
	{
		id,
		name,
		email,
		position,
		department,
		salary,
		start_date,
		created_at,
		updated_at
	}
)