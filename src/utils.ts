import { IValidationResult } from "./intefaces"

export const wrap = <T> (value: T): Promise<T> => {
  return Promise.resolve(value)
}

export const success = (): IValidationResult => {
  return {success: true, errors: [], messages: []}
}

export const elevatePaths = (basePath: string, validationResult: IValidationResult): IValidationResult => {
  validationResult.errors.forEach(error => {
    error.dataPath = `${basePath}/${error.dataPath}`
  })
  return validationResult
}

export const combineValidationResults = (...validationResults: IValidationResult[]): IValidationResult => {
  const validationResult: IValidationResult =
    {success: true, messages: [], errors: []}

  validationResults.forEach(vr => {
    if (!vr.success) validationResult.success = false
    validationResult.messages = validationResult.messages.concat(vr.messages)
    validationResult.errors = validationResult.errors.concat(vr.errors)
  })
  return validationResult
}
