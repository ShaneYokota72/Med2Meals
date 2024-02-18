export type Recipe = {
    id: number
    name: string
    description: string
    imageLink: string
    userId: number
    isDelivered: boolean
    compenstation: number
    ingredients: string
    reciepe: string
    user: {
      name: string
    }
  }