import { ShopLayout } from "components/layouts";
import Link from "next/link";
import { useRouter } from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { yupSchemas } from "utils";

type Inputs = {
	email: string;
	password: string;
};

const LoginPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: yupResolver(yupSchemas.LoginSchema),
	});
	const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

	return (
		<ShopLayout title="Teslo - Login" pageDescription="Teslo Login Page">
			<section className="h-[calc(100vh-10rem)] flex items-center justify-center">
				<form
					onSubmit={handleSubmit(onSubmit)}
					noValidate
					className="flex flex-col w-[350px] px-5 py-[10px] space-y-2"
				>
					<h1 className="text-3xl font-semibold">Login</h1>
					{/* register your input into the hook by invoking the "register" function */}

					<input
						{...register("email", { required: true })}
						placeholder={"Email"}
						type="text"
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight">
						{errors.email?.message}
					</span>

					{/* include validation with required or other standard HTML validation rules */}
					<input
						{...register("password", { required: true })}
						type="password"
						placeholder={"Password"}
						className="bg-gray-300 p-2 rounded-lg outline-none placeholder:text-gray-600"
					/>
					<span className="text-xs font-extralight">
						{errors.password?.message}
					</span>

					<button
						type="submit"
						aria-label="Login Button"
						className="px-[22px] py-2 bg-blue-600 rounded-[10px] text-white font-medium text-[0.9rem] hover:bg-blue-700 duration-300"
					>
						Log In
					</button>
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

export default LoginPage;