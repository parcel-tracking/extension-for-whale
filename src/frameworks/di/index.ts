import ClientHTTP from "../../adapters/infrastructures/ClientHTTP"
import WebLocalStorage from "../../adapters/infrastructures/WebLocalStorage"
import controllers from "./controllers"
import repositories from "./repositories"
import useCases from "./useCases"

const clientHTTP = new ClientHTTP()
const webStorage = new WebLocalStorage()
const repository = repositories(clientHTTP, webStorage)
const useCase = useCases(repository)
const controller = controllers(useCase)

export default controller
