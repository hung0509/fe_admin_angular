
export interface User {
    email: string
    token: string
}

export interface UserDetail {
    lastname: string
    firstname: string
    dateOfBirth: string
    email: string
    gender: number
    isAuthenticated: boolean
  }

  export interface userInfo{
    id: number
    lastname: string
    firstname: string
    dateOfBirth: string
    email: string
    password: string
    gender: boolean
    role: string
    createdAt: string
    updatedAt: string
}

  export class getUserInfo{
    public static users: userInfo[] =[
        {   
            id: 1,
            lastname: 'string',
            firstname: 'hung',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: false,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        },
        {   
            id: 2,
            lastname: 'string',
            firstname: 'string',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: true,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        },
        {   
            id: 3,
            lastname: 'string',
            firstname: 'string',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: true,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        },
        {   
            id: 4,
            lastname: 'string',
            firstname: 'string',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: true,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        },
        {   
            id: 5,
            lastname: 'string',
            firstname: 'string',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: true,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        },
        {   
            id: 6,
            lastname: 'string',
            firstname: 'string',
            dateOfBirth: '05/09/2003',
            email: 'abc@gmail.com',
            password: 'string',
            gender: true,
            role: 'Customer',
            createdAt: '22/02/2024',
            updatedAt: '23/02/2024',
        }

    ]
}