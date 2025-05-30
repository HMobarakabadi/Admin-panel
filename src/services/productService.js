import axios from "axios";
import Cookies from "js-cookie";

const fetchProducts = async ({ page = 1, search }) => {
	try {
		const res = await axios.get("http://localhost:3000/products", {
			params: { page, limit: 10, name: search },
		});

		return res.data;
	} catch (error) {
		if (error.response && error.response.status === 400) {
			return { data: [] };
		}
		throw error;
	}
};

const createProduct = async (productData) => {
	const token = Cookies.get("token");
	const res = await axios.post("http://localhost:3000/products", productData, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

const updateProduct = async ({ id, ...productData }) => {
	const token = Cookies.get("token");
	const res = await axios.put(`http://localhost:3000/products/${id}`, productData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};
const deleteProduct = async (id) => {
	const token = Cookies.get("token");
	const res = await axios.delete(`http://localhost:3000/products/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return res.data;
};

export { fetchProducts, createProduct, updateProduct, deleteProduct };
