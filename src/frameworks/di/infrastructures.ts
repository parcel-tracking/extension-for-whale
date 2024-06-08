import ClientHTTP from "../../adapters/infrastructures/ClientHTTP"
import WebLocalStorage from "../../adapters/infrastructures/WebLocalStorage"
import IInfrastructures from "./interfaces/IInfrastructures"

export default (
  httpClient: (input: RequestInfo, init?: RequestInit) => Promise<Response>,
  storage: {
    getItem(key: string): string
    setItem(key: string, value: string): void
    removeItem(key: string): void
    clear(): void
  }
): IInfrastructures => {
  return {
    clientHTTP: new ClientHTTP(httpClient),
    webLocalStorage: new WebLocalStorage(storage)
  }
}
