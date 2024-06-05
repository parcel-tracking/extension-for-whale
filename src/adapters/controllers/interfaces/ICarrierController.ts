import ICarrier from "../../../core/domains/entities/interfaces/ICarrier"
import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"

export default interface ICarrierController {
  getCarriers(): Promise<ILayerDTO<ICarrier[]>>
}
