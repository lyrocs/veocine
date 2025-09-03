<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import moment from "moment";
import Pagination from "@/components/Pagination.vue";
import { usePagination } from "@/lib/usePagination";
import type { Movie } from "@/types/movie";
import type { Comment } from "@/types/comment";
import { Button } from "@/components/ui/button";
import CommentComponent from "@/components/Comment.vue";
import { fetchMovies } from "@/services/movies";
import { fetchComments, postComment } from "@/services/comments";
import NewComment from "@/components/NewComment.vue";

const movie = ref<Movie>();
const router = useRouter();
const id = Number(useRoute().params.id);
const {
    page,
    limit,
    list,
    paginatedList: paginatedComments,
    total,
    onChangePage,
} = usePagination<Comment>(1, 10);

const goBack = () => {
    router.push("/");
};

const getMovie = async () => {
    const movies = await fetchMovies();
    if (movies) {
        movie.value = movies[id];
    }
};
const getComments = async () => {
    const comments = await fetchComments(id);
    if (comments) {
        list.value = comments;
    }
};

onMounted(async () => {
    getMovie();
    getComments();
});

const addComment = async (comment: string, rating: number) => {
    await postComment(id, {
        username: "Your Name",
        text: comment,
        rating: rating,
    });
    await getComments();
};
</script>

<template>
    <div class="flex gap-4 flex-col">
        <Button @click="goBack()" variant="outline" class="self-start">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="currentColor"
                    d="m7.825 13l4.9 4.9q.3.3.288.7t-.313.7q-.3.275-.7.288t-.7-.288l-6.6-6.6q-.15-.15-.213-.325T4.426 12t.063-.375t.212-.325l6.6-6.6q.275-.275.688-.275t.712.275q.3.3.3.713t-.3.712L7.825 11H19q.425 0 .713.288T20 12t-.288.713T19 13z" />
            </svg> Back </Button>
        <h1>{{ movie?.title }}</h1>
        <div class="flex justify-between gap-4 flex-col md:flex-row">
            <img :src="`https://placehold.co/400x300/475569/white?text=${movie?.title}`" :alt="movie?.title"
                class="rounded-lg" />

            <div class="flex flex-col gap-2 mt-2">
                <span class="inline-flex items-center gap-2">
                    <span
                        class="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-wide">{{
                            movie?.genre }}</span>
                </span>
                <span class="inline-flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-green-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M5.121 17.804A13.937 13.937 0 0112 15c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{{ movie?.author?.firstName }} {{ movie?.author?.lastName }}</span>
                </span>
                <span class="inline-flex items-center gap-2 text-gray-700">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-purple-500" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{{ moment(movie?.releaseDate).format("DD/MM/YYYY") }}</span>
                </span>
                <div class="flex gap-4 flex-col">
                    <h2 class="font-bold">Description</h2>
                    <p class="p-4 rounded-lg shadow bg-white border">
                        {{ movie?.description }}
                    </p>
                </div>
            </div>
        </div>

        <h2 class="font-bold">Comments</h2>
        <div class="comments-list flex flex-col gap-4">
            <NewComment @add-comment="addComment" />
            <CommentComponent v-for="comment in paginatedComments" :key="comment.username" :comment="comment" />
            <Pagination :limit="limit" :total="total" :page="page" @change-page="onChangePage" />
        </div>
    </div>
</template>
