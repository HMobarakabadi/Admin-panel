import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "../schemas/registerSchema";
import { Link } from "react-router-dom";

import styles from "./LoginForm.module.css";

function RegisterForm() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(registerSchema),
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
					<h2>فرم ثبت نام</h2>
				</div>
				<div>
					<input {...register("username")} placeholder="نام کاربری" />
					<p>{errors.username?.message}</p>
				</div>
				<div>
					<input type="password" {...register("password")} placeholder="رمز عبور" />
					<p>{errors.password?.message}</p>
				</div>
				<div>
					<input type="Password" {...register("confirmPassword")} placeholder="تکرار رمز عبور" />
					<p>{errors.confirmPassword?.message}</p>
				</div>
				<button type="submit">ثبت نام</button>
				<div>
					<Link to="/login">حساب کاربری دارید؟</Link>
				</div>
			</form>
		</div>
	);
}

export default RegisterForm;
