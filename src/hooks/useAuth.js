import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginUser, registerUser } from "../services/authService";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

const useLoginMutation = () => {
	const navigate = useNavigate();

	return useMutation({
		mutationFn: loginUser,
		onSuccess: (data) => {
			Cookies.set("token", data.token, { expires: 7 });
			navigate("/dashboard", { replace: true });
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "ورود ناموفق");
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
			toast.error(error.response?.data?.message || "خطا در ثبت‌نام");
		},
	});
};

export { useLoginMutation, useRegisterMutation };
