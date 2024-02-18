export type Recipe = {
    id: number
    name: string
    description: string
    imageLink: string
    userId: number
    isDelivered: boolean
    compensation: number
    ingredients: string[]
    reciepe: string[]
    user: {
      name: string
    }
  }