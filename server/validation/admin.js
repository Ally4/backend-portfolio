import Joi from '@hapi/joi';

const adminSignSchema = Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required(),
});

export default adminSignSchema;