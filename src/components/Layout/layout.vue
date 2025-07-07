<script setup>
import { ref, onMounted } from 'vue';
import {
    NConfigProvider,
} from 'naive-ui';
import { gsap } from 'gsap';
import {
    ScrollSmoother,
    ScrollTrigger
} from 'gsap/all';
import HomeVue from '../home/home.vue';
import AboutVue from '../about/about.vue';
import MusicalVue from '../musical/musical.vue';
import router from '../../router/router';

const themeOverrides = {
    common: {
        "primaryColor": "#E4D8FFFF", // 这里可以自定义主题色
        "primaryColorHover": "#EFE9FFFF",
        "primaryColorPressed": "#C8B3FFFF",
        "primaryColorSuppl": "#AB97DEFF",
    },
};

onMounted(() => {
    const smoother = ref(null);

    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    smoother.value = ScrollSmoother.create({
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
    })
})
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-layout>
            <n-layout-header>
                <n-flex :justify="'space-between'" :align="'center'">
                    <n-flex class="logo" :align="'center'">
                        <n-avatar round style="background: var(--primary-color)">S</n-avatar>
                        <div>Sophia's Website</div>
                    </n-flex>
                    <n-flex :size="48">
                        <n-button text>ABOUT ME</n-button>
                        <n-button text @click="router.push({ name: 'Musicals' })">MUSICALS</n-button>
                        <n-button text>CONTACTS</n-button>
                        <n-button text>CURRICULAR</n-button>
                    </n-flex>
                </n-flex>
            </n-layout-header>
            <n-layout-content>
                <home-vue></home-vue>
                <about-vue></about-vue>
                <musical-vue></musical-vue>
            </n-layout-content>
        </n-layout>
    </n-config-provider>
</template>

<style lang='less' scoped>
.n-layout-header {
    // 边距
    padding: 2rem;
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    font-family: "Bebas Neue", sans-serif;
}
</style>
