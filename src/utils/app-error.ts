import { resBody } from '.';

export abstract class AppError<T = undefined> extends Error {
  public readonly statusCode: number;
  protected details?: T;

  constructor(message: string, statusCode: number = 400, details?: T) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }

  format() {
    if (typeof this.details === 'undefined') {
      return resBody.error({
        name: this.name,
        message: this.message,
      });
    }
    return resBody.error({
      name: this.name,
      message: this.message,
      details: this.details,
    });
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
    this.name = 'Bad Request Error';
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
    this.name = 'Unauthorized Error';
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
    this.name = 'Forbidden Error';
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
    this.name = 'Not Found Error';
  }
}

export class InternalServerError extends AppError {
  constructor(message: string = 'Internal server error.') {
    super(message, 500);
    this.name = 'Internal Server Error';
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
    this.name = 'Unprocessable Entity Error';
  }
}

export class ValidationError extends AppError<
  {
    path: string;
    message: string;
  }[]
> {
  constructor(
    details: {
      path: string;
      message: string;
    }[],
    message: string = 'Validation error.',
  ) {
    super(message, 422, details);
    this.name = 'Validation Error';
  }
}

export class ConflictError extends AppError<
  { field: string; message: string }[]
> {
  constructor(
    details: { field: string; message: string }[],
    message: string = 'Conflict error.',
  ) {
    super(message, 409, details);
    this.name = 'Conflict Error';
  }
}
