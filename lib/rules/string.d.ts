export declare const urlPattern: RegExp;
export declare const emailPattern: RegExp;
declare const _default: {
    length: (limit: number) => (value: string) => boolean;
    minLength: (limit: number) => (value: string) => boolean;
    maxLength: (limit: number) => (value: string) => boolean;
    matches: (pattern: RegExp) => (value: string) => boolean;
    url: () => (value: string) => boolean;
    email: () => (value: string) => boolean;
    confirmed: () => (value: string, obj: any, path: string) => boolean;
};
export default _default;
