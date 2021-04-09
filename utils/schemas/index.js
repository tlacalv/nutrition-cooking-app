import * as Yup from 'yup';


const nameSchema = Yup.string().required();
const quantitySchema = Yup.number().required().min(0);

const ingredientSchema = Yup.object({
  name: nameSchema,
  portion: quantitySchema,
  calories: quantitySchema,
  fat: quantitySchema,
  carbohydrate: quantitySchema,
  protein: quantitySchema
})

export {ingredientSchema}