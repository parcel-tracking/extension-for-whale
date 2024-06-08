import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import IWebLocalStorage from "./interfaces/IWebLocalStorage"

export default class WebLocalStorage implements IWebLocalStorage {
  constructor(
    private readonly storage: {
      getItem(key: string): string
      setItem(key: string, value: string): void
      removeItem(key: string): void
      clear(): void
    }
  ) {}

  getItem(key: string): Promise<ILayerDTO<string | null>> {
    return new Promise((resolve) => {
      const data = this.storage.getItem(key)
      resolve(
        new LayerDTO({
          data
        })
      )
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      this.storage.setItem(key, value)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      this.storage.removeItem(key)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      this.storage.clear()
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }
}
