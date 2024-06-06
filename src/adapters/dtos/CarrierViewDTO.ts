import ICarrierViewDTO from "./interfaces/ICarrierViewDTO"

export default class CarrierViewDTO implements ICarrierViewDTO {
  id: string
  no: number
  name: string
  displayName: string
  isCrawlable: boolean
  isPopupEnabled: boolean
  popupURL: string

  constructor({
    id,
    no,
    name,
    displayName,
    isCrawlable,
    isPopupEnabled,
    popupURL
  }: {
    id: string
    no: number
    name: string
    displayName: string
    isCrawlable: boolean
    isPopupEnabled: boolean
    popupURL: string
  }) {
    this.id = id
    this.no = no
    this.name = name
    this.displayName = displayName
    this.isCrawlable = isCrawlable
    this.isPopupEnabled = isPopupEnabled
    this.popupURL = popupURL
  }
}
