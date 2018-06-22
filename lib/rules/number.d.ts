declare const _default: {
    number: () => (value: number) => boolean;
    integer: () => (value: number) => boolean;
    min: (min: number, exclusive?: boolean) => (value: number) => boolean;
    max: (max: number, exclusive?: boolean) => (value: number) => boolean;
    multipleOf: (modulus: number) => (value: number) => boolean;
};
export default _default;
