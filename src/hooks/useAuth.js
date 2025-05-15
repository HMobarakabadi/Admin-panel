import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../services/authService";
import Cookies from "js-cookie";

const useLoginMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			Cookies.set("token", data.token, { expires: 7 });
			navigate("/dashboard", { replace: true });
		},
		onError: (error) => {
			console.error("ورود ناموفق:", error.response?.data?.message || error.message);
		},
	});
};

const useRegisterMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: registerUser,
		onSuccess: () => {
			navigate("/login", { replace: true });
		},
		onError: (error) => {
			console.error("خطا در ثبت‌نام:", error.response?.data?.message || error.message);
		},
	});
};

export { useLoginMutation, useRegisterMutation };
