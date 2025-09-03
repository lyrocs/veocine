<script setup lang="ts">
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination'

const props = defineProps({
    limit: {
        type: Number,
        default: 10
    },
    total: {
        type: Number,
        default: 0
    },
    page: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(['change-page'])

const onChangePage = (page: number) => {
    emit('change-page', page)
}
</script>

<template>
    <Pagination v-slot="{ page }" :items-per-page="limit" :total="total" :default-page="page">
        <PaginationContent v-slot="{ items }">
            <PaginationPrevious @click="onChangePage(page - 1)" />
            <template v-for="(item, index) in items" :key="index">
                <PaginationItem v-if="item.type === 'page'" @click="onChangePage(item.value)" :value="item.value"
                    :is-active="item.value === page">
                    {{ item.value }}
                </PaginationItem>
            </template>
            <PaginationEllipsis :index="4" />
            <PaginationNext @click="onChangePage(page + 1)" />
        </PaginationContent>
    </Pagination>
</template>