<template>
  <nav v-if="isLogged">
    {{ userName }}
  </nav>
  <nav v-else>
    <a href="/login">Вход</a>
  </nav>

</template>

<script>
export default {
  username: "HeaderNavigation",
  data() {
    return {
      userName: 'UserName',
      isLogged: false,
    }
  }
}
</script>

<style scoped>
a {
  color: #fff;
  font-size: calc(15px + 0.5vw)
}
</style>
