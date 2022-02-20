<template>
  <nav v-if="sessionId">
    {{ name }}
  </nav>
  <nav v-else>
    <a href="/login">Вход</a>
  </nav>

</template>

<script>
import axios from "axios";
import constants from "src/js/constants";
import {mapGetters} from "vuex";

export default {
  username: "HeaderNavigation",
  mounted() {
    axios.get(constants.serverIp + 'user-name/' + this.sessionId).then((req) => {
      this.name = req.data.name
    })
  },
  data() {
    return {
      name: null,
    }
  },
  computed: {
    ...mapGetters('mainStore', ['sessionId']),
  }
}
</script>

<style scoped>
a {
  color: #fff;
  font-size: calc(15px + 0.5vw)
}
</style>
