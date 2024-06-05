import ICarrier from "../../core/domains/entities/interfaces/ICarrier"
import ICarrierUseCase from "../../core/domains/usecases/interfaces/ICarrierUseCase"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    return this.carriersUseCase.getCarriers() as Promise<ILayerDTO<ICarrier[]>>
  }
}
