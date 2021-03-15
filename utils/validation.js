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

export {
  positiveNumberVal,
  nonZero
}