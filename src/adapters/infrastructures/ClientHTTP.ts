import IClientHTTP from "./interfaces/IClientHTTP"

export default class ClientHTTP implements IClientHTTP {
  async get(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, { ...options, method: "GET" })
  }

  async post(url: string, body: any, options?: RequestInit): Promise<Response> {
    return fetch(url, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers }
    })
  }

  async put(url: string, body: any, options?: RequestInit): Promise<Response> {
    return fetch(url, {
      ...options,
      method: "PUT",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json", ...options?.headers }
    })
  }

  async delete(url: string, options?: RequestInit): Promise<Response> {
    return fetch(url, { ...options, method: "DELETE" })
  }
}
