import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../services/productService";
import { useDeleteProductMutation } from "../hooks/useProducts";

import AddProductModal from "./AddProductModal";
import DeleteProductModal from "./DeleteProductModal";

import styles from "./ProductsList.module.css";
import Pagination from "./Pagination";

function ProductsList() {
	const [page, setPage] = useState(1);

	const { data, error, isLoading } = useQuery({
		queryKey: ["products", page],
		queryFn: () => fetchProducts({ page }),
		keepPreviousData: true,
	});

	const [search, setSearch] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	const openEditModal = (product) => {
		setSelectedProduct(product);
		setIsEditModalOpen(true);
	};

	const closeEditModal = () => {
		setSelectedProduct(null);
		setIsEditModalOpen(false);
	};

	const openDeleteModal = (product) => {
		setSelectedProduct(product);
		setIsDeleteModalOpen(true);
	};

	const closeDeleteModal = () => {
		setIsDeleteModalOpen(false);
		setSelectedProduct(null);
	};

	const deleteProductMutation = useDeleteProductMutation(closeDeleteModal);

	if (isLoading) {
		return <p>Loading...</p>;
	}

	if (error) {
		return <p>خطا در بارگذاری محصولات: {error.message}</p>;
	}

	const filteredProducts = data.data.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));

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
				<button className={styles.addProduct} onClick={openModal}>
					افزودن محصول
				</button>
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
					{filteredProducts.length > 0 ? (
						filteredProducts.map((product) => (
							<tr key={product.id}>
								<td>{product.name}</td>
								<td>{product.quantity}</td>
								<td>{product.price} هزار تومان</td>
								<td>{product.id}</td>
								<td>
									<div className={styles.actionButtons}>
										<button onClick={() => openDeleteModal(product)} className={styles.deleteBtn}>
											<img src="/src/assets/trash.png" />
										</button>
										<button onClick={() => openEditModal(product)} className={styles.editBtn}>
											<img src="/src/assets/edit.png" />
										</button>
									</div>
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan="5" className={styles.tableD}>
								نتیجه‌ای برای جستجو یافت نشد.
							</td>
						</tr>
					)}
				</tbody>
			</table>
			{isOpen && <AddProductModal onClose={closeModal} />}
			{isEditModalOpen && <AddProductModal onClose={closeEditModal} defaultValues={selectedProduct} mode="edit" />}
			{isDeleteModalOpen && (
				<DeleteProductModal
					product={selectedProduct}
					onCancel={closeDeleteModal}
					onConfirm={() => deleteProductMutation.mutate(selectedProduct.id)}
				/>
			)}

			<Pagination page={page} totalPages={data.totalPages} onPageChange={(newPage) => setPage(newPage)} />
		</div>
	);
}

export default ProductsList;
