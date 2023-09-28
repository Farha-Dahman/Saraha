const dataMethods = ["body", "query", "headers", "params"];

export const validation = (schema) => {
  return (req, res, next) => {
    const validationArray = [];
    dataMethods.forEach((key) => {
        if (schema[key]) {
        const validationResult = schema[key].validate(req[key], {
          abortEarly: false,
        });
        if (validationResult.error) {
          validationArray.push(validationResult.error.details);
        }
      }
    });
    if (validationArray.length > 0) {
      return res
        .status(400)
        .json({ message: "validation error", validationArray });
    } else {
      next();
    }
  };
};
