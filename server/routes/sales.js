const { auth, isAdmin } = require("../middlewares/auth");
const express = require("express");
const Sales = require("../models/Sales");
const router = express.Router();

//POST /sales
router.post("/", async (req, res) => {
  try {
    const { productName, amount, DateofSale, status } = req.body;
    const sale = new Sales({
      productName,
      amount,
      DateofSale,
      status,
      user: req.user._id,
    });
    if (req.user.role === "Admin" && req.body.user) {
      sale.user = req.body.user;
    }
    await sale.save();
    res.status(201).json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const sales =
      req.user.role === "Admin"
        ? await Sales.find().populate("User", "username")
        : await Sales.find({ User: req.user._id });
    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /sales/:id
router.get("/:id", auth, async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (
      !sale ||
      (sale.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin")
    ) {
      return res.status(403).send("Access Forbidden");
    }
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.put("/:id", auth, async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (
      !sale ||
      (sale.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin")
    ) {
      return res.status(403).send("Access Forbidden");
    }
    Object.assign(sale, req.body);
    await sale.save();
    res.json(sale);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /sales/:id
router.delete("/:id", auth, async (req, res) => {
  try {
    const sale = await Sales.findById(req.params.id);
    if (
      !sale ||
      (sale.user.toString() !== req.user._id.toString() &&
        req.user.role !== "admin")
    ) {
      return res.status(403).send("Access Forbidden");
    }
    await sale.remove();
    res.json({ message: "Sale deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
