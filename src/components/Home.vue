<template>
  <div style="text-align: left">
    <h2>导航</h2>
    <ul>
      <li v-for = "route in routes" :key = "route.name">
        <router-link :to = "{ name: route.name }">{{ route.text }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        routes:[
          {name:'overlayLearn',text:'overlay学习'}
        ],
      }
    }
  }
</script>

<style scoped>

</style>
