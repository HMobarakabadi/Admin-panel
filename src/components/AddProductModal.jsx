import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addProductSchema } from "../schemas/addProductSchema";
import { useCreateProductMutation, useUpdateProductMutation } from "../hooks/useProducts";
import { toast } from "react-toastify";

import styles from "./AddProductModal.module.css";

function AddProductModal({ onClose, defaultValues, mode = "create" }) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(addProductSchema),
		defaultValues: defaultValues || {},
	});

	useEffect(() => {
		if (defaultValues) {
			reset(defaultValues);
		}
	}, [defaultValues, reset]);

	const createProductMutation = useCreateProductMutation(() => {
		toast.success("محصول با موفقیت ایجاد شد");
		onClose();
	});

	const updateProductMutation = useUpdateProductMutation(() => {
		toast.success("محصول با موفقیت ویرایش شد");
		onClose();
	});

	const onSubmit = (data) => {
		if (mode === "edit") {
			updateProductMutation.mutate({ id: defaultValues.id, ...data });
		} else {
			createProductMutation.mutate(data);
		}
	};

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<h2 className={styles.modalTitle}>{mode === "edit" ? "ویرایش اطلاعات" : "ایجاد محصول جدید"}</h2>
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
						{/* <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={onSubmit}>
							ایجاد
						</button> */}
						<button type="submit" className={`${styles.btn} ${styles.btnPrimary}`}>
							{mode === "edit" ? "ثبت اطلاعات جدید" : "ایجاد"}
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
