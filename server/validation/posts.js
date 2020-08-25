import Joi from '@hapi/joi';

const postSchema = Joi.object().keys({
    title: Joi.string().required(),
    content: Joi.string().min(6).max(20).required(),
    imageLink: Joi.string().min(10).max(100).required(),
});

export default postSchema;