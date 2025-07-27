<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'

const showEssayModal = ref(false)

const essays = ref([]);

const carousel = ref(null);

const blocks = ref(null);

const activeIndex = ref(0);

const pages = ref([])

const currentEssayIndex = ref(null);

const resizeObserver = ref(null);

onMounted(async () => {
    const buffer = await readJSON()
    essays.value = buffer.data
    blocks.value = Array.from(carousel.value.querySelectorAll(".essay-block"))
    resizeObserver.value = new ResizeObserver(updatePages)
    resizeObserver.value.observe(carousel.value)
})

function readJSON() {
    return axios("/sophia/json/competition.json")
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
    activeIndex.value = closest;
}

function scrollToIndex(idx) {
    const blockEl = blocks.value[idx]
    const container = carousel.value
    if (blockEl && container) {
        container.scrollTo({ left: blockEl.offsetLeft, behavior: "smooth" })
    }
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

function prev() {
    const newIndex = Math.max(0, activeIndex.value - 1)
    scrollToIndex(newIndex)
}

function next() {
    const newIndex = Math.min(pages.value.length - 1, activeIndex.value + 1)
    scrollToIndex(newIndex)
}
</script>

<template>
    <div class="competition-container">
        <div class="container-inner">
            <div class="subtitle">My Competition</div>
            <div class="title">Essays</div>
            <div class="essay-container">
                <div ref="carousel" class="carousel" @scroll="onScroll">
                    <n-flex :size="24" :wrap="false">
                        <div class="essay-block" v-for="(essay, index) in essays" :key="index" ref="blocks">
                            <n-flex vertical :size="24">
                                <n-flex vertical>
                                    <div class="label">
                                        <n-ellipsis :line-clamp="1">{{ essay.label }}</n-ellipsis>
                                    </div>
                                    <n-flex vertical :size="18">
                                        <div class="essay-title">{{ essay.title }}</div>
                                        <div class="achievement">
                                            <n-tag>{{ essay.achievement }}</n-tag>
                                        </div>
                                        <div class="description">
                                            <n-ellipsis :line-clamp="3">
                                                {{ essay.description }}
                                                <template #tooltip>
                                                    <div style="max-width: 100%; width: 240px">
                                                        {{ essay.description }}
                                                    </div>
                                                </template>
                                            </n-ellipsis>
                                        </div>
                                    </n-flex>
                                    <div class="date"><n-text :depth="3">{{ essay.date }}</n-text></div>
                                </n-flex>
                                <n-button @click="viewEssay(index)" type="primary" style="color: #fff; width: 100%">
                                    <b>View</b>
                                </n-button>
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
    </div>
</template>

<style lang='less' scoped>
.competition-container {
    height: calc(100vh);
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

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

        .essay-container {
            margin: 3rem 0;

            .carousel {
                padding: 1rem;
            }

            .essay-block {
                max-width: 100%;
                min-width: 33vw;
                padding: 2rem;
                border-radius: 8px;
                border: 1px solid #e6e6e6;

                .label {
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--primary-color)
                }

                .essay-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                }

                .achievement {
                    font-size: 1.2rem;
                }

                .description {
                    font-size: 1rem;
                }

                .date {
                    font-size: 0.8rem;
                }
            }
        }
    }
}

.modal-header {
    font-size: 1.8rem
}

.essay-date {
    font-size: 1rem
}

.essay-content {
    font-size: 1.2rem
}

.carousel {
    overflow-x: hidden;
    scroll-behavior: smooth;
}

.dots-container {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 1.5rem;
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
</style>