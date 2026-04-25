<script setup lang="ts">
defineProps<{
  id?: string
  name?: string
  thumbnail?: string
  loading?: boolean
}>()
</script>

<template>
  <div
    v-if="loading"
    class="h-full flex flex-col rounded-xl bg-white p-3 md:p-4 shadow-sm border border-gray-100 animate-pulse"
  >
    <div class="h-6 bg-gray-200 rounded w-3/4 mb-4" />
    <div class="relative aspect-[5/6] mb-6 bg-gray-200 rounded-xl" />
    <div class="mt-auto h-10 bg-gray-100 rounded-full" />
  </div>

  <NuxtLink
    v-else-if="id && name && thumbnail"
    :to="`/meal/${id}`"
    class="group h-full flex flex-col rounded-xl bg-white px-2 py-3 md:p-4 transition-all duration-500 shadow-sm hover:shadow-lg hover:border-brand-200 hover:-translate-y-2 border border-gray-200"
  >
  
    <!-- Title -->
    <div class="h-10 md:h-[3.75rem] flex items-center mb-2 sm:mb-4">
      <h3 class="text-sm md:text-xl font-bold text-gray-900 group-hover:text-brand-600 transition-colors leading-[1.2] line-clamp-2">
        {{ name }}
      </h3>
    </div>

    <!-- Image -->
    <div class="relative aspect-[5/6] mb-6">
      <img
      :src="thumbnail"
      :alt="name"
      class="w-full h-full object-cover rounded-xl shadow-sm transform transition-transform duration-700 group-hover:scale-105"
      loading="lazy"
      />
    </div>
  
    <!-- Action Bar -->
    <div class="mt-auto bg-neutral-900 rounded-full flex items-center justify-between p-1 pl-6 pr-2 group-hover:bg-brand-600 transition-colors duration-300">
      <span class="text-sm md:text-base font-regular text-white">Let's Cook!</span>
      <div class="w-6 h-6 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
        <Icon name="lucide:chef-hat" class="w-4 h-4 md:w-5 md:h-5 text-neutral-900" />
      </div>
    </div>
  </NuxtLink>
</template>
