import { get, has } from 'json-pointer'

export const urlPattern: RegExp = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
export const emailPattern: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

export default {
  length: (limit: number) => (value: string): boolean => value.length === limit,
  minLength: (limit: number) => (value: string): boolean => value.length >= limit,
  maxLength: (limit: number) => (value: string): boolean => value.length <= limit,
  matches: (pattern: RegExp) => (value: string): boolean => pattern.test(value),
  url: () => (value: string): boolean => urlPattern.test(value),
  email: () => (value: string): boolean => emailPattern.test(value),
  // todo: add string.uuid
  // todo: add string.alphanumeric
  // todo: add string.alpha
  // todo: add string.numeric
  // todo: add string.alphanumeric dash
  confirmed: () => (value: string, obj: any, path: string): boolean => {
    const confirmPath = `${path}_confirmation`
    return (has(obj, path) && has(obj, confirmPath) && get(obj, path) === get(obj, confirmPath))
  },
}
