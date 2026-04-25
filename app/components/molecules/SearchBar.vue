<script setup lang="ts">
import { ref, watch } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  modelValue: string
  label?: string
  placeholder?: string
  class?: string
  containerClass?: string
  inputClass?: string
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
  <div :class="cn('flex flex-col gap-2 w-full max-w-[280px]', $props.class)">
    <label v-if="label" class="text-sm font-semibold text-gray-600 ml-1">
      {{ label }}
    </label>

    <div :class="cn('relative w-full md:w-[320px] group', containerClass)">
      <input
        :value="localValue"
        @input="onInput"
        type="text"
        :placeholder="placeholder || 'Search Ingredients...'"
        :class="cn('block w-full py-3 pl-6 pr-12 text-sm text-gray-800 placeholder-gray-500 bg-gray-100 border border-transparent rounded-full focus:bg-white focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition-all duration-300 shadow-sm', inputClass)"
      />

      <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
        <Icon name="lucide:search" class="w-5 h-5 text-gray-600 transition-colors group-focus-within:text-brand-500" />
      </div>
    </div>
  </div>
</template>
