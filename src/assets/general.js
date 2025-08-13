import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

const BP = { sm: 640, md: 768, lg: 1024, xl: 1280 }

export function useBreakpoint() {
    const width = ref(typeof window !== 'undefined' ? window.innerWidth : BP.md)

    const onResize = () => { width.value = window.innerWidth }
    onMounted(() => window.addEventListener('resize', onResize, { passive: true }))
    onBeforeUnmount(() => window.removeEventListener('resize', onResize))

    const isMobile = computed(() => width.value < BP.md)
    const isTablet = computed(() => width.value >= BP.md && width.value < BP.lg)
    const isDesktop = computed(() => width.value >= BP.lg)

    return { width, isMobile, isTablet, isDesktop, BP }
}