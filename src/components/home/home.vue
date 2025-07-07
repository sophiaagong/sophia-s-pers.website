<script setup></script>

<template>
    <div class="home-container">
        <div class="home-container-inner">
            <n-grid style="align-items: center;">
                <n-gi :span="12">
                    <n-flex vertical :size="36" style="margin-top: -96px">
                        <div class="hello">Hi, my name is Sophia.</div>
                        <div class="slogan">I study for my future.</div>
                        <div class="description">I’m a rising tenth grader and generally I want to study for a major in
                            humanities. My hometown is Shanghai, China but I study in Irvine, California.</div>
                        <div>
                            <n-button type="primary" style="color: black; padding: 1.5rem">
                                <template #icon>
                                    <n-icon>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
                                            <path
                                                d="M256 464c114.87 0 208-93.13 208-208S370.87 48 256 48S48 141.13 48 256s93.13 208 208 208zm-91.36-212.65a16 16 0 0 1 22.63-.09L240 303.58V170a16 16 0 0 1 32 0v133.58l52.73-52.32A16 16 0 1 1 347.27 274l-80 79.39a16 16 0 0 1-22.54 0l-80-79.39a16 16 0 0 1-.09-22.65z"
                                                fill="currentColor"></path>
                                        </svg>
                                    </n-icon>
                                </template>
                                More about me!
                            </n-button>
                        </div>
                    </n-flex>
                </n-gi>
                <n-gi :span="12">
                    <div class="photo-container">
                        <img src="/sophia/5G8A3215.JPG" />
                    </div>
                </n-gi>
            </n-grid>
        </div>
    </div>
</template>

<style lang="less" scoped>
.home-container {
    height: calc(100vh - 115px);
    font-family: "Poppins", sans-serif;
    display: flex;
    align-items: center;
    justify-content: center;

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

    img {
        width: 60%;
    }
}
</style>