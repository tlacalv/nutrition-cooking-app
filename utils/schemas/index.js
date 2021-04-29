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
const email = Yup.string().required().email();
const name = Yup.string().required();
const password = Yup.string().required();
const newPassword = Yup.string()
  .required("Please Enter your password")
  .matches(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
  );
const confirmPassword = Yup.string().required("Please enter password again")

const loginSchema = Yup.object({
  email: email,
  password: password,
});

const registerSchema = Yup.object({
  name: name,
  email: email,
  password: newPassword,
  confirmPassword:  confirmPassword
});
export { ingredientSchema, loginSchema, registerSchema };
