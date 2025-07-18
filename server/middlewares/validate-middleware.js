// ✅ Higher-order middleware function that takes a Zod schema
const validate = (Schema) => async (req, res, next) => {
  try {
    // 🔍 Validate and parse request body using provided schema
    const parsedBody = await Schema.parseAsync(req.body);
    req.body = parsedBody; // 🛠️ Update body with parsed (cleaned) data

    next(); // ✅ Move to next middleware
  } catch (err) {
    // ❌ Validation failed
    const status = 422;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0]?.message || "Validation error";

    const error = {
      status,
      message,
      extraDetails,
    };

    console.log("Validation Error: ", error);

    next(error); // 🔁 Pass to global error handler
  }
};

module.exports = validate;
