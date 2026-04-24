<script setup lang="ts">
defineProps({
  modelValue: String,
  placeholder: {
    type: String,
    default: 'Search...'
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
  <div class="relative w-full">
    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
      <Icon name="lucide:search" class="w-5 h-5 text-gray-400" />
    </div>
    
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      type="text"
      :placeholder="placeholder"
      class="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-gray-50 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
    />
  </div>
</template>

