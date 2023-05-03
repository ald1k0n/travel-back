const express = require("express");
const router = express.Router();
const {
  addHotel,
  getHotels,
  getSearchedHotels,
  getSingleHotel,
  getAdminHotels,
  updateHotel,
  insertPrices,
  getRoomPrices,
  insertTourPrices,
  getRoomsByLimit,
  updateHotelPeriods,
  deletePeriod,
  getByTagRecommendation,
  getPrice,
} = require("../controllers/hotelController");
const { protect } = require("../middleware/authMiddleware");

const { Hotel } = require("../models/hotelModel");

const { upload } = require("./uploadRoutes");

router.post("/", addHotel);
router.get("/", getHotels);
router.get("/price", getPrice);
router.get("/searched", getSearchedHotels);
router.get("/admin", getAdminHotels);
router.patch("/:hotelId", updateHotel);
router.patch("/:hotelId/periods", updateHotelPeriods);
router.patch("/:hotelId/delete-period", deletePeriod);
router.get("/:id", getSingleHotel);

//test
router.get("/:hotelId/room", getRoomsByLimit);
router.post("/hotelRecommendation/tags", getByTagRecommendation);

router.patch("/:hotelId/upload", upload.array("images", 5), (req, res) => {
  console.log(req.files);
  const filePath = req.files.map(
    (file) => `https://testapialdik.azurewebsites.net/images/${file.filename}`
  );
  Hotel.updateOne(
    { _id: req.params.hotelId },
    {
      $set: {
        img: filePath,
      },
    }
  )
    .then((response) => res.status(201).json(filePath))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
