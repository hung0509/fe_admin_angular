
export interface Size {
    id: number
    name: string
}

export interface SizeColor {
    id: number
    size: string
    amount: number
}

export class getSize{
    public static sizes : Size[] = [
        {
            id: 1,
            name: 'M'
        },
        {
            id: 2,
            name: 'S'
        },
        {
            id: 3,
            name: 'L'
        }
    ]
}