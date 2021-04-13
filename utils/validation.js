const positiveNumberVal = () => ({
  validator(_, value) {
    if (value >= 0 || !value) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Enter positive numbers"));
  },
});
const nonZero = () => ({
  validator(_, value) {
    if (value !== 0) {
      return Promise.resolve();
    }
    return Promise.reject(new Error("Portion can't be 0"));
  },
});
const validateRecipe = (values) => {
  const errors = {};
  if (values.name === "") errors.name = "A name is required";
  if (values.ingredients.length === 0)
    errors.ingredients = "Add at least one ingredient";
  if (values.weight === "") errors.weight = "Weight is required";
  return errors;
};
export { positiveNumberVal, nonZero, validateRecipe };
