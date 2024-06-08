import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import IWebLocalStorage from "./interfaces/IWebLocalStorage"

export default class WebLocalStorage implements IWebLocalStorage {
  getItem(key: string): Promise<ILayerDTO<string | null>> {
    return new Promise((resolve) => {
      const data = localStorage.getItem(key)
      resolve(
        new LayerDTO({
          data
        })
      )
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      localStorage.setItem(key, value)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      localStorage.removeItem(key)
      resolve(
        new LayerDTO({
          data: true
        })
      )
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      new LayerDTO({
        isError: true,
        message: "Failed to delete value from web storage."
      })
    })
  }
}
