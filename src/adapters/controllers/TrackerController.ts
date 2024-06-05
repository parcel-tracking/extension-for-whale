import { v4 as uuidv4 } from "uuid"
import Tracker from "../../core/domains/entities/Tracker"
import ITrackerUseCase from "../../core/domains/usecases/interfaces/ITrackerUseCase"
import IDeliveryDTO from "../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import ITrackerController from "./interfaces/ITrackerController"
import ITrackerVO from "../vos/interfaces/ITrackerVO"
import TrackerVO from "../vos/TrackerVO"
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

  async getTrackers(): Promise<ILayerDTO<ITrackerVO[]>> {
    const { isError, message, data } = await this.trackerUseCase.getTrackers()
    if (isError) {
      return new LayerDTO({
        isError,
        message
      })
    }

    const trackerVOs = data.map((tracker: ITrackerVO) => {
      return new TrackerVO({
        id: tracker.id,
        carrierId: tracker.carrierId,
        label: tracker.label,
        trackingNumber: tracker.trackingNumber,
        memos: tracker.memos
      })
    })

    return new LayerDTO({
      data: trackerVOs
    })
  }

  async updateCarrierId(
    tracker: ITrackerVO,
    newCarrierId: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateCarrierId(trackerEntitiy, newCarrierId)
  }

  async updateLabel(
    tracker: ITrackerVO,
    newLabel: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateLabel(trackerEntitiy, newLabel)
  }

  async updateTrackingNumber(
    tracker: ITrackerVO,
    newTrackingNumber: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateTrackingNumber(
      trackerEntitiy,
      newTrackingNumber
    )
  }

  async addMemo(tracker: ITrackerVO): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.addMemo(trackerEntitiy)
  }

  async updateMemo(
    tracker: ITrackerVO,
    index: number,
    newMemo: string
  ): Promise<ILayerDTO<boolean>> {
    const trackerEntitiy = this.convertToEntity(tracker)

    return this.trackerUseCase.updateMemo(trackerEntitiy, index, newMemo)
  }

  async deleteMemo(
    tracker: ITrackerVO,
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

  protected convertToEntity(trackerVO: ITrackerVO) {
    return new Tracker({
      id: trackerVO.id,
      carrierId: trackerVO.carrierId,
      label: trackerVO.label,
      trackingNumber: trackerVO.trackingNumber,
      memos: trackerVO.memos
    })
  }
}
