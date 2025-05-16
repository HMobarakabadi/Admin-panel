import styles from "./Pagination.module.css";

function Pagination({ page, totalPages, onPageChange }) {
	if (totalPages === 0) return null;

	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={styles.pagination}>
			{pages.map((p) => (
				<button
					key={p}
					className={`${styles.pageItem} ${p === page ? styles.active : ""}`}
					onClick={() => onPageChange(p)}
				>
					{p}
				</button>
			))}
		</div>
	);
}

export default Pagination;
