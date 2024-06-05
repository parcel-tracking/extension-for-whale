import IDeliveryDTO from "../../../core/dtos/interfaces/IDeliveryDTO"
import ILayerDTO from "../../../core/dtos/interfaces/ILayerDTO"
import ITrackerVO from "../../vos/interfaces/ITrackerVO"

export default interface ITrackerController {
  getDelivery(
    carrierId: string,
    trackingNumber: string
  ): Promise<ILayerDTO<IDeliveryDTO>>
  addTracker(): Promise<ILayerDTO<boolean>>
  getTrackers(): Promise<ILayerDTO<ITrackerVO[]>>
  updateCarrierId(
    tracker: ITrackerVO,
    newCarrierId: string
  ): Promise<ILayerDTO<boolean>>
  updateLabel(
    tracker: ITrackerVO,
    newLabel: string
  ): Promise<ILayerDTO<boolean>>
  updateTrackingNumber(
    tracker: ITrackerVO,
    newTrackingNumber: string
  ): Promise<ILayerDTO<boolean>>
  addMemo(tracker: ITrackerVO): Promise<ILayerDTO<boolean>>
  updateMemo(
    tracker: ITrackerVO,
    index: number,
    newMemo: string
  ): Promise<ILayerDTO<boolean>>
  deleteMemo(tracker: ITrackerVO, index: number): Promise<ILayerDTO<boolean>>
  deleteTracker(trackerId: string): Promise<ILayerDTO<boolean>>
  clearTrackers(): Promise<ILayerDTO<boolean>>
}
