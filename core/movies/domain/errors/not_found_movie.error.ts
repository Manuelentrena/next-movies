export class NotFoundMovieError extends Error {
  repository: string;

  constructor(message: string, repository: string) {
    super(message);
    this.name = "NotFoundMovieError";
    this.repository = repository;

    Object.setPrototypeOf(this, NotFoundMovieError.prototype);
  }
}
