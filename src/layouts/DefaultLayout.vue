<script setup>
import Header from '../components/Layout/HeaderComponent.vue'
import Footer from '../components/Layout/FooterComponent.vue'

</script>

<template>
    <div>
        <Header/>
         <router-view/>
        <Footer/>
    </div>
</template>
