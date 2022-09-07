import { yupResolver } from "@hookform/resolvers/yup";
import { ShopLayout } from "components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupSchemas } from "utils";
import { useContext, useState } from "react";
import { AuthContext } from "context";
import { AiOutlineLoading } from "react-icons/ai";
import { signIn, getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

type Inputs = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const RegisterPage = () => {
	const [showError, setShowError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const { registerUser } = useContext(AuthContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(yupSchemas.RegisterSchema),
	});

	const onSubmit: SubmitHandler<Inputs> = async (registerData) => {
		const { firstName, lastName, email, password } = registerData;

		setIsLoading(true);

		const { hasError, message } = await registerUser(
			firstName,
			lastName,
			email,
			password
		);

		setIsLoading(false);

		if (hasError) {
			setShowError(true);
			setErrorMessage(message!);
			setTimeout(() => setShowError(false), 3000);
			return;
		}

		await signIn("credentials", { email, password });
	};

	return (
		<ShopLayout title="Teslo - Register" pageDescription="Teslo Register Page">
			<section className="h-[calc(100vh-10rem)] flex items-center justify-center">
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className="flex flex-col w-[350px] px-5 py-[10px] space-y-2"
				>
					<h1 className="text-3xl font-semibold">Register</h1>
					{/* register your input into the hook by invoking the "register" function */}
					<input
						{...register("firstName", { required: true })}
						placeholder={"First Name"}
						type="text"
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight text-red-500">
						{errors.firstName?.message}
					</span>

					<input
						{...register("lastName", { required: true })}
						placeholder={"Last Name"}
						type="text"
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight text-red-500">
						{errors.lastName?.message}
					</span>

					<input
						{...register("email", { required: true })}
						placeholder={"Email"}
						type="text"
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight text-red-500">
						{errors.email?.message}
					</span>

					<input
						{...register("password", { required: true })}
						type="password"
						placeholder={"Password"}
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight text-red-500">
						{errors.password?.message}
					</span>

					<button
						disabled={isLoading}
						type="submit"
						aria-label="Login Button"
						className="px-[22px] py-2 items-center justify-center flex bg-blue-600 rounded-[10px] text-white font-medium text-[0.9rem] hover:bg-blue-700 duration-300 disabled:bg-gray-500"
					>
						{isLoading ? (
							<AiOutlineLoading className="animate-spin text-white" size={20} />
						) : (
							"Register"
						)}
					</button>
					<span
						className={`${
							showError ? "block" : "hidden"
						} text-xs font-extralight text-red-500`}
					>
						{errorMessage}
					</span>
					<div className="flex justify-end">
						<Link
							href={
								router.query.p
									? `/auth/register?p=${router.query.p}`
									: "/auth/register"
							}
							passHref
						>
							<a className="underline decoration-slate-400">
								Don&apos;t have an account?
							</a>
						</Link>
					</div>
					{/* TODO: Google Provider */}
					{/* <div>
						<hr/>
					</div> */}
				</form>
			</section>
		</ShopLayout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({
	req,
	query,
}) => {
	const session = await getSession({ req });

	const { p = "/" } = query;

	if (session) {
		return {
			redirect: {
				destination: p.toString(),
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default RegisterPage;
