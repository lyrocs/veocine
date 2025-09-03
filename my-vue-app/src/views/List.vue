<script setup lang="ts">
import { onMounted } from 'vue'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table'

import Pagination from '@/components/Pagination.vue'
import { usePagination } from '@/lib/usePagination'
import moment from 'moment'
import type { Movie } from '@/types/movie'
import { fetchMovies } from '@/services/movies'

const { page, limit, list, paginatedList, total, onChangePage } = usePagination<Movie>(1, 20)

onMounted(async () => {
    const movies = await fetchMovies()
    if (movies) {
        list.value = movies
    }
})

</script>

<template>
    <h2 class="text-2xl font-bold text-center pb-4">Movies list</h2>
    <Table>
        <TableCaption>A list of movies</TableCaption>
        <TableHeader>
            <TableRow>
                <TableHead class="w-[100px]">
                    Title
                </TableHead>
                <TableHead>Release Date</TableHead>
                <TableHead>Genre</TableHead>
                <TableHead>
                    Author
                </TableHead>
                <TableHead class="text-right">
                    Action
                </TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            <TableRow v-for="movie in paginatedList" :key="movie.id">
                <TableCell class="font-medium">
                    {{ movie.title }}
                </TableCell>
                <TableCell>{{ moment(movie.releaseDate).format('DD/MM/YYYY') }}</TableCell>
                <TableCell>{{ movie.genre }}</TableCell>
                <TableCell>
                    {{ movie.author.firstName }} {{ movie.author.lastName }}
                </TableCell>
                <TableCell class="text-right">
                    <router-link :to="`/movie/${movie.id}`">See details</router-link>
                </TableCell>
            </TableRow>
        </TableBody>
    </Table>
    <Pagination :limit="limit" :total="total" :page="page" @change-page="onChangePage" />

</template>