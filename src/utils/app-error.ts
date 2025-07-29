export abstract class AppError<T = undefined> extends Error {
  public readonly statusCode: number;
  protected details?: T;

  constructor(message: string, statusCode: number = 400, details?: T) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }

  format() {
    if (typeof this.details === 'undefined') {
      return {
        status: this.statusCode,
        message: this.message,
      };
    }
    return {
      status: this.statusCode,
      message: this.message,
      details: this.details,
    };
  }
}

export class BadRequestError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string) {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message: string) {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnprocessableEntityError extends AppError {
  constructor(message: string) {
    super(message, 422);
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
    message: string = 'Validation error',
  ) {
    super(message, 422, details);
  }
}

export type ConflictErrorDetails = {
  field: string;
  message: string;
};

export class ConflictError extends AppError<
  { field: string; message: string }[]
> {
  constructor(
    details: { field: string; message: string }[],
    message: string = 'Conflict error',
  ) {
    super(message, 409, details);
  }
}
