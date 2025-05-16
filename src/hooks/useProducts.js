import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct, deleteProduct, updateProduct } from "../services/productService";
import { toast } from "react-toastify";

const useCreateProductMutation = (onSuccessCallback) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			onSuccessCallback();
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "خطا در ایجاد محصول");
		},
	});
};

const useUpdateProductMutation = (onSuccessCallback) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			onSuccessCallback();
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "خطا در ویرایش محصول");
		},
	});
};

const useDeleteProductMutation = (onSuccessCallback) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			toast.success("محصول با موفقیت حذف شد");
			onSuccessCallback();
		},
		onError: (error) => {
			toast.error(error.response?.data?.message || "حذف محصول با خطا مواجه شد");
		},
	});
};

export { useCreateProductMutation, useUpdateProductMutation, useDeleteProductMutation };
