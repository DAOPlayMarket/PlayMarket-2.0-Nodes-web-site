<template>
    <div id="wrapper">
        <Header></Header>
        <div id="content">
            <Spinner></Spinner>
            <router-view :key="$route.fullPath"></router-view>
        </div>
    </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'App',
  components: {
    Header,
    Spinner
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
