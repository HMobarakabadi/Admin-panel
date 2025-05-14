import { object, string } from "yup";

export let loginSchema = object({
	username: string().required("نام کاربری الزامی است"),
	password: string()
		.required("رمز عبور وارد نشده است")
		.min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
		.matches(/[a-zA-Z]/, "رمز عبور فقط می تواند شامل حروف لاتین باشد"),
});
