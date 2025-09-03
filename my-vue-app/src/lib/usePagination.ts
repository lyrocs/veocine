import { ref, computed } from 'vue'

export function usePagination<T = any>(initialPage = 1, initialLimit = 10) {
  const page = ref(initialPage)
  const limit = ref(initialLimit)
  const list = ref<T[]>([])

  const total = computed(() => list.value.length)

  const paginatedList = computed(() => {
    const start = (page.value - 1) * limit.value
    const end = page.value * limit.value
    return list.value.slice(start, end)
})

  function onChangePage(pageNumber: number) {
    page.value = pageNumber
  }

  return {
    page,
    limit,
    list,
    total,
    paginatedList,
    onChangePage,
    
  }
}
