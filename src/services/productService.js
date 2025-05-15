import axios from "axios";

const fetchProducts = async () => {
	const res = await axios.get("http://localhost:3000/products?page=1&limit=10");
	return res.data;
};

export { fetchProducts };
