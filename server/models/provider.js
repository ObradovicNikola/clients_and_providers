const mongoose = require("mongoose");

/**
 * @swagger
 * components:
 *  schemas:
 *    NewProvider:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          example: Provider1
 *    Provider:
 *      allOf:
 *        - $ref: "#/components/schemas/NewProvider"
 *        - type: object
 *          properties:
 *            _id:
 *              type: string
 *              example: 60735d1367248cf84d4f16ad
 *            __v:
 *              type: integer
 *              example: 0
 */
const providerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

const Provider = mongoose.model("Provider", providerSchema);

module.exports = Provider;
