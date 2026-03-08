import type { AxiosRequestConfig } from "axios";
import { BaseRequester } from "./base";

export class ServerRequester<
  Res = unknown,
  Body = unknown,
> extends BaseRequester<Res, Body> {
  #path: string;

  constructor(path: string, config?: AxiosRequestConfig) {
    super(import.meta.env.VITE_API_URL ?? "/api", {
      withCredentials: true,
      ...config,
    });
    this.#path = path;
  }

  get() {
    return this.getRequest(this.#path);
  }

  post(data?: Body) {
    return this.postRequest(this.#path, data);
  }

  patch(data?: Body) {
    return this.patchRequest(this.#path, data);
  }

  delete() {
    return this.deleteRequest(this.#path);
  }
}
