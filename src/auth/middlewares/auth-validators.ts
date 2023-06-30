import { NextFunction, Request, Response } from "express";
import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const validateLoginRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const schema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    // Handle validation error
    console.log(error.details[0].message);
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

module.exports = { validateLoginRequest };
