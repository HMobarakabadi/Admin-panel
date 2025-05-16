import axios from "axios";
import Cookies from "js-cookie";

const fetchProducts = async () => {
	const res = await axios.get("http://localhost:3000/products?page=1&limit=10");
	return res.data;
};

const createProduct = async (productData) => {
	const token = Cookies.get("token");
	const res = await axios.post("http://localhost:3000/products", productData, {
		headers: { Authorization: `Bearer ${token}` },
	});
	return res.data;
};

export { fetchProducts, createProduct };
