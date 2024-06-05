import ClientHTTP from "../../adapters/infrastructures/ClientHTTP"
import WebLocalStorage from "../../adapters/infrastructures/WebLocalStorage"
import controllers from "./controllers"
import repositories from "./repositories"
import useCases from "./useCases"

const repository = repositories(new ClientHTTP(), new WebLocalStorage())
const useCase = useCases(repository)
const controller = controllers(useCase)

export default controller
