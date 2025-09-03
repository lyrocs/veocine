<script setup lang="ts">

import type { Comment } from '@/types/comment'

const props = defineProps<{ comment: Comment }>()
</script>

<template>
    <div class="p-4 rounded-lg shadow bg-white flex flex-col gap-2 border">
        <div class="flex items-center gap-2 text-lg font-semibold text-gray-800">
            <span>{{ comment?.username }}</span>
            <div class="flex items-center gap-1">
                <span class="text-yellow-400">★</span>
                <span class="font-bold text-yellow-500">{{ comment?.rating }} / 10</span>
            </div>
        </div>
        <div class="text-gray-700">{{ comment?.text }}</div>
    </div>
</template>