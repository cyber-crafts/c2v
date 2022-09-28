export const sanitizePath = (path: string): string => {
  path = (path.substring(0, 1) === "$") ? path.substring(1) : path
  return (path.substring(0, 1) === "/") ? path : "/" + path
}
