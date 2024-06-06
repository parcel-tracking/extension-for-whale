import IDeliveryDTO from "../../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"
import ITrackerViewDTO from "../../dtos/interfaces/ITrackerViewDTO"

export default interface ITrackerController {
  getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  addTracker(): Promise<ILayerDTO<boolean>>
  getTrackers(): Promise<ILayerDTO<ITrackerViewDTO[]>>
  updateCarrierId(
    tracker: ITrackerViewDTO,
    newCarrierId: string
  ): Promise<ILayerDTO<boolean>>
  updateLabel(
    tracker: ITrackerViewDTO,
    newLabel: string
  ): Promise<ILayerDTO<boolean>>
  updateTrackingNumber(
    tracker: ITrackerViewDTO,
    newTrackingNumber: string
  ): Promise<ILayerDTO<boolean>>
  addMemo(tracker: ITrackerViewDTO): Promise<ILayerDTO<boolean>>
  updateMemo(
    tracker: ITrackerViewDTO,
    index: number,
    newMemo: string
  ): Promise<ILayerDTO<boolean>>
  deleteMemo(
    tracker: ITrackerViewDTO,
    index: number
  ): Promise<ILayerDTO<boolean>>
  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
}
