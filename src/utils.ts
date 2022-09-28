export const sanitizePath = (path: string): string => {
  path = (path.substr(0, 1) === "$") ? path.substr(1) : path
  return (path.substr(0, 1) === "/") ? path : "/" + path
}
