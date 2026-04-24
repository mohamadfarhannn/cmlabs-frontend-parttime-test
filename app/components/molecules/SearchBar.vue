<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
}>()

const emit = defineEmits(['update:modelValue'])

const localValue = ref(props.modelValue)

const debouncedEmit = useDebounceFn((val: string) => {
  emit('update:modelValue', val)
}, 250)

watch(() => props.modelValue, (v) => {
  localValue.value = v
})

function onInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  localValue.value = val
  debouncedEmit(val)
}

function clear() {
  localValue.value = ''
  emit('update:modelValue', '')
}
</script>

<template>
  <div class="flex flex-col gap-2 w-full max-w-lg mx-auto">
    <label v-if="label" class="text-sm font-semibold text-gray-600 ml-1">
      {{ label }}
    </label>

    <div class="relative w-full group">
      <!-- Search icon -->
      <div class="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
        <Icon name="lucide:search-icon" class="w-5 h-5 text-gray-400 group-focus-within:text-brand-500 transition-colors" />
      </div>

      <input
        :value="localValue"
        @input="onInput"
        type="text"
        :placeholder="placeholder || 'Search...'"
        class="block w-full py-3 pl-12 pr-10 text-sm text-gray-900 border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-brand-500/20 focus:border-brand-400 outline-none transition-all shadow-sm hover:shadow-md focus:shadow-md"
      />

      <!-- Clear button -->
      <button
        v-if="localValue"
        @click="clear"
        class="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Clear search"
      >
        <Icon name="lucide:x" class="w-4 h-4" />
      </button>
    </div>
  </div>
</template>
