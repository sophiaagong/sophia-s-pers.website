<script setup>
import {
    NConfigProvider,
} from 'naive-ui';
import HomeVue from '../home/home.vue';
const themeOverrides = {
    common: {
        "primaryColor": "#E4D8FFFF", // 这里可以自定义主题色
        "primaryColorHover": "#747EFEFF",
        "primaryColorPressed": "#182084FF",
        "primaryColorSuppl": "#3B44BEFF",
    },
};
</script>

<template>
    <n-config-provider :theme-overrides="themeOverrides">
        <n-layout>

            <n-layout-header>
                <n-flex justify="'space-between'" :align="'center'">

                    <n-flex class="logo" :align="'center'"> 
                        <n-avatar round style="background: var(--primary color)">S</n-avatar>
                        <div>Sophia's Website</div>
                    </n-flex>
                    <n-flex size="48">
                        <n-button>ABOUT ME</n-button>
                        <n-button>ACHIEVEMENTS</n-button>
                        <n-button>CONTACTS</n-button>
                        <n-button>CURRICULAR</n-button>
                    </n-flex>
                </n-flex>
            </n-layout-header>

            <n-layout-content>
                <home-vue></home-vue>
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
