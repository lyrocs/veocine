import type { Movie } from '@/types/movie'

export const fetchMovies = async (): Promise<Movie[]|undefined> => {
    return fetch('http://localhost:3000/movies')
        .then(response => response.json())
        .then(data => Object.values(data as Movie[]))
        .catch(_ => undefined)
}