const joi = require("joi")

const validator = (req, res, next) => {
    const schema = joi.object({
        firstName: joi.string().trim().min(2).required().messages({
            "string.empty": "You must complete the field",
            "string.min": "Invalid name",
        }),
        lastName:joi.string().trim().min(2).required().messages({
            'string.empty' : 'You must complete this field',
            'string.min' : 'Invalid Last name',
        }),
        email:joi.string().trim().email().required().messages({
            'string.email' : 'You must use a valid email account'
        }),
        password:joi.string().trim().min(6).required().messages({
            'string.empty' : 'You must complete this field',
        }),
        urlPhoto:joi.string().min(5).trim().required().messages({
            'string.min': 'Please use a valid url'
        }),
        country:joi.string().required(),
        google:joi.boolean(),
    })

    const verification = schema.validate(req.body, {abortEarly: false})

    if(!verification.error){
        next()
    } else {
        res.json({success: false, errors: verification.error.details})
    }
}

module.exports = validator