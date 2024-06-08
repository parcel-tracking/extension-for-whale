import IClientHTTP from "../../../adapters/infrastructures/interfaces/IClientHTTP"
import IWebLocalStorage from "../../../adapters/infrastructures/interfaces/IWebLocalStorage"

export default interface IInfrastructures {
  clientHTTP: IClientHTTP
  webLocalStorage: IWebLocalStorage
}
