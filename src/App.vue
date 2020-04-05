<template>
  <div id="app">
    <h1>
      <header-my v-if="routeName !== 'home'"/>
    </h1>
    <router-view/>
  </div>
</template>

<script>
  import HeaderMy from './components/HeaderMy'
export default {
  name: 'App',
  components:{
    HeaderMy
  },
  computed:{
    routeName(){
      return this.$route.name
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  padding: 20px;
}
*{padding:0; margin:0;}
html,body{
  height: 100%;
}

</style>
