import Joi from '@hapi/joi';

const commentSchema = Joi.object().keys({
    name: Joi.string().required(),
    comment: Joi.string().min(6).max(20).required(),
});

export default commentSchema;