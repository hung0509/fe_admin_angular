export interface Category {
    id: number
    name: string
}

export class getCategory{
    public static categories : Category[] = [
        {id:1, name:'top'},
        {id:2, name:'bottom'},
    ]
}