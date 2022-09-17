const checkvalidResBody = function (resBody) {
    return Object.keys(resBody).length > 0
}

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
    return true
}

const omlyLetterValid = function (value) {
    return (/^(?![\. ])[a-zA-Z\. ]+(?<! )$/.test(value))
}

const Logolinkvalid = function(value){
    let isURL = value.match(/^https?[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gmi) != null
    if (isURL == false) {
        return "please enter valid logoLink"
    }
}

function whitespace(str) {
    return str.indexOf(" ") >= 0
}

module.exports = { checkvalidResBody, isValid, omlyLetterValid, Logolinkvalid, whitespace}