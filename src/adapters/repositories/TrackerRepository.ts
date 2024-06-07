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
    }

    return new LayerDTO({
      data
    })
  }

  async getTrackers(): Promise<ILayerDTO<ITrackerDTO[]>> {
    const { isError, message, data } = await this.webLocalStorage.getItem(
      TRACKER_LIST
    )

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const parseJSON = JSON.parse(data)

    if (parseJSON === null || Array.isArray(parseJSON)) {
      new LayerDTO({
        data: []
      })
    }

    return new LayerDTO({
      data: parseJSON.map((tracker) => {
        return new TrackerDTO({
          id: tracker.id,
          carrierId: tracker.carrierId,
          label: tracker.label,
          trackingNumber: tracker.trackingNumber,
          memos: tracker.memos
        })
      })
    })
  }

  async addTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const newTrackers = data.concat(tracker)
    const parseString = JSON.stringify(newTrackers)

    const {
      isError: innerIsError,
      message: innerMessage,
      data: innerData
    } = await this.webLocalStorage.setItem(TRACKER_LIST, parseString)

    if (innerIsError) {
      return new LayerDTO({
        isError: innerIsError,
        message: innerMessage
      })
    }

    return new LayerDTO({
      data: innerData
    })
  }

  async updateTracker(tracker: ITracker): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.getTrackers()

    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    if (data) {
      const newTrackers = data.map((target) => {
        return target.id === tracker.id ? tracker : target
      })

      const {
        isError: innerIsError,
        message: innerMessage,
        data: innerData
      } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      if (innerIsError) {
        return new LayerDTO({
          isError: innerIsError,
          message: innerMessage
        })
      }

      return new LayerDTO({
        data: innerData
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

    if (data) {
      const newTrackers = data.filter((target) => {
        return target.id !== trackerId
      })

      const {
        isError: innerIsError,
        message: innerMessage,
        data: innerData
      } = await this.webLocalStorage.setItem(
        TRACKER_LIST,
        JSON.stringify(newTrackers)
      )

      if (innerIsError) {
        return new LayerDTO({
          isError: innerIsError,
          message: innerMessage
        })
      }

      return new LayerDTO({
        data: innerData
      })
    }
  }

  async clearTrackers(): Promise<ILayerDTO<boolean>> {
    const { isError, message, data } = await this.webLocalStorage.setItem(
      TRACKER_LIST,
      JSON.stringify([])
    )

    if (isError) {
      return new LayerDTO({
        isError: isError,
        message: message
      })
    }

    return new LayerDTO({
      data: data
    })
  }
}
