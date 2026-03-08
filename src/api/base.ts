import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

export class BaseRequester<Res = unknown, Body = unknown> {
  private instance: AxiosInstance;

  constructor(baseURL: string, config?: AxiosRequestConfig) {
    this.instance = axios.create({
      baseURL,
      ...config,
    });
  }

  protected async getRequest(path: string): Promise<AxiosResponse<Res>> {
    return this.instance.get<Res>(path);
  }

  protected async postRequest(
    path: string,
    data?: Body,
  ): Promise<AxiosResponse<Res>> {
    return this.instance.post<Res>(path, data);
  }

  protected async patchRequest(
    path: string,
    data?: Body,
  ): Promise<AxiosResponse<Res>> {
    return this.instance.patch<Res>(path, data);
  }

  protected async deleteRequest(path: string): Promise<AxiosResponse<Res>> {
    return this.instance.delete<Res>(path);
  }
}
