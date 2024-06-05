import ITrackerVO from "./interfaces/ITrackerVO"

export default class TrackerVO implements ITrackerVO {
  id: string
  carrierId: string
  label: string
  trackingNumber: string
  memos: string[]

  constructor({
    id,
    carrierId,
    label,
    trackingNumber,
    memos
  }: {
    id: string
    carrierId: string
    label: string
    trackingNumber: string
    memos: string[]
  }) {
    this.id = id
    this.carrierId = carrierId
    this.label = label
    this.trackingNumber = trackingNumber
    this.memos = memos
  }
}
