export type Movie = {
    id: number,
    title: string,
    releaseDate: string,
    description: string,
    genre: string,
    author: {
      firstName: string,
      lastName: string,
      age: number
    }
  }