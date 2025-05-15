import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../schemas/loginSchema";

import styles from "./LoginForm.module.css";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../hooks/useAuth";

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const loginMutation = useLoginMutation();

	const onSubmit = async (data) => {
		loginMutation.mutate({
			username: data.username,
			password: data.password,
		});
	};

	return (
		<div className={styles.container}>
			<p>بوت کمپ بوتواستارت</p>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
				<div className={styles.first}>
					<img src="/src/assets/Union.png" />
					<h2>فرم ورود</h2>
				</div>
				<div>
					<input {...register("username")} placeholder="نام کاربری" />
					<p>{errors.username?.message}</p>
				</div>
				<div>
					<input type="password" {...register("password")} placeholder="رمز عبور" />
					<p>{errors.password?.message}</p>
				</div>
				<button type="submit">ورود</button>
				<div>
					<Link to="/register">ایجاد حساب کاربری!</Link>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
