
export interface Product {
    name: string
    price: number
    mainPhoto: string
    subPhoto: string
    productColors: ProductColor[]
    discount: number
    slug: string
  }

export interface ProductDetail {
  name: string
  price: number
  description: string
  discount: number
  slug: string
  productImages: ProductImage[]
  productVariants: ProductVariant[]
}

export interface ProductImage {
  imageUrl: string
}

export interface ProductVariant {
  id: number
  amount: number
  color: string
  colorCode: string
  size: string
}

export interface ProductColor {
  name: string
  colorCode: string
}

export interface CreateProduct {
  name: string
  price: number
  description: string
  discount: number
  slug: string
  categoryId: number
  productColors: number[]
  productSizes: number[]
  productImages: File[]
}


export interface ProductInfo{
  id: number
  name: string
  price: number
  category: string
  description: string
  discount: number
  slug: string
  colorCode: string
  size: string
  amount: number
}

export class GenerateTestProductList{
  public static products: ProductInfo[] = [
    {
      id: 1,
      name: "quần",
      price: 1000000,
      category: "bottom",
      description: 'string',
      discount: 5,
      slug: 'string',
      colorCode: '#fff',
      size: 'M',
      amount: 10
    },
    {
      id: 2,
      name: "quần",
      price: 1000000,
      category: "bottom",
      description: 'string',
      discount: 5,
      slug: 'string',
      colorCode: '#000',
      size: 'S',
      amount: 10
    },
    {
      id: 3,
      name: "quần",
      price: 1000000,
      category: "bottom",
      description: 'string',
      discount: 5,
      slug: 'string',
      colorCode: '#fff',
      size: 'L',
      amount: 15
    },
    {
      id: 4,
      name: "Áo",
      price: 1000000,
      category: "top",
      description: 'string',
      discount: 3,
      slug: 'string',
      colorCode: '#fff',
      size: 'S',
      amount: 20
    }
    ,
    {
      id: 5,
      name: "Áo",
      price: 1000000,
      category: "top",
      description: 'string',
      discount: 5,
      slug: 'string',
      colorCode: '#fff',
      size: 'L',
      amount: 10
    }
  ]
}