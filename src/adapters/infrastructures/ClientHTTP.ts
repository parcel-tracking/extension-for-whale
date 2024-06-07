import IClientHTTP from "./interfaces/IClientHTTP"

export default class ClientHTTP implements IClientHTTP {
  async get(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, { ...options, method: "GET" })
  }

  async post(url: string, body: any, options?: RequestInit): Promise<Response> {
    return fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  async put(url: string, body: any, options?: RequestInit): Promise<Response> {
    return fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers },
      ...options
    })
  }

  async delete(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, { ...options, method: "DELETE" })
  }
}
