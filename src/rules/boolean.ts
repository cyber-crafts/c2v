export default {
  boolean: () => (value: any): boolean => typeof value === 'boolean',
  isTrue: () => (value: any): boolean => value === true,
}
