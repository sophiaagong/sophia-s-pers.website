<script setup>
import { ref } from 'vue';

const showModal = ref(false);
</script>

<template>
    <div class="about-container">
        <div class="container-inner">
            <div class="subtitle">My Info</div>
            <div class="title">About me</div>
            <n-grid class="content-container" :x-gap="48">
                <n-gi :span="12" class="left">
                    <img src="/sophia/about.jpg" />
                </n-gi>
                <n-gi :span="12" class="right">
                    <div class="hello">Hi, I'm Sophia, based in Irvine, California.</div>
                    <div class="intro">Mauris accumsan ornare dui, ut interdum neque condimentum quis. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus. Nullam condimentum auctor diam ac tincidunt.
                    </div>
                    <div class="intro">Mauris accumsan ornare dui, ut interdum neque condimentum quis. Interdum et
                        malesuada fames ac ante ipsum primis in faucibus. Nullam condimentum auctor diam ac tincidunt.
                    </div>
                    <n-grid :x-gap="12">
                        <n-gi class="block" span="8" @click="showModal = true">
                            <div>
                                <div>
                                    <n-icon :size="24" :color="'#E4D8FFFF'">
                                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                            viewBox="0 0 512 512" enable-background="new 0 0 512 512"
                                            xml:space="preserve">
                                            <path d="M406.3,48.2c-4.7,0.9-202,39.2-206.2,40c-4.2,0.8-8.1,3.6-8.1,8c0,0,0,238.5,0,240.1c0,1.6-0.1,7.2-2.4,11.7
	c-3.1,5.9-8.5,10.2-16.1,12.7c-3.3,1.1-7.8,2.1-13.1,3.3c-24.1,5.4-64.4,14.6-64.4,51.8c0,31.1,22.4,45.1,41.7,47.5
	c2.1,0.3,4.5,0.7,7.1,0.7c0,0,0,0,0,0c6.7,0,36-3.3,51.2-13.2c11-7.2,24.1-21.4,24.1-47.8V190.5c0-3.8,2.7-7.1,6.4-7.8l152-30.7
	c5-1,9.6,2.8,9.6,7.8v130.9c0,4.1-0.2,8.9-2.5,13.4c-3.1,5.9-8.5,10.2-16.2,12.7c-3.3,1.1-8.8,2.1-14.1,3.3
	c-24.1,5.4-64.4,14.5-64.4,51.7c0,33.7,25.4,47.2,41.8,48.3c6.5,0.4,11.2,0.3,19.4-0.9c8.2-1.2,23.5-5.5,36.5-13
	c17.9-10.3,27.5-26.8,27.5-48.2V55.9C416,51.5,412.3,47,406.3,48.2z"></path>
                                        </svg>
                                    </n-icon>
                                </div>
                                <div class="label">Musicals</div>
                                <div class="time"><n-text :depth="3">10+ Years</n-text></div>
                            </div>
                        </n-gi>
                        <n-gi class="block" span="8">
                            <div>
                                <div>
                                    <n-icon :size="24" :color="'#E4D8FFFF'">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
                                            <defs></defs>
                                            <path
                                                d="M312.1 591.5c3.1 3.1 8.2 3.1 11.3 0l101.8-101.8l86.1 86.2c3.1 3.1 8.2 3.1 11.3 0l226.3-226.5c3.1-3.1 3.1-8.2 0-11.3l-36.8-36.8c-3.1-3.1-8.2-3.1-11.3 0L517 485.3l-86.1-86.2c-3.1-3.1-8.2-3.1-11.3 0L275.3 543.4c-3.1 3.1-3.1 8.2 0 11.3l36.8 36.8z"
                                                fill="currentColor"></path>
                                            <path
                                                d="M904 160H548V96c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H120c-17.7 0-32 14.3-32 32v520c0 17.7 14.3 32 32 32h356.4v32L311.6 884.1c-3.7 2.4-4.7 7.3-2.3 11l30.3 47.2v.1c2.4 3.7 7.4 4.7 11.1 2.3L512 838.9l161.3 105.8c3.7 2.4 8.7 1.4 11.1-2.3v-.1l30.3-47.2c2.4-3.7 1.3-8.6-2.3-11L548 776.3V744h356c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 512H160V232h704v440z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </n-icon>
                                </div>
                                <div class="label">Completed</div>
                                <div class="time"><n-text :depth="3">30+ Competitions</n-text></div>
                            </div>
                        </n-gi>
                        <n-gi class="block" span="8">
                            <div>
                                <div>
                                    <n-icon :size="24" :color="'#E4D8FFFF'"><svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                                            <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                                stroke-linejoin="round">
                                                <path
                                                    d="M8 9l5 5v7H8v-4m0 4H3v-7l5-5m1 1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v17h-8">
                                                </path>
                                                <path d="M13 7v.01"></path>
                                                <path d="M17 7v.01"></path>
                                                <path d="M17 11v.01"></path>
                                                <path d="M17 15v.01"></path>
                                            </g>
                                        </svg>
                                    </n-icon>
                                </div>
                                <div class="label">Community</div>
                                <div class="time"><n-text :depth="3">10+ Services</n-text></div>
                            </div>
                        </n-gi>
                    </n-grid>
                    <div style="margin-top: 1rem;">
                        <n-button round type="primary" style="color: black; padding: 1.5rem">
                            <template #icon>
                                <n-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 512 512">
                                        <path
                                            d="M256 464c114.87 0 208-93.13 208-208S370.87 48 256 48S48 141.13 48 256s93.13 208 208 208zm-91.36-212.65a16 16 0 0 1 22.63-.09L240 303.58V170a16 16 0 0 1 32 0v133.58l52.73-52.32A16 16 0 1 1 347.27 274l-80 79.39a16 16 0 0 1-22.54 0l-80-79.39a16 16 0 0 1-.09-22.65z"
                                            fill="currentColor"></path>
                                    </svg>
                                </n-icon>
                            </template>
                            Scroll Down
                        </n-button>
                    </div>
                </n-gi>
            </n-grid>
        </div>
        <n-modal v-model:show="showModal" class="custom-card" preset="card" style="height: 90vh; width: 90vw"
            title="Musicals" size="huge" :bordered="false" :auto-focus="false">
            content
        </n-modal>
    </div>
</template>

<style lang="less" scoped>
.about-container {
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

        .content-container {
            margin-top: 2rem;
            align-items: center;

            .left {
                img {
                    width: 100%;
                    border-radius: 12px;
                }
            }

            .right {
                .hello {
                    font-size: 1.2rem;
                    font-weight: 600;
                }

                .intro {
                    margin: 1rem 0;
                }

                .block {
                    text-align: center;
                    border-radius: 12px;
                    background: #f7f7f7;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 2rem;
                    cursor: pointer;

                    .label {
                        font-weight: 600;
                    }

                    .time {
                        font-size: 0.8rem;
                    }
                }
            }
        }
    }
}
</style>