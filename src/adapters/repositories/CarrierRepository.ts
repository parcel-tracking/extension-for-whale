import { API_URL } from "../../constants"
import ICarrier from "../../core/domains/entities/interfaces/ICarrier"
import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ICarrierRepository from "../../core/repositories/interfaces/ICarrierRepository"
import IClientHTTP from "../infrastructures/interfaces/IClientHTTP"

export default class CarrierRepository implements ICarrierRepository {
  private readonly clientHTTP: IClientHTTP
  private carriers: ICarrier[] = []

  constructor(clietHTTP: IClientHTTP) {
    this.clientHTTP = clietHTTP
  }

  async getCarriers(): Promise<ILayerDTO<ICarrier[]>> {
    const res = await this.clientHTTP.get(`${API_URL}/carrier`)
    const { isError, message, data } = await res.json()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    this.carriers = data
    return new LayerDTO({
      data
    })
  }

  async getCarrier(carrierId: string): Promise<ILayerDTO<ICarrier>> {
    if (this.carriers.length === 0) {
      return
    }

    const carrier = this.carriers.find(({ id }) => id === carrierId)
    return new LayerDTO({
      data: carrier
    })
  }
}
