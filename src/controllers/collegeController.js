const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validation =require("./validation")

//========================================>  (( Create College api Controller )) <=================================================//

const createCollege = async function (req, res) {
    try {

        let data = req.body
         //------------------------> (If DON'T have any object in body) <------------------------------//
         if (!validation.checkvalidResBody(data)) {
            return res.status(400).send({ status: false, message: "Invalide Request. Please Provide College Details" })
        }

        let { name, fullName, logoLink } = data
          //------------------------> (Name validation) <------------------------------//
        
          if (!validation.isValid(name)) {
            return res.status(400).send({ status: false, message:"college name is required" })
        }
        if (!validation.omlyLetterValid(name)) return res.status(400).send({ status: false, message: "College name Should be Letters" })
         //------------------------> (If College name already exists) <------------------------------//
        let checkName = await collegeModel.findOne({ name })
        if (checkName) {
            return res.status(404).send({ status: false, message: "collge name already exists." })
        }
       
         //------------------------> (Full name validation) <------------------------------//
         
         if (!validation.isValid(fullName)) {
            return res.status(400).send({ status: false, message:"college Full name is required" })
        }
        if (!validation.omlyLetterValid(fullName)) return res.status(400).send({ status: false, message: "College Full name Should be Letters" })
         //------------------------> (logo link validation) <------------------------------//
         if (!validation.isValid(logoLink)) {
            return res.status(400).send({ status: false, message:"college LogoLink is required" })
        }
        let msgLogoLink = validation.Logolinkvalid(logoLink)
        if (msgLogoLink) {
            return res.status(400).send({ status: false, message: msgLogoLink })
        }
        if (validation.whitespace(logoLink)) {
            return res.status(400).send({ status: false, message: "Make sure logoLink should not have space." })  //&& whitespace(name)
        }
         //------------------------> (College created) <------------------------------//
         await collegeModel.create(data)
        
        let savedData = {
            "name" : name,
            "fullName" :fullName,
            "logoLink" : logoLink,
            "isDeleted" : false
        }
        return res.status(201).send({ status: true, msg: "Data successfully created" ,data: savedData })
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

//========================================>  (( Get  College Data Controller)) <=================================================//

const getCollege = async function (req, res) {
    try {

        let collegeName = req.query.collegeName
        //------------------------> (If DON'T have any object in body) <------------------------------//
        if (Object.keys(req.query).length == 0) {
            return res.status(400).send({ status: false, message: " please Give query params becouse its required" })
        }
       
        //------------------------> (If college data not found by college name) <------------------------------//
        let College = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!College) {
            return res.status(404).send({ status: false, message: "college Name not found" })
        }
        //------------------------> (Interns data find by particular college object Id) <------------------------------//

        let ID = College._id
        let interns = await internModel.find({ collegeId: ID, isDeleted: false}).select({_id:1, name:1, email:1, mobile:1})

        //------------------------> (Send data format) <------------------------------//
        let {name, fullName, logoLink} = College
        let savedData = {
            "name":name ,
            "fullName":fullName ,
            "logoLink":logoLink ,
            "interns" : interns
        }
        return res.status(200).send({ status: true, data: savedData })
    }catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = {createCollege, getCollege}
