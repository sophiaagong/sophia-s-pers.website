<script setup>
import router from '../../router/router';
import { useBreakpoint } from '../../assets/general';

const { isMobile } = useBreakpoint()
</script>

<template>
    <div class="home-container">
        <div class="home-container-inner">
            <n-grid style="align-items: center;">
                <n-gi :span="isMobile ? 24 : 12">
                    <n-flex vertical :size="36">
                        <div v-if="isMobile" class="photo-container">
                            <div class="photo-wrapper">
                                <img src="/sophia/portrait.jpg" alt="Portrait" />
                            </div>
                        </div>
                        <div class="hello">Hi, my name is Sophia.</div>
                        <div class="slogan">I study for my future.</div>
                        <div class="description">I’m a rising tenth grader and generally I want to study for a major in
                            humanities. My hometown is Shanghai, China but I study in Irvine, California.</div>
                        <div>
                            <n-button @click="router.push({ name: 'About' })" type="primary"
                                style="color: black; padding: 1.5rem">
                                <template #icon>
                                    <n-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
                                            <path
                                                d="M464 256c0-114.87-93.13-208-208-208S48 141.13 48 256s93.13 208 208 208s208-93.13 208-208zm-212.65 91.36a16 16 0 0 1-.09-22.63L303.58 272H170a16 16 0 0 1 0-32h133.58l-52.32-52.73A16 16 0 1 1 274 164.73l79.39 80a16 16 0 0 1 0 22.54l-79.39 80a16 16 0 0 1-22.65.09z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </n-icon>
                                </template>
                                More about me!
                            </n-button>
                        </div>
                    </n-flex>
                </n-gi>
                <n-gi v-if="!isMobile" :span="12">
                    <div class="photo-container">
                        <div class="photo-wrapper">
                            <img src="/sophia/portrait.jpg" alt="Portrait" />
                        </div>
                    </div>
                </n-gi>
            </n-grid>
        </div>
    </div>
</template>

<style lang="less" scoped>
.home-container {
    min-height: calc(100vh - 230px);
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 2rem 2rem 2rem;

    .home-container-inner {
        width: 80vw;
        margin: 0 auto;
    }

    .hello {
        font-size: 3rem;
        font-weight: 700;
    }

    .slogan {
        font-size: 1.1rem;
    }

    .description {
        font-size: 1.1rem;
    }
}

.photo-container {
    text-align: center;
}

.photo-wrapper {
    display: inline-block;
    width: 60%;
    border: 12px solid rgb(194, 242, 255);
    border-radius: 12px;
    overflow: hidden;
    background: rgb(194, 242, 255);
}

.photo-wrapper img {
    display: block;
    width: 100%;
    height: auto;
    border-radius: 8px;
}

@media (max-width: 768px) {
    .home-container {
        .home-container-inner {
            width: 100%;
            text-align: center;
        }

        .hello {
            font-size: 2.4rem;
            font-weight: 700;
        }

        .slogan {
            font-size: 1.1rem;
        }

        .description {
            font-size: 1.1rem;
        }
    }

    .photo-wrapper {
        width: calc(100% - 24px);
    }
}
</style>