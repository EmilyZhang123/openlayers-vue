<template>
  <div>
    <h3>
      <b @click="backHome">返回首页</b>
    </h3>
  </div>
</template>

<script>
  export default {
    name: "HeaderMy",
    data() {
      return {}
    },

    methods: {
      backHome(){
        this.$router.push({ name: 'home' })
      }
    }
  }
</script>

<style scoped>

</style>
