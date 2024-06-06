import { v4 as uuidv4 } from "uuid"
import Tracker from "../../core/domains/entities/Tracker"
import ITrackerUseCase from "../../core/domains/usecases/interfaces/ITrackerUseCase"
import IDeliveryDTO from "../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ITrackerController from "./interfaces/ITrackerController"
import ITrackerViewDTO from "../dtos/interfaces/ITrackerViewDTO"
import TrackerViewDTO from "../dtos/TrackerViewDTO"
import LayerDTO from "../../core/dtos/LayerDTO"

export default class TrackerController implements ITrackerController {
  constructor(private readonly trackerUseCase: ITrackerUseCase) {}

  async getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>> {
    return this.trackerUseCase.getDelivery(carrierId, trackingNumber)
  }

  async addTracker(): Promise<ILayerDTO<boolean>> {
    const newTracker = new Tracker({
      id: uuidv4()
    })

    return this.trackerUseCase.addTracker(newTracker)
  }

  async getTrackers(): Promise<ILayerDTO<ITrackerViewDTO[]>> {
    const { isError, message, data } = await this.trackerUseCase.getTrackers()
    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const trackerViewDTOs = data.map((tracker: ITrackerViewDTO) => {
      return new TrackerViewDTO({
        id: tracker.id,
        carrierId: tracker.carrierId,
        label: tracker.label,
        trackingNumber: tracker.trackingNumber,
        memos: tracker.memos
      })
    })

    return new LayerDTO({
      data: trackerViewDTOs
    })
  }

  async updateCarrierId(
    tracker: ITrackerViewDTO,
    newCarrierId: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateCarrierId(trackerEntitiy, newCarrierId)
  }

  async updateLabel(
    tracker: ITrackerViewDTO,
    newLabel: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateLabel(trackerEntitiy, newLabel)
  }

  async updateTrackingNumber(
    tracker: ITrackerViewDTO,
    newTrackingNumber: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateTrackingNumber(
      trackerEntitiy,
      newTrackingNumber
    )
  }

  async addMemo(tracker: ITrackerViewDTO): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.addMemo(trackerEntitiy)
  }

  async updateMemo(
    tracker: ITrackerViewDTO,
    index: number,
    newMemo: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateMemo(trackerEntitiy, index, newMemo)
  }

  async deleteMemo(
    tracker: ITrackerViewDTO,
    index: number
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.deleteMemo(trackerEntitiy, index)
  }

  async deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.deleteTracker(trackerId)
  }

  async clearTrackers(): Promise<ILayerDTO<boolean>> {
    return this.trackerUseCase.clearTrackers()
  }

  protected convertToEntity(trackerViewDTO: ITrackerViewDTO) {
    return new Tracker({
      id: trackerViewDTO.id,
      carrierId: trackerViewDTO.carrierId,
      label: trackerViewDTO.label,
      trackingNumber: trackerViewDTO.trackingNumber,
      memos: trackerViewDTO.memos
    })
  }
}
