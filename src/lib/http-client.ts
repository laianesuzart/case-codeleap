enum StatusCode {
  NO_CONTENT = 204,
}

class HttpClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    url: string,
    method: string,
    data?: unknown,
    headers?: HeadersInit,
  ): Promise<T> {
    const options: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    if (data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(this.baseUrl + url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    if (response.status === StatusCode.NO_CONTENT) {
      return null as T;
    }
    return (await response.json()) as T;
  }

  async get<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, "GET", undefined, headers);
  }

  async post<T>(url: string, data: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, "POST", data, headers);
  }

  async patch<T>(
    url: string,
    data: unknown,
    headers?: HeadersInit,
  ): Promise<T> {
    return this.request<T>(url, "PATCH", data, headers);
  }

  async put<T>(url: string, data: unknown, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, "PUT", data, headers);
  }

  async delete<T>(url: string, headers?: HeadersInit): Promise<T> {
    return this.request<T>(url, "DELETE", undefined, headers);
  }
}

export default HttpClient;
