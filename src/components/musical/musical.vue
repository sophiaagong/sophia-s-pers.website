<script lang='ts' setup>
import { ref } from 'vue'
import { useBreakpoint } from '../../assets/general';

const { isMobile } = useBreakpoint()

const current = ref(1);

const steps = [
    {
        title: "Lorem ipsum dolor sit amet", // 音乐剧阶段名称
        description: "Aenean varius varius dictum. Ut nibh odio, luctus et sodales nec, mattis eu neque. Aliquam cursus quam dignissim mi tempus, sit amet dictum ex luctus. Nam ut consequat diam.",
        imgList: [
            "/sophia/musicals/musical1.webp",
            "/sophia/musicals/WechatIMG119.webp",
        ]
    },
    {
        title: "Morbi faucibus lorem justo",
        description: "Donec mollis, nisi et tristique tincidunt, turpis quam hendrerit turpis, quis convallis tellus augue nec neque. Mauris viverra orci eu dui cursus, a consectetur mi porta. Mauris ut mauris leo.",
        imgList: [
            "/sophia/musicals/musical2.webp",
            "/sophia/musicals/WechatIMG120.webp",
        ]
    },
    {
        title: "Nulla tempor nisl nec",
        description: "Maecenas ut enim et eros facilisis imperdiet quis sit amet mi. Maecenas tincidunt quam massa, eu hendrerit nibh vulputate quis.",
        imgList: [
            "/sophia/musicals/musical3.webp",
            "/sophia/musicals/WechatIMG121.webp",
        ]
    }
]

function next() {
    if (current.value >= 3)
        current.value = 3;
    else current.value++;
}

function prev() {
    if (current.value === 1)
        current.value = 1;
    else current.value--;
}
</script>

<template>
    <div class="musical-container">
        <div class="container-inner">
            <div class="subtitle">My Passion</div>
            <div class="title">Musicals</div>
            <n-flex class="timeline-container" vertical :size="48">
                <div v-if="isMobile">
                    <n-flex vertical :size="24">
                        <n-flex :align="'center'" :wrap="false">
                            <n-avatar round style="background: var(--primary-color)">{{ current }}</n-avatar>
                            <n-flex>
                                <div style="font-size: 1.2rem">{{ steps[current - 1].title }}</div>
                            </n-flex>
                        </n-flex>
                        <n-ellipsis :line-clamp="4" style="margin: 0 0 4px 0">
                            {{ steps[current - 1].description }}
                            <template #tooltip>
                                <div style="max-width: 400px;">{{ steps[current - 1].description }}</div>
                            </template>
                        </n-ellipsis>
                        <n-carousel>
                            <n-image v-for="url in steps[current - 1].imgList" class="carousel-img"
                                :src="url"></n-image>
                        </n-carousel>
                    </n-flex>
                </div>
                <n-steps v-else v-model:current="current">
                    <template #finish-icon></template>
                    <n-step v-for="(step, index) in steps" :title="step.title">
                        <n-ellipsis :line-clamp="2" style="margin: 0 0 4px 0">
                            {{ step.description }}
                            <template #tooltip>
                                <div style="max-width: 400px;">{{ step.description }}</div>
                            </template>
                        </n-ellipsis>
                        <div :style="{ width: '100%', opacity: current == index + 1 ? '1' : '0.5' }">
                            <n-carousel :draggable="current == index + 1">
                                <n-image v-for="url in step.imgList" class="carousel-img"
                                    :preview-disabled="current != index + 1" :src="url"></n-image>
                            </n-carousel>
                        </div>
                    </n-step>
                </n-steps>
            </n-flex>
            <n-flex :justify="'center'">
                <n-button circle size="large" @click="prev">
                    <template #icon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </template>
                </n-button>
                <n-button circle size="large" @click="next">
                    <template #icon>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            stroke-linecap="round" stroke-linejoin="round">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </template>
                </n-button>
            </n-flex>
        </div>
    </div>
</template>

<style lang='less' scoped>
.musical-container {
    min-height: calc(100vh - 230px);
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem 2rem 2rem;

    .container-inner {
        width: 80vw;
        margin: auto 0;

        .subtitle {
            color: var(--primary-color);
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
        }

        .title {
            text-align: center;
            font-size: 2.5rem;
            font-weight: 700;
        }

        .timeline-container {
            margin: 3rem 0;
        }

        .carousel-img {
            :deep(img) {
                width: 100%;
                aspect-ratio: 4/3;
                object-fit: cover !important
            }
        }
    }
}

@media (max-width: 768px) {
    .musical-container {
        .container-inner {
            width: 100%;
        }
    }
}
</style>