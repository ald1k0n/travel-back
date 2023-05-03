const express = require("express");
const router = express.Router();
const {
  getRooms,
  addRoom,
  getSingleRoom,
  updateRoom,
  insertPrices,
} = require("../controllers/roomController");
const { protect } = require("../middleware/authMiddleware");
const Room = require("../models/roomModel");
const { upload } = require("./uploadRoutes");

router.get("/", getRooms);
router.post("/", addRoom);
router.get("/:roomId", getSingleRoom);
router.patch("/:roomId", updateRoom);
router.patch("/:roomId/prices", insertPrices);

router.patch("/:roomId/upload", upload.array("images", 5), (req, res) => {
  const filePath = req.files.map(
    (file) => `https://testapialdik.azurewebsites.net/images/${file.filename}`
  );

  Room.updateOne(
    { _id: req.params.roomId },
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
