const express = require("express");
const Client = require("../models/client");
const Provider = require("../models/provider");

const router = express.Router();

/**
 * @swagger
 * /api/clients:
 *  get:
 *    summary: get clients
 *    description: Use to request all clients
 *    responses:
 *      200:
 *        description: Returns an array of all clients
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Client"
 *      500:
 *        description: Server error
 */
router.get("/clients", async (req, res) => {
  try {
    const clients = await Client.find({});
    res.send(clients);
  } catch (err) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/clients:
 *  post:
 *    summary: create a new client
 *    description: Use to create a new client
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/NewClient"
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Client"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.post("/clients", async (req, res) => {
  // Filter out non-existing provider ids
  let providerIds = [];
  if (req.body.providers) {
    for (let i = 0; i < req.body.providers.length; i++) {
      try {
        const p = await Provider.findById(req.body.providers[i].id);
        if (p !== null) {
          providerIds.push(req.body.providers[i]);
        }
      } catch (err) {}
    }
    req.body.providers = providerIds;
  }

  const client = new Client(req.body);

  try {
    await client.save();
    res.status(201).send(client);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /api/clients/{id}:
 *  patch:
 *    summary: update an existing client
 *    description: Use to update an existing client
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of a client to be patched
 *        required: true,
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/NewClient"
 *    responses:
 *      200:
 *        description: Patched
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Client"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.patch("/clients/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "phone", "providers"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  // Filter out non-existing provider ids
  let providerIds = [];
  if (req.body.providers) {
    for (let i = 0; i < req.body.providers.length; i++) {
      try {
        const p = await Provider.findById(req.body.providers[i].id);
        if (p !== null) {
          providerIds.push(req.body.providers[i]);
        }
      } catch (err) {}
    }
    req.body.providers = providerIds;
  }

  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!client) {
      return res.status(404).send({ error: "Bad request!" });
    }

    res.send(client);
  } catch (err) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/clients/{id}:
 *  delete:
 *    summary: delete an existing client
 *    description: Use to delete an existing client
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of a client to be deleted
 *        required: true,
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Client"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.delete("/clients/:id", async (req, res) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);

    if (!client) {
      return res.status(404).send();
    }

    res.send(client);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
