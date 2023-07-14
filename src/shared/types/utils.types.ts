export interface ErrorResponseInput {
  message: string;
  statusCode: number;
}
export interface ErrorResponseOutput {
  message: string[];
  error: string;
  statusCode: number;
}
