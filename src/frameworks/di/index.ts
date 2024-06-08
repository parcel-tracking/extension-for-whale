import controllers from "./controllers"
import infrastructures from "./infrastructures"
import repositories from "./repositories"
import useCases from "./useCases"

const httpClient = globalThis.fetch.bind(globalThis)
const storage = globalThis.localStorage

const infrastructure = infrastructures(httpClient, storage)
const repository = repositories(
  infrastructure.clientHTTP,
  infrastructure.webLocalStorage
)
const useCase = useCases(repository)
const controller = controllers(useCase)

export default controller
