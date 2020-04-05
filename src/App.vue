<template>
  <div id="app">
<!--    <olmap/>-->
    <map-learning> </map-learning>
  </div>
</template>

<script>
import olmap from "./components/olmap";
import MapLearning from './components/MapLearning'
export default {
  name: 'App',
  components: {
    MapLearning,
    olmap
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
*{padding:0; margin:0;}
html,body{
  height: 100%;
}

</style>
