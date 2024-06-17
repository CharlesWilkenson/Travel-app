class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class InvalidDateError extends CustomError{
  constructor (message, statusCode) {
    super(message, statusCode);
      this.message = message;
      this.statusCode = statusCode;
  }
}

export class ResourceNotFoundError extends CustomError{
    constructor(message, statusCode) {
    super(message, statusCode);
      this.message = message;
      this.statusCode = statusCode;
  }
}

export class AllFieldsRequiredError extends CustomError{
    constructor(message, statusCode) {
    super(message, statusCode);
      this.message = message;
      this.statusCode = statusCode;
  }
}
