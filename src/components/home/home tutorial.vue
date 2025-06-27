<script setup>
import {NButton} from 'naive-ui';
import {ref} from 'vue'
function handleLightSwitch (){
    light.value = !light.value;
}
const light = ref(false)
</script>

<template>
    <!--  -->
    <div style="color: pink">Hello, my name is Sophia!</div>
    <div class="hello-container"></div>
    <div class="paragraph-container" :style="{backgroundColor:Light ? 'yellow':'black'}"></div>
        <n-button type="info"@click=handleLightSwitch>light switch</n-button>
        paragraph-container
    <h1>Hello, my name is Sophia!</h1>
    <p>Hello, my name is Sophia</p>
</template>

<style scoped>
.hello-container{
    color:green
}

.paragraph-container{
    background-color: white;
    border: 2px solid black;
}

</style>