<script setup lang="ts">
import { ref, watch } from 'vue'

const route = useRoute()
const isMenuOpen = ref(false)

const navigation = [
  { label: 'Home', to: '/' },
  { label: 'Ingredients', to: '/ingredients' },
  { label: 'Meals', to: '/meals' },
]

watch(() => route.path, () => {
  isMenuOpen.value = false
})
</script>

<template>
  <nav class="sticky top-0 z-50 bg-[#1C1C1C] backdrop-blur-lg">
    <div class="max-w-6xl mx-auto px-4 sm:px-6">
      <div class="flex items-center justify-between h-16 md:h-20">
        <NuxtLink to="/" class="flex items-center gap-2.5 group">
          <img src="/logo.webp" alt="Logo" class="h-8 md:h-10 w-auto" />
        </NuxtLink>

        <!-- Desktop Menu -->
        <ul class="hidden md:flex items-center gap-6 md:gap-8 overflow-x-auto no-scrollbar">
          <li v-for="item in navigation" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="relative text-white/80 hover:text-white py-1.5 transition-colors group whitespace-nowrap text-sm md:text-base font-medium block"
            >
              {{ item.label }}
              <span 
                class="absolute bottom-0 left-0 h-[0.5px] bg-white transition-all duration-300 ease-in-out"
                :class="route.path === item.to ? 'w-full' : 'w-0 group-hover:w-full'"
              ></span>
            </NuxtLink>
          </li>
        </ul>

        <!-- Hamburger Button -->
        <button 
          @click="isMenuOpen = !isMenuOpen"
          class="flex md:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-50"
          aria-label="Toggle menu"
        >
          <Icon :name="isMenuOpen ? 'lucide:x' : 'lucide:menu'" class="w-6 h-6" />
        </button>
      </div>
    </div>

    <!-- Mobile Menu Overlay -->
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div 
        v-show="isMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-[#1C1C1C] border-t border-white/10 shadow-xl"
      >
        <ul class="flex flex-col p-4">
          <li v-for="item in navigation" :key="item.to">
            <NuxtLink
              :to="item.to"
              class="flex items-center justify-between p-4 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-all font-medium"
              :class="{ 'text-white bg-white/5': route.path === item.to }"
            >
              {{ item.label }}
              <Icon 
                name="lucide:chevron-right" 
                class="w-4 h-4 transition-transform" 
                :class="{ 'rotate-90': route.path === item.to }"
              />
            </NuxtLink>
          </li>
        </ul>
      </div>
    </Transition>
  </nav>
</template>
