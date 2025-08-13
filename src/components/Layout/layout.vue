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
import router from '../../router/router';
import { useBreakpoint } from '../../assets/general';

const { isMobile } = useBreakpoint()

const showDrawer = ref(false);

const themeOverrides = {
    common: {
        "primaryColor": "#E4D8FFFF", // 这里可以自定义主题色
        "primaryColorHover": "#EFE9FFFF",
        "primaryColorPressed": "#C8B3FFFF",
        "primaryColorSuppl": "#AB97DEFF",
    },
};

const headerRef = ref(null)

const menuOptions = [
    {
        label: "ABOUT",
        routerName: "About",
    },
    {
        label: "MUSICAL",
        routerName: "Musical",
    },
    {
        label: "COMPETITION",
        routerName: "Competition",
    },
    {
        label: "COMMUNITY",
        routerName: "Community",
    }
]

onMounted(() => {
    const smoother = ref(null);

    gsap.registerPlugin(ScrollSmoother, ScrollTrigger);

    smoother.value = ScrollSmoother.create({
        smooth: 2,
        smoothTouch: 0.1,
        effects: true,
    })
})

function handleRoutesChange(option) {
    router.push({ name: option.routerName })
    showDrawer.value = false;
}
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-layout style="position: relative;">
            <div ref="headerRef" class="web-header">
                <n-flex :justify="'space-between'" :align="'center'">
                    <n-flex class="logo" :align="'center'" @click="handleRoutesChange({ routerName: 'Home' })">
                        <n-avatar round style="background: var(--primary-color)">S</n-avatar>
                        <div style="margin-top: 3px">Sophia's Website</div>
                    </n-flex>
                    <n-button @click="showDrawer = true" v-if="isMobile" text>
                        <template #icon>
                            <n-icon size="28">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-miterlimit="10" stroke-width="48" d="M88 152h336"></path>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-miterlimit="10" stroke-width="48" d="M88 256h336"></path>
                                    <path fill="none" stroke="currentColor" stroke-linecap="round"
                                        stroke-miterlimit="10" stroke-width="48" d="M88 360h336"></path>
                                </svg>
                            </n-icon>
                        </template>
                    </n-button>
                    <n-flex v-else :size="48">
                        <n-button v-for="option in menuOptions" text @click="handleRoutesChange(option)">
                            {{ option.label }}
                        </n-button>
                    </n-flex>
                </n-flex>
            </div>
            <n-layout-content>
                <router-view v-slot="{ Component }">
                    <transition mode="out-in">
                        <component :is="Component" />
                    </transition>
                </router-view>
            </n-layout-content>
        </n-layout>
        <n-drawer :auto-focus="false" v-model:show="showDrawer" :width="'100vw'" :height="'100vh'"
            :placement="'bottom'">
            <n-drawer-content>
                <div
                    style="height: 90vh; position: relative; display: flex; align-items: center; justify-content: center;">
                    <n-button style="position: absolute; top: 1rem; right: 0" text @click="showDrawer = false">
                        <template #icon>
                            <n-icon :size="28">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M289.94 256l95-95A24 24 0 0 0 351 127l-95 95l-95-95a24 24 0 0 0-34 34l95 95l-95 95a24 24 0 1 0 34 34l95-95l95 95a24 24 0 0 0 34-34z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </template>
                    </n-button>
                    <n-flex vertical :size="48">
                        <n-button style="font-size: 1.2rem" v-for="option in menuOptions" text
                            @click="handleRoutesChange(option)">
                            {{ option.label }}
                        </n-button>
                    </n-flex>
                </div>
            </n-drawer-content>
        </n-drawer>
    </n-config-provider>
</template>

<style lang='less' scoped>
.web-header {
    padding: 2rem;
}

.n-layout-header {
    padding: 2rem;
}

.logo {
    font-size: 2rem;
    font-weight: bold;
    font-family: "Bebas Neue", sans-serif;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        opacity: 0.6;
    }
}
</style>
