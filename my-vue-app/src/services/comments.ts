import type { Comment } from '@/types/comment'

export const fetchComments = async (movieId: number): Promise<Comment[]|undefined> => {
    return fetch(`http://localhost:3000/comments/${movieId}`)
        .then(response => response.json())
        .then(data => data as Comment[])
        .catch(_ => undefined)
}

export const postComment = async (movieId: number, comment: Comment): Promise<Comment|undefined> => {
    return fetch(`http://localhost:3000/comments/${movieId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
    })
        .then(response => response.json())
        .then(data => data as Comment)
        .catch(_ => undefined)
}