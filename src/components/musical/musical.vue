<script lang='ts' setup>
import { ref } from 'vue'

</script>

<template>
    <div class="musical-container">
        <div class="container-inner">
            <div class="subtitle">My Info</div>
            <div class="title">Musicals</div>
        </div>
    </div>
</template>

<style lang='less' scoped>
.musical-container {
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
    }
}
</style>