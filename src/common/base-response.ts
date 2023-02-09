import { FAILURE, SUCCESS } from "./base-messages";

class BaseResponse {
  private ok: boolean;
  private message?: string;
  private data: any;
  private failures?: any;

  constructor(ok: boolean, message: string, data: any, failures?: any) {
    this.ok = ok;
    this.message = message;
    this.data = data;
    this.failures = failures;
  }

  success() {
    return this.ok;
  }

  getMessage() {
    return this.message;
  }

  getData() {
    return this.data;
  }

  getFailures() {
    return this.failures;
  }
}

const successOnlyMessage = (message: string) =>
  new BaseResponse(true, message, null);

const success = (data: any, message?: string) =>
  new BaseResponse(true, message || SUCCESS, data);

const failureOnlyMessage = (message: string) =>
  new BaseResponse(false, message || FAILURE, null);

const failure = (data: any, message?: string, failures?: any) =>
  new BaseResponse(false, message || FAILURE, data, failures);

export {
  BaseResponse,
  successOnlyMessage,
  failureOnlyMessage,
  success,
  failure,
};
