import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "../services/productService";

export const useCreateProductMutation = (onSuccessCallback) => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries(["products"]);
			onSuccessCallback();
		},
	});
};
