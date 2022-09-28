export default {
  number: () => (value: number): boolean => !isNaN(value),
  integer: () => (value: number): boolean => Number.isInteger(value),
  min: (min: number, exclusive = false) => (value: number): boolean => (exclusive) ? value > min : value >= min,
  max: (max: number, exclusive = false) => (value: number): boolean => (exclusive) ? value < max : value <= max,
  multipleOf: (modulus: number) => (value: number): boolean => value % modulus === 0,
}
