import { SizeColor } from "./size"

export interface Color {
    id: number
    name: string
    colorCode: string
}

export interface ColorVariant {
    color: string
    colorCode: string
    variants?: SizeColor[]
}

export class getColor{
    public static colors: Color[] = [
        {
            id:1,
            name: "Trắng",
            colorCode: "#fff"
        },
        {
            id:2,
            name: "Đen",
            colorCode: "#000"
        }
    ]
}