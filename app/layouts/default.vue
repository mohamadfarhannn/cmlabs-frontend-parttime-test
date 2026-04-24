<template>
  <div class="min-h-screen bg-white flex flex-col">
    <OrganismNavbar />
    <main class="flex-1">
      <slot />
    </main>
    <!-- Footer -->
    <OrganismFooter />
  </div>
</template>
