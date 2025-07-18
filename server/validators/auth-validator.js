const { z } = require("zod"); // ✅ Zod library for schema validation

// --------------------------------------------
// ✅ Login Schema Validation
// --------------------------------------------
const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })  // ✅ Required email
    .trim()                                            // ✅ Remove extra spaces
    .email({ message: "Invalid email address" })       // ✅ Must be valid email format
    .min(3, { message: "Email must be at least 3 characters." }) 
    .max(255, { message: "Email must not be more than 255 characters" }),

  password: z
    .string({ required_error: "Password is required" }) // ✅ Required password
    .trim()                                              // ✅ Remove whitespace
    .min(6, { message: "Password must be at least 6 characters." }) 
    .max(255, { message: "Password must not be more than 255 characters" }),
});

// --------------------------------------------
// ✅ Signup Schema Validation (Extends Login Schema)
// --------------------------------------------
const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Name is required" })  // ✅ Required username
    .trim()
    .min(3, { message: "Name must be at least 3 characters." })
    .max(255, { message: "Name must not be more than 255 characters" }),

  phone: z
    .string({ required_error: "Phone is required" })  // ✅ Required phone number
    .trim()
    .min(10, { message: "Phone must be at least 10 characters." })
    .max(20, { message: "Phone must not be more than 20 characters" }), // ✅ Phone max 20 chars
});

// --------------------------------------------
// 🚀 Export both schemas
// --------------------------------------------
module.exports = { signupSchema, loginSchema };
