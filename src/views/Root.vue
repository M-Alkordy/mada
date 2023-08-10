<template>
    <div class="root">
        <Nav />
    </div>
    <SideBar />
</template>

<script setup>
import Nav from '../components/Nav.vue';
import SideBar from '../components/SideBar.vue';
</script>

<style>
.root{
    width: 84%;
    height: 100vh;
    background-color: #edf0f5;
}
</style>
