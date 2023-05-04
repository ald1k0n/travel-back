const { Router } = require("express");
const router = Router();

const {
  addCamp,
  deleteCamp,
  getSingleCamp,
  updateCamp,
  getCamps,
  getCampByTags,
} = require("../controllers/campController");
const Camp = require("../models/campModel");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("./uploadRoutes");

router.post("/", addCamp);
router.get("/", getCamps);
router.get("/:id", getSingleCamp);
router.delete("/:id", deleteCamp);
router.patch("/:id", updateCamp);

router.patch("/:id/upload", upload.array("images", 5), (req, res) => {
  const filePath = req.files.map(
    (file) => `https://backend-ap23.azurewebsites.net/images${file.filename}`
  );
  Camp.updateOne({ _id: req.params.id }, { $set: { img: filePath } })
    .then((response) => res.status(201).json(filePath))
    .catch(() => res.sendStatus(500));
});

router.post("/recommendation", getCampByTags);

module.exports = router;
