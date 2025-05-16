import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../schemas/addProductSchema";
import { useCreateProductMutation } from "../hooks/useProducts";
import styles from "./AddProductModal.module.css";

function AddProductModal({ onClose }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(addProductSchema) });

	const createProductMutation = useCreateProductMutation(onClose);

	const onSubmit = (data) => {
		createProductMutation.mutate(data);
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<h2 className={styles.modalTitle}>ایجاد محصول جدید</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className={styles.formGroup}>
						<label className={styles.formLabel}>نام کالا</label>
						<input {...register("name")} placeholder="نام کالا" />
						<p>{errors.name?.message}</p>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>تعداد موجودی</label>
						<input type="number" {...register("quantity")} placeholder="موجودی" />
						<p>{errors.quantity?.message}</p>
					</div>

					<div className={styles.formGroup}>
						<label className={styles.formLabel}>قیمت</label>
						<input type="number" {...register("price")} placeholder="قیمت" />
						<p>{errors.price?.message}</p>
					</div>

					<div className={styles.formActions}>
						<button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onSubmit}>
							ایجاد
						</button>
						<button className={`${styles.btn} ${styles.btnSecondary}`} onClick={onClose}>
							انصراف
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default AddProductModal;
