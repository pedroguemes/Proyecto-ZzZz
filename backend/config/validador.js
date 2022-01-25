const joi = require('joi')

const validador = (req, res, next) => {
    const schema = joi.object({
        name: joi.string().trim().min(2).required().messages({
            'string.empty': 'you must complete this field',
            'string.min': 'name not allowed',
        }),
        lastName: joi.string().trim().min(2).messages({
            'string.empty': 'you must complete this field',
            'string.min': 'lastname not allowed',
        }),
        email: joi.string().trim().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
            'string.email': 'You must use a valid email account'
        }),
        password: joi.string().min(5).trim().required().messages({
            'string.empty': 'you must complete this field',
        }),
        userImg: joi.string().min(5).trim().required().messages({
            'string.min': 'Enter a valid address'
        }),
        phone: joi.number().required(),
        google: joi.boolean(),
        rol: joi.string(),
    })

    const verification = schema.validate(req.body, { abortEarly: false })

    if (!verification.error) {
        next()
    } else {
        res.json({ success: false, errors: verification.error.details[0].message })
    }
}

module.exports = validador