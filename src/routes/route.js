const express = require('express');
const router = express.Router();

const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController")

// ===================================================( All api)======================================================///

//-------------------------> (When college creat, call this api) <----------------------------------//

router.post("/functionup/colleges", collegeController.createCollege)

//-------------------------> (When intern creat,  call this api) <----------------------------------//

router.post("/functionup/interns", internController.createIntern)

//-------------------------> (When get college data,  call this api) <----------------------------------//

router.get("/functionup/collegeDetails", collegeController.getCollege)

//============================================================================================================================//

module.exports = router;
