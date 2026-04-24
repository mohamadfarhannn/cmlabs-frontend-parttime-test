<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  url: string
}>()

/**
 * Extract YouTube video ID from various URL formats:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 */
const videoId = computed(() => {
  if (!props.url) return null
  const match = props.url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  )
  return match?.[1] || null
})

const embedUrl = computed(() =>
  videoId.value ? `https://www.youtube.com/embed/${videoId.value}` : null
)
</script>

<template>
  <div v-if="embedUrl" class="relative w-full rounded-2xl overflow-hidden shadow-lg bg-gray-900">
    <div class="relative w-full" style="padding-bottom: 56.25%">
      <iframe
        :src="embedUrl"
        class="absolute inset-0 w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
        loading="lazy"
        title="Meal tutorial video"
      />
    </div>
  </div>
</template>
