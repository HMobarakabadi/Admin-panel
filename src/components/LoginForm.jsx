import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { loginSchema } from "../schemas/loginSchema";

import styles from "./LoginForm.module.css";

function LoginForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(loginSchema),
	});

	const onSubmit = async (data) => {
		console.log(data);
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
					<a href="#">
						<span>ایجاد حساب کاربری!</span>
					</a>
				</div>
			</form>
		</div>
	);
}

export default LoginForm;
