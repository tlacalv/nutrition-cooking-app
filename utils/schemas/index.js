import * as Yup from "yup";

const nameSchema = Yup.string().required();
const quantitySchema = Yup.number().required().min(0);

const ingredientSchema = Yup.object({
  name: nameSchema,
  portion: quantitySchema,
  calories: quantitySchema,
  fat: quantitySchema,
  carbohydrate: quantitySchema,
  protein: quantitySchema,
});
const email = Yup.string().required();
const name = Yup.string().required();
const password = Yup.string().required();
const newPassword = Yup.string().required();

const loginSchema = Yup.object({
  email: email,
  password: password,
});

const registerSchema = Yup.object({
  name: name,
  email: email,
  password: newPassword,
});
export { ingredientSchema, loginSchema, registerSchema };
