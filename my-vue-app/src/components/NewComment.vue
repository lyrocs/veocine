<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'

const comment = ref('')
const rating = ref(10)

const emit = defineEmits(['addComment'])

const addComment = () => {
    emit('addComment', comment.value, rating.value)
    comment.value = ''
    rating.value = 10
}
</script>

<template>
    <div class="flex flex-col gap-4 p-4 rounded-lg shadow bg-white border">
        <label>Let us know what you think about this movie</label>
        <textarea v-model="comment" placeholder="Your comment"></textarea>
        <div class="flex items-center gap-2">
            <input type="number" min="1" max="10" v-model="rating">
            <span>★</span>
        </div>
        <Button @click="addComment" type="button" variant="default">Send</Button>
    </div>
</template>