export interface IPaginacao<T> {
    cout: number
    netx: string
    previous: boolean
    results: T[]
}