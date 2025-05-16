import { object, string, number } from "yup";

const addProductSchema = object({
	name: string().required("نام کالا الزامی است"),
	price: number().typeError("قیمت باید عدد باشد").positive("قیمت باید مثبت باشد").required("قیمت الزامی است"),
	quantity: number()
		.typeError("موجودی باید عدد باشد")
		.integer("موجودی باید عدد صحیح باشد")
		.min(1, "حداقل موجودی ۱ است")
		.required("موجودی الزامی است"),
});

export { addProductSchema };
