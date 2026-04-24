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
  <div class="flex flex-col gap-2 w-full max-w-[280px]">
    <label v-if="label" class="text-sm font-semibold text-gray-600 ml-1">
      {{ label }}
    </label>

    <div class="relative w-full md:w-[320px] group">
      <input
        :value="localValue"
        @input="onInput"
        type="text"
        :placeholder="placeholder || 'Search Ingredients...'"
        class="block w-full py-3 pl-6 pr-12 text-sm text-gray-800 placeholder-gray-500 bg-[#E5E7EB] border border-transparent rounded-full focus:ring-2 focus:ring-gray-300 focus:outline-none transition-all shadow-sm"
      />
      <!-- Search icon aligned to right -->
      <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <Icon name="lucide:search" class="w-5 h-5 text-gray-600 transition-colors group-focus-within:text-gray-900" />
      </div>
    </div>
  </div>
</template>
