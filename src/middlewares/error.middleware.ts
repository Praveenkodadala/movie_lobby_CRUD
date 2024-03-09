import express, { NextFunction, Request, Response } from "express";

export class HttpException extends Error {
  statusCode: number;
  message: string;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}

export const errorMiddleware = async (
  err: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    console.log("error message", message);
    res.status(statusCode).json({ status: false, message });
  } catch (error) {
    next(error);
  }
};
