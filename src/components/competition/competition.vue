<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { decode } from 'js-base64';

const showEssayModal = ref(false);

const essays = ref([])

const carousel = ref(null)

const blocks = ref([])

const activeIndex = ref(0)

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
    return axios('/sophia/json/competition.json')
}

function viewEssay(i) {
    currentEssayIndex.value = i;
    showEssayModal.value = true;
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
                                        <div class="essay-title">
                                            <n-ellipsis :line-clamp="2">
                                                {{ essay.title }}
                                            </n-ellipsis>
                                        </div>
                                        <div class="achievement">
                                            <n-tag>{{ essay.achievement || 'Unassigned' }}</n-tag>
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
        <n-modal :auto-focus="false" v-model:show="showEssayModal" preset="card"
            :style="{ height: '90vh', width: '840px', maxWidth: '90vw' }" size="huge" :bordered="false">
            <template #header>
                <div class="modal-header">
                    <b v-if="essays[currentEssayIndex].prompt">{{ essays[currentEssayIndex].prompt }}</b>
                    <b v-else>{{ essays[currentEssayIndex].title }}</b>
                </div>
                <n-text class="essay-date" :depth="3">{{ essays[currentEssayIndex].date }}</n-text>
            </template>
            <n-scrollbar style="max-height: calc(90vh - 90px - 8rem); padding-right: 1rem">
                <div class="essay-content" v-html="decode(essays[currentEssayIndex].content)"></div>
            </n-scrollbar>
        </n-modal>
    </div>
</template>

<style lang='less' scoped>
.competition-container {
    height: 100vh;
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

    .container-inner {
        position: relative;
        width: 85vw;
        margin: 0 auto;
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

    .essay-container {
        margin: 3rem 0;

        .essay-block {
            max-width: 100%;
            min-width: 33vw;
            border: 1px solid #eeeeee;
            padding: 2rem;
            border-radius: 8px;

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

.modal-header {
    font-size: 1.8rem;
}

.essay-date {
    font-size: 1rem;
}

// .modal-header,
// .essay-date,
// .essay-content {
//     font-family: 'Times New Roman', Times, serif;
// }

.essay-content {
    font-size: 1.1rem;
    font-family: 'Times New Roman', Times, serif;
    color: #000;
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