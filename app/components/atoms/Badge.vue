<script setup lang="ts">
defineProps<{
  label: string
  variant?: 'default' | 'orange' | 'blue' | 'green' | 'red'
}>()

const variantClasses: Record<string, string> = {
  default: 'bg-gray-100 text-gray-600',
  orange: 'bg-brand-50 text-brand-700',
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  red: 'bg-red-50 text-red-700',
}
</script>

<template>
  <span
    :class="[
      'inline-flex items-center px-3 py-1 text-xs font-medium rounded-full transition-colors',
      variantClasses[variant || 'default'],
    ]"
  >
    {{ label }}
  </span>
</template>
