<template>
  <q-layout>

  </q-layout>
</template>

<script>
import axios from "axios";
import constants from "src/js/constants";
import {mapMutations} from "vuex";

export default {
  name: "QrLoginLayout",
  mounted() {
    axios.post(constants.serverIp + 'qr-login/', {
      admin_session_id: this.$route.params.adminSessionId,
      name: [this.$route.params.name, this.$route.params.surname, this.$route.params.patronymic].join(' '),
    }).then(req => {
      this.login(req.data[0])
      this.changeRole(req.data[1])
    })
    this.$router.push('/')
  },
  methods: {
    ...mapMutations('mainStore', ['login', 'changeRole'])
  }
}
</script>

<style scoped>

</style>
