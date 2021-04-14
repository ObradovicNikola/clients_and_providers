const express = require("express");
const Provider = require("../models/provider");
const Client = require("../models/client");

const router = express.Router();

/**
 * @swagger
 * /api/providers:
 *  get:
 *    summary: get providers
 *    description: Use to request all providers
 *    responses:
 *      200:
 *        description: Returns an array of all providers
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Provider"
 *      500:
 *        description: Server error
 */
router.get("/providers", async (req, res) => {
  try {
    const providers = await Provider.find({});
    res.send(providers);
  } catch (err) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/providers:
 *  post:
 *    summary: create a new provider
 *    description: Use to create a new provider
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/NewProvider"
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Provider"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.post("/providers", async (req, res) => {
  try {
    const provider = new Provider(req.body);
    await provider.save();

    res.send(provider);
  } catch (err) {
    res.status(400).send(err);
  }
});

/**
 * @swagger
 * /api/providers/{id}:
 *  patch:
 *    summary: update an existing provider
 *    description: Use to update an existing provider
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of a provider to be patched
 *        required: true,
 *        schema:
 *          type: string
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: "#/components/schemas/NewProvider"
 *    responses:
 *      200:
 *        description: Patched
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Provider"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.patch("/providers/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!provider) {
      return res.status(404).send();
    }

    res.send(provider);
  } catch (err) {
    res.status(500).send();
  }
});

/**
 * @swagger
 * /api/providers/{id}:
 *  delete:
 *    summary: delete an existing provider
 *    description: Use to delete an existing provider
 *    parameters:
 *      - name: id
 *        in: path
 *        description: id of a provider to be deleted
 *        required: true,
 *        schema:
 *          type: string
 *    responses:
 *      200:
 *        description: Deleted
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/Provider"
 *      400:
 *        description: Bad request
 *      500:
 *        description: Server error
 */
router.delete("/providers/:id", async (req, res) => {
  try {
    const provider = await Provider.findByIdAndDelete(req.params.id);

    if (!provider) {
      return res.status(404).send();
    }

    console.log("hirweare");

    // clear deleted provider id from clients
    // TODO: FIX THIS!!!
    let clients = await Client.find({});

    for (let i = 0; i < clients.length; i++) {
      try {
        clients[i].providers = clients[i].providers.filter((provider) => {
          return provider.id !== req.params.id;
        });

        const c = await Client.findByIdAndUpdate(
          clients[i]._id,
          { providers: clients[i].providers },
          // { providers: [] },
          {
            new: true,
            runValidators: true,
          }
        );
        console.log("Updated client with id=" + c._id);
        console.log(c.providers);
        console.log("finish LOOP");
        if (!c) {
          return res.status(404).send();
        }
      } catch (err) {
        console.log("finish LOOP");
        console.log(err);
        return res.status(500).send();
      }
    }
    console.log("finish FOREACH");

    res.send(provider);
  } catch (err) {
    res.status(500).send();
  }
});

module.exports = router;
