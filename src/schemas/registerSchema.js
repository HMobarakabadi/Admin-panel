import { object, string, ref } from "yup";

export let registerSchema = object({
	username: string().required("نام کاربری الزامی است"),
	password: string().required("رمز عبور وارد نشده است").min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد"),
	confirmPassword: string()
		.required("تایید رمز عبور الزامی است")
		.oneOf([ref("password")], "رمز عبور یکسان نیست"),
});
