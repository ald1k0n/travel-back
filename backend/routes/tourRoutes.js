const { Router } = require("express");
const router = Router();
const {
  addTour,
  deleteTour,
  getSingleTour,
  getTour,
  updateTour,
  getSearchedTour,
  insertTourPrices,
  tourByTagRecommendation,
  getPrice,
} = require("../controllers/tourController");
const Tour = require("../models/tourModel");
const { protect } = require("../middleware/authMiddleware");
const { upload } = require("./uploadRoutes");

router.get("/", getTour);
router.post("/", addTour);
router.get("/price", getPrice);
router.get("/searched", getSearchedTour);

router.get("/:id", getSingleTour);
router.delete("/:id", deleteTour);
router.patch("/:id", updateTour);

// router.patch("/:tourId/tourPrices", upload.single("file"), insertTourPrices);

router.post("/recommendation", tourByTagRecommendation);

router.patch("/:tourId/upload", upload.array("images", 5), (req, res) => {
  const filePath = req.files.map(
    (file) => `https://testapialdik.azurewebsites.net/images/${file.filename}`
  );

  Tour.updateOne(
    { _id: req.params.tourId },
    {
      $set: {
        img: filePath,
      },
    }
  )
    .then((response) => res.status(201).json(response))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
