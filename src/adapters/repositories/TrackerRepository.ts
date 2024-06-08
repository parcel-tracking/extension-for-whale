import { API_URL, TRACKER_LIST } from "../../constants"
import ITracker from "../../core/domains/entities/interfaces/ITracker"
import LayerDTO from "../../core/dtos/LayerDTO"
import TrackerDTO from "../../core/dtos/TrackerDTO"
import ICarrierDTO from "../../core/dtos/interfaces/ICarrierDTO"
import IDeliveryDTO from "../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ITrackerDTO from "../../core/dtos/interfaces/ITrackerDTO"
import ITrackerRepository from "../../core/repositories/interfaces/ITrackerRepository"
import IClientHTTP from "../infrastructures/interfaces/IClientHTTP"
import IWebLocalStorage from "../infrastructures/interfaces/IWebLocalStorage"

export default class TrackerRepository implements ITrackerRepository {
  private readonly clientHTTP: IClientHTTP
  private readonly webLocalStorage: IWebLocalStorage

  constructor(clientHTTP: IClientHTTP, webLocalStorage: IWebLocalStorage) {
    this.clientHTTP = clientHTTP
    this.webLocalStorage = webLocalStorage
  }

  async getDelivery(
    carrier: ICarrierDTO,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    try {
      const { id: carrierId } = carrier
      const res = await this.clientHTTP.get(
        `${API_URL}/tracker/${carrierId}/${trackingNumber}`
      )
      const { isError, message, data } = await res.json()

      if (isError) {
        return new LayerDTO({
          isError,
          message
        })
      } else {
        return new LayerDTO({
          data
        })
      }
    } catch (error) {
      return new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async getTrackers(): Promise<ILayerDTO<ITrackerDTO[]>> {
    try {
      const { data } = await this.webLocalStorage.getItem(TRACKER_LIST)
      const parseJSON = JSON.parse(data)

      if (parseJSON === null || !Array.isArray(parseJSON)) {
        return new LayerDTO({
          data: []
        })
      }

      return new LayerDTO({
        data: parseJSON.map((tracker: ITrackerDTO) => {
          return new TrackerDTO({
            id: tracker.id,
            carrierId: tracker.carrierId,
            label: tracker.label,
            trackingNumber: tracker.trackingNumber,
            memos: tracker.memos
          })
        })
      })
    } catch (error) {
      new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async addTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    try {
      const newTrackers = data.concat(tracker)
      const parseString = JSON.stringify(newTrackers)

      const { data: innerData } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        parseString
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async updateTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    try {
      const newTrackers = data.map((target) => {
        return target.id === tracker.id ? tracker : target
      })

      const { data: innerData } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    try {
      const newTrackers = data.filter((target) => {
        return target.id !== trackerId
      })

      const { data: innerData } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      return new LayerDTO({
        data: innerData
      })
    } catch (error) {
      new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }

  async clearTrackers(): Promise<ILayerDTO<boolean>> {
    try {
      const { data } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        JSON.stringify([])
      )

      return new LayerDTO({
        data: data
      })
    } catch (error) {
      new LayerDTO({
        isError: true,
        message: error.message
      })
    }
  }
}
