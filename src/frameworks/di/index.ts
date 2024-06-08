import ClientHTTP from "../../adapters/infrastructures/ClientHTTP"
import WebLocalStorage from "../../adapters/infrastructures/WebLocalStorage"
import controllers from "./controllers"
import repositories from "./repositories"
import useCases from "./useCases"

const fetch = globalThis.fetch.bind(globalThis)
const localStorage = globalThis.localStorage

const clientHTTP = new ClientHTTP(fetch)
const webStorage = new WebLocalStorage(localStorage)
const repository = repositories(clientHTTP, webStorage)
const useCase = useCases(repository)
const controller = controllers(useCase)

export default controller
