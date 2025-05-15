import axios from "axios";

const registerUser = async (formData) => {
	const res = await axios.post("http://localhost:3000/auth/register", formData);
	return res.data;
};

const loginUser = async (formData) => {
	const res = await axios.post("http://localhost:3000/auth/login", formData);
	return res.data;
};

export { registerUser, loginUser };
