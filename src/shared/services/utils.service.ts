import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { statusCodeConstants } from '../constants';
import { ErrorResponseInput, ErrorResponseOutput } from '../types';

@Injectable()
export class UtilsService {
  async generateHash(value: string): Promise<string> {
    return bcrypt.hash(value, 10);
  }

  async compareHash(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }

  generateMessageError(errors: ErrorResponseInput): ErrorResponseOutput {
    const { message, statusCode } = errors;
    return {
      message: [message],
      error: statusCodeConstants[statusCode],
      statusCode: statusCode,
    };
  }
}
