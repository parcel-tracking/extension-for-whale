import LayerDTO from "../../core/dtos/LayerDTO"
import ILayerDTO from "../../core/dtos/interfaces/ILayerDTO"
import IWebLocalStorage from "./interfaces/IWebLocalStorage"

export default class WebLocalStorage implements IWebLocalStorage {
  getItem(key: string): Promise<ILayerDTO<string | null>> {
    return new Promise((resolve) => {
      try {
        const data = localStorage.getItem(key)
        resolve(
          new LayerDTO({
            data
          })
        )
      } catch {
        new LayerDTO({
          isError: true,
          message: "Failed to retrieve value from web storage."
        })
      }
    })
  }

  setItem(key: string, value: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      try {
        localStorage.setItem(key, value)
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch {
        new LayerDTO({
          isError: true,
          message: "Failed to save value from web storage."
        })
      }
    })
  }

  removeItem(key: string): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      try {
        localStorage.removeItem(key)
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch {
        new LayerDTO({
          isError: true,
          message: "Failed to delete value from web storage."
        })
      }
    })
  }

  clear(): Promise<ILayerDTO<boolean>> {
    return new Promise((resolve) => {
      try {
        localStorage.clear()
        resolve(
          new LayerDTO({
            data: true
          })
        )
      } catch {
        new LayerDTO({
          isError: true,
          message: "Failed to delete value from web storage."
        })
      }
    })
  }
}
