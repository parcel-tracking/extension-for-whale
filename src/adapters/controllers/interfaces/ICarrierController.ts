import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"
import ICarrierViewDTO from "../../dtos/interfaces/ICarrierViewDTO"

export default interface ICarrierController {
  getCarriers(): Promise<ILayerDTO<ICarrierViewDTO[]>>
}
