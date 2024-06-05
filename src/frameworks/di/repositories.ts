import IClientHTTP from "../../adapters/infrastructures/interfaces/IClientHTTP"
import IWebLocalStorage from "../../adapters/infrastructures/interfaces/IWebLocalStorage"
import CarrierRepository from "../../adapters/repositories/CarrierRepository"
import TrackerRepository from "../../adapters/repositories/TrackerRepository"
import IRepositories from "./interfaces/IRepositories"

export default (
  clientHTTP: IClientHTTP,
  webLocalStorage: IWebLocalStorage
): IRepositories => {
  return {
    carrier: new CarrierRepository(clientHTTP),
    tracker: new TrackerRepository(clientHTTP, webLocalStorage)
  }
}
