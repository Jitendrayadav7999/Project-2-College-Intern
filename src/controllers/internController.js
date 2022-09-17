const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const validator = require("validator")
const validation = require("./validation")

let indianNumber = /^((0091)|(\+91)|0?)[6789]{1}\d{9}$/

//===========================================> (Create Intern api) <================================================//

const createIntern = async function (req, res) {
    try {

        let data = req.body
        //------------------------> (If DON'T have any object in body) <------------------------------//
        if (!validation.checkvalidResBody(data)) {
            return res.status(400).send({ status: false, message: "Invalide Request. Please Provide intern Details" })
        }
        //------------------------> (Intern name validation) <------------------------------//
        let { name, mobile, email, collegeName } = data

        
        if (!validation.isValid(name)) {
            return res.status(400).send({ status: false, message:"Intern name is required" })
        }
        if (!validation.omlyLetterValid(name)) return res.status(400).send({ status: false, message: "Intern name Should be Letters" })
         //------------------------> (email Id validation) <---------------------------------------//
         if (!validation.isValid(email)) {
            return res.status(400).send({ status: false, message:"Email is required" })
        }

        if (!validator.isEmail(email)) {
            return res.status(400).send({ status: false, msg: " please Enter valid EmailId" })
        }
        //------------------------> (Email id uniqe validation) <----------------------------------//
        let checkEmail = await internModel.findOne({ email })
        if (checkEmail) {
            return res.status(404).send({ status: false, message: "email already exists." })
        }
        //------------------------> (Mobile number validation) <------------------------------//
        if (!validation.isValid(mobile)) {
            return res.status(400).send({ status: false, message:"mobail number is required" })
        }

        if (!(indianNumber.test(mobile))) {
            return res.status(400).send({ status: false, message:"mobail first number start 6 to 9 or 10 digits" })
        }
        //------------------------> (Mobile number uniqe validation) <------------------------------//
        let checkMobile = await internModel.findOne({ mobile })
        if (checkMobile) {
            return res.status(404).send({ status: false, message: "mobile number already exists." })
        }
       
        //------------------------> (college name validation) <--------------------------------------//
         if (!validation.isValid(collegeName)) {
            return res.status(400).send({ status: false, message:"collegeName is required" })
        }
        if (!validation.omlyLetterValid(collegeName)) return res.status(400).send({ status: false, message: "collegeName Should be Letters" })
        //------------------------> (Find college Object Id by college name) <------------------------//
        let collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) {
            return res.status(400).send({ status: false, message: "Please enter valide college name" })
        }
        let collegeId = collegeData._id
        //------------------------> (Data format for stor database) <--------------------------------//
        let savedData1 = {
            name, email, mobile, collegeId
        }
        //------------------------> (Interrn data creat) <------------------------------------------//
        await internModel.create(savedData1)
        let data1 = {
            "isDeleted": false,
            "name": name,
            "email": email,
            "mobile": mobile,
            "collegeId": collegeId
        }
        return res.status(201).send({ status: true, message: "Data successfully created", data: data1 })
        //------------------------> (END API) <------------------------------//
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message })
    }
}

module.exports = { createIntern }