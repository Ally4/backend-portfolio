import Joi from '@hapi/joi';

const querySchema = Joi.object().keys({
    email: Joi.string().email().required(),
    name: Joi.string().min(6).max(20).required(),
    query: Joi.string().min(10).max(100).required(),
});

export default querySchema;