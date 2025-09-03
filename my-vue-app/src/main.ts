import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import { createWebHistory, createRouter } from 'vue-router'


import MovieView from '@/views/Movie.vue'
import ListView from '@/views/List.vue'

const routes = [
  { path: '/', component: ListView },
  { path: '/movie/:id', component: MovieView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')
