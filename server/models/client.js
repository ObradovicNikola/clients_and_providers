const mongoose = require("mongoose");
const validator = require("validator");

/**
 * @swagger
 * components:
 *  schemas:
 *    NewClient:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: "Test"
 *        email:
 *          type: string
 *          example: "test@example.com"
 *        phone:
 *          type: string
 *          example: "222-333-555"
 *        providers:
 *          type: array
 *          items:
 *            type: object
 *            properties:
 *              id:
 *                type: string
 *                example: "60735d1367248cf84d4f16ad"
 *    Client:
 *      allOf:
 *        - $ref: "#/components/schemas/NewClient"
 *        - type: object
 *          properties:
 *            _id:
 *              type: string
 *              example: "6075c22ce2da3060985f6365"
 *            __v:
 *              type: integer
 *              example: 0
 */
const clientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid!");
      }
    },
  },
  phone: {
    type: String,
    required: true,
  },
  providers: {
    type: [Object],
  },
});

const Client = mongoose.model("Client", clientSchema);

module.exports = Client;
