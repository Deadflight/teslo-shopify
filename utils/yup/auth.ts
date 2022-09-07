import * as Yup from "yup";

export const LoginSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password must be between 6 and 20 characters")
		.max(20, "Password must be between 6 and 20 characters"),
});

export const RegisterSchema = Yup.object().shape({
	email: Yup.string()
		.email("Invalid email format")
		.required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.min(6, "Password must be between 6 and 20 characters")
		.max(20, "Password must be between 6 and 20 characters"),
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
});
