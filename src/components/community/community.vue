<script setup>
import axios from 'axios';
import { nextTick, onMounted, ref } from 'vue'
import { useBreakpoint } from '../../assets/general';

const { isMobile } = useBreakpoint()

const allTabsContent = ref([]);

const showDetailModal = ref(false);

const currentTab = ref(0);

const showEssayModal = ref(false);

const essays = ref([])

const carousel = ref(null)

const blocks = ref([])

const activeIndex = ref(0)

const pages = ref([])

const currentEssayIndex = ref(null);

const resizeObserver = ref(null);

onMounted(async () => {
    const buffer = await readJSON();
    allTabsContent.value = buffer.data;
})

function readJSON() {
    return axios('/sophia/json/community.json')
}

function openDetailModal(index) {
    currentTab.value = index;
    showDetailModal.value = true;
    nextTick(() => {
        blocks.value = Array.from(carousel.value.querySelectorAll('.content-block'))
        updatePages()
        resizeObserver.value = new ResizeObserver(updatePages)
        resizeObserver.value.observe(carousel.value)
    })
}

function updatePages() {
    const container = carousel.value
    const blockEls = blocks.value
    if (!container || !blockEls.length) return

    const containerWidth = container.clientWidth
    const style = getComputedStyle(blockEls[0])
    const blockWidth = blockEls[0].offsetWidth + parseInt(style.marginRight)
    const total = blockEls.length
    const visibleCount = Math.floor(containerWidth / blockWidth)
    const pageCount = Math.max(1, total - visibleCount + 1)
    pages.value = Array.from({ length: pageCount }, (_, i) => i)
}

function scrollToIndex(idx) {
    const blockEl = blocks.value[idx]
    const container = carousel.value
    if (blockEl && container) {
        container.scrollTo({ left: blockEl.offsetLeft, behavior: 'smooth' })
    }
}

function prev() {
    const newIndex = Math.max(0, activeIndex.value - 1)
    scrollToIndex(newIndex)
}

function next() {
    const newIndex = Math.min(pages.value.length - 1, activeIndex.value + 1)
    scrollToIndex(newIndex)
}

function onScroll() {
    const container = carousel.value
    const scrollLeft = container.scrollLeft
    let closest = 0
    let closestDistance = Infinity
    blocks.value.forEach((block, idx) => {
        const dist = Math.abs(block.offsetLeft - scrollLeft)
        if (dist < closestDistance) {
            closestDistance = dist
            closest = idx
        }
    })
    activeIndex.value = closest
}
</script>

<template>
    <div class="community-container">
        <div class="container-inner">
            <div>
                <div class="subtitle">My Community</div>
                <div class="title">Works</div>
                <div class="tabContent">
                    <n-grid :cols="isMobile ? 1 : 3" :x-gap="isMobile ? 0 : 24" :y-gap="isMobile ? 24 : 24">
                        <n-gi class="tabCard" v-for="(content, index) in allTabsContent">
                            <n-flex vertical :size="24">
                                <div class="label">{{ content.label }}</div>
                                <img :src="content.bannerUrl" alt="">
                                <div class="achievement">
                                    <n-ellipsis :line-clamp="5">
                                        {{ content.achievement }}
                                        <template #tooltip>
                                            <div :style="{ fontSize: '1.2rem', maxWidth: isMobile ? '80vw' : '20rem' }">
                                                {{ content.achievement }}
                                            </div>
                                        </template>
                                    </n-ellipsis>
                                </div>
                                <n-button type="primary" @click="openDetailModal(index)" icon-placement="right"
                                    :size="'large'" style="font-weight: 600; width: 100%">
                                    More Details
                                </n-button>
                            </n-flex>
                        </n-gi>
                    </n-grid>
                </div>
            </div>
            <n-modal :auto-focus="false" v-model:show="showDetailModal" preset="card" :block-scroll="true"
                :style="{ height: '100vh', width: '100vw', maxWidth: '100vw' }" :size="'huge'" :bordered="false">
                <template #header>
                    <n-text class="tab-date" :depth="3">{{ allTabsContent[currentTab].date }}</n-text>
                    <div class="modal-header"><b>{{ allTabsContent[currentTab].label }}</b></div>
                </template>
                <div class="modal-container">
                    <div class="content-container">
                        <div ref="carousel" class="carousel" @scroll="onScroll">
                            <n-flex :size="24" :wrap="false">
                                <div class="content-block"
                                    v-for="(content, index) in allTabsContent[currentTab].content" :key="index"
                                    ref="blocks">
                                    <n-flex vertical :size="24">
                                        <n-flex vertical :size="24">
                                            <n-carousel :draggable="content.imgUrl.length > 1">
                                                <n-image class="content-image" v-for="url in content.imgUrl"
                                                    :src="url"></n-image>
                                            </n-carousel>
                                            <n-flex vertical :size="12">
                                                <div class="content-date">
                                                    {{ content.date }}
                                                </div>
                                                <div class="intro">
                                                    <n-ellipsis :line-clamp="3">
                                                        <div style="color: #666666">{{ content.intro }}</div>
                                                        <template #tooltip>
                                                            <div
                                                                :style="{ maxWidth: '100%', width: isMobile ? '80vw' : '480px' }">
                                                                {{ content.intro }}
                                                            </div>
                                                        </template>
                                                    </n-ellipsis>
                                                </div>
                                            </n-flex>
                                        </n-flex>
                                    </n-flex>
                                </div>
                            </n-flex>
                        </div>
                    </div>
                    <div class="carousel-controls">
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
                    <div class="dots-container">
                        <n-flex>
                            <div v-for="page in pages" :key="page" class="dot" :class="{ active: page === activeIndex }"
                                @click="scrollToIndex(page)"></div>
                        </n-flex>
                    </div>
                </div>
            </n-modal>
        </div>
    </div>
</template>

<style lang='less' scoped>
.community-container {
    min-height: calc(100vh - 230px);
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem 2rem 2rem;

    .container-inner {
        max-width: 100%;
        width: 80vw;
        margin: auto 0;
    }

    .subtitle {
        color: var(--primary-color);
        font-weight: 600;
        text-align: center;
        font-size: 1.5rem;
    }

    .title {
        text-align: center;
        font-weight: 700;
        font-size: 3rem;
    }

    .tabs {
        margin: 2rem 0 3rem 0;
    }

    .tabContent {
        margin-top: 3rem;

        .tabCard {
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid #eeeeee;

            .label {
                font-size: 1.5rem;
                font-weight: 700;
            }

            img {
                border-radius: 8px;
                width: 100%;
                aspect-ratio: 4/3;
                object-fit: contain;
            }
        }
    }

    .intro,
    .achievement {
        font-size: 1.1rem;
    }
}

.modal-container,
.modal-header,
.tab-date {
    font-family: "Poppins", sans-serif;
    font-size: 1rem;

    :deep(img) {
        width: 100%;
        object-fit: contain !important;
    }
}

.modal-container {
    position: relative;
    width: 85vw;
    // margin-left: 15vw;
    margin: 0 auto;

    .content-container {
        .content-block {
            max-width: 100%;
            min-width: 33vw;
            border-radius: 8px;

            .label {
                font-size: 1rem;
                font-weight: 600;
                color: var(--primary-color)
            }

            .content-date {
                font-size: 1.5rem;
                font-weight: 700;

            }

            .achievement {
                font-size: 1.2rem;
            }

            .intro {
                font-size: 1rem;
            }
        }
    }
}

.modal-header {
    font-size: 3rem;
}

.tab-date {
    font-size: 1rem;
}

.carousel {
    overflow-x: hidden;
    scroll-behavior: smooth;
    margin: 2rem 0;
}

// .carousel-controls {
//     margin: 1.5rem 5rem 1.5rem 1.5rem;
// }

.dots-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    // margin: 1.5rem 5rem 1.5rem 1.5rem;
    margin: 1.5rem;
}

.dot {
    width: 8px;
    height: 8px;
    background-color: #000;
    border-radius: 50%;
    opacity: 0.3;
    transition: transform 0.3s ease, opacity 0.3s ease;
    cursor: pointer;
}

.dot.active {
    opacity: 1;
    transform: scale(1.3);
}

.content-image {
    :deep(img) {
        width: 100%;
        aspect-ratio: 4/3;
        object-fit: cover !important
    }
}

@media (max-width: 768px) {
    .community-container {
        .container-inner {
            width: 100%;
        }
    }

    .modal-container {

        .content-container {
            .content-block {
                min-width: calc(100vw - 5rem);
            }
        }
    }

    .modal-header {
        font-size: 2.4rem;
    }
}
</style>