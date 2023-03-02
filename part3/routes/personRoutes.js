const express = require("express");
const {
  getAllPerson,
  getOnePerson,
  addNewPerson,
  deletePerson,
  updatePerson,
} = require("../controllers/personController");
const router = express.Router();

router.route("/person").get(getAllPerson).post(addNewPerson);
router.route("/person/:id").get(getOnePerson).delete(deletePerson).put(updatePerson);

module.exports = router;
