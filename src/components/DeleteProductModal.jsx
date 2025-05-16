import styles from "./DeleteProductModal.module.css";

function DeleteProductModal({ product, onConfirm, onCancel }) {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modal}>
				<div>
					<img src="/src/assets/Close.svg" />
				</div>
				<p className={styles.text}>
					آیا از حذف محصول <strong>{product.name}</strong> مطمئنید؟
				</p>
				<div className={styles.actions}>
					<button onClick={onConfirm} className={styles.btnDanger}>
						حذف
					</button>
					<button onClick={onCancel} className={styles.btnCancel}>
						لغو
					</button>
				</div>
			</div>
		</div>
	);
}

export default DeleteProductModal;
