import ICarrier from "../../core/domains/entities/interfaces/ICarrier"
import ICarrierUseCase from "../../core/domains/usecases/interfaces/ICarrierUseCase"
import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import CarrierViewDTO from "../dtos/CarrierViewDTO"
import ICarrierViewDTO from "../dtos/interfaces/ICarrierViewDTO"
import ICarrierController from "./interfaces/ICarrierController"

export default class CarriersController implements ICarrierController {
  constructor(private readonly carriersUseCase: ICarrierUseCase) {}

  async getCarriers(): Promise<ILayerDTO<ICarrierViewDTO[]>> {
    const { isError, message, data } = await this.carriersUseCase.getCarriers()
    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const carrierViewDTOs = data.map((carrier: ICarrier) => {
      return new CarrierViewDTO({
        id: carrier.id,
        no: carrier.no,
        name: carrier.name,
        displayName: carrier.displayName,
        isCrawlable: carrier.isCrawlable,
        isPopupEnabled: carrier.isPopupEnabled,
        popupURL: carrier.popupURL
      })
    })

    return new LayerDTO({
      data: carrierViewDTOs
    })
  }
}
