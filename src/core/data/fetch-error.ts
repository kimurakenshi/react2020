export interface IFetchError {
  description: string;
  message: string;
  statusCode: number;
  code: string;
}

/**
 * Extends the base javascript Error with a details object coming from the API.
 */
export class FetchError extends Error {
  private details: IFetchError;

  public constructor(message: string, details: IFetchError) {
    super(message);
    this.details = details;
  }
}
