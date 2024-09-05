import { json } from 'body-parser';
import { Request, Response, NextFunction } from 'express';
class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message); // Llamar al constructor de la clase Error
    this.status = status; // Definir el código de estado HTTP
  }
}

const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Endware: ', err.message);  
  const error = err.status
  res.status(error).send({message: err.message});
};

export default errorHandlerMiddleware;
