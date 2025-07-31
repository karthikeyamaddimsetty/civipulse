const express = require("express");
const router = express.Router();
const Case = require("../models/Case");
const upload = require("../middleware/multerConfig");
const verifyToken = require("../middleware/auth");

// GET all cases
router.get("/", async (req, res) => {
  try {
    const cases = await Case.find().sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: "Server error while fetching cases" });
  }
});

// POST new case
router.post("/", verifyToken, upload.single("image"), async (req, res) => {
  try {
    const newCase = new Case({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
      image: req.file?.filename || null,
      status: "Pending",
      submittedBy: req.user.id,
    });

    await newCase.save();
    res.status(201).json(newCase);
  } catch (err) {
    res.status(500).json({ message: "Failed to submit case" });
  }
});

// PUT update status (Admin/NGO)
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== "Admin" && req.user.role !== "NGO") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating case" });
  }
});

// ✅ PATCH update status via /api/cases/:id/status
router.patch("/:id/status", verifyToken, async (req, res) => {
  try {
    const { status } = req.body;

    if (req.user.role !== "Admin" && req.user.role !== "NGO") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Case.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating case status" });
  }
});

// DELETE a case
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    if (req.user.role !== "Admin" && req.user.role !== "NGO") {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const deleted = await Case.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Case not found" });
    }

    res.json({ message: "Case deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting case" });
  }
});

module.exports = router;
