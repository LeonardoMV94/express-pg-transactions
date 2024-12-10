class CustomError extends Error {
    constructor(message, type, statusCode = 500) {
      super(message);
      this.type = type;
      this.statusCode = statusCode;
    }
  }
  
  module.exports = CustomError;