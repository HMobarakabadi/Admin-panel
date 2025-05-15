import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productService";

import styles from "./ProductsList.module.css";

function ProductsList() {
	const { data, error, isLoading } = useQuery({ queryKey: ["products"], queryFn: fetchProducts });

	const [search, setSearch] = useState("");

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>خطا در بارگذاری محصولات: {error.message}</p>;
	}

	const filteredProducts = data.data.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

	console.log(data);

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.searchBar}>
					<img src="/src/assets/search-normal.png" />
					<input type="search" placeholder="جستجو  کالا" value={search} onChange={(e) => setSearch(e.target.value)} />
				</div>
				<div className={styles.userInfo}>
					<img src="/src/assets/Felix-Vogel-4.png" alt="میلاد عظمی" />
					<div className={styles.userDetails}>
						<span>میلاد عظمی</span>
						<small>مدیر</small>
					</div>
				</div>
			</div>
			<div className={styles.titleSection}>
				<div className={styles.title}>
					<img src="/src/assets/setting-3.svg" />
					<span>مدیریت کالا</span>
				</div>
				<button className={styles.addProduct}>افزودن محصول</button>
			</div>
			<table className={styles.table}>
				<thead className={styles.tableHeader}>
					<tr>
						<th>نام کالا</th>
						<th>موجودی</th>
						<th>قیمت</th>
						<th>شناسه کالا</th>
						<th>عملیات</th>
					</tr>
				</thead>
				<tbody className={styles.tableBody}>
					{filteredProducts.map((product) => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.quantity}</td>
							<td>{product.price} هزار تومان</td>
							<td>{product.id}</td>
							<td>
								<div className={styles.actionButtons}>
									<button className={styles.deleteBtn}>
										<img src="/src/assets/trash.png" />
									</button>
									<button className={styles.editBtn}>
										<img src="/src/assets/edit.png" />
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>

			<div className={styles.pagination}>
				<button className={styles.active}>۱</button>
				<button className={styles.pageItem}>۲</button>
				<button className={styles.pageItem}>۳</button>
			</div>
		</div>
	);
}

export default ProductsList;
