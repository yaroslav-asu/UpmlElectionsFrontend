<template>
  <q-layout class="flex column items-center q-mt-md" v-if="role !== 0">
    <q-form @submit="submit" class="flex column justify-center items-center">
      <q-input type="text"
               v-model="username"
               model-value=""
               label="ФИО через пробел"
               class="q-mb-md"
               lazy-rules
               :rules="[
                   val => !!val || 'Это поле обязательное',
                   val => val.split(' ').length === 3 && val.split(' ').map(el => Boolean(el)).every(Boolean) || 'Неправильний формат ФИО'
                 ]"
      />
      <q-btn label="Получить Qr код" type="submit"></q-btn>
    </q-form>
    <img :src="qrCodeLink" alt="qrCode" v-if="qrCodeLink" class="q-ma-lg">
  </q-layout>
</template>

<script>

import {mapGetters} from "vuex";
import axios from "axios";
import constants from "src/js/constants";
import {sha256} from "js-sha256";

export default {
  name: "QrGenerateLayout",
  data() {
    return {
      username: null,
      qrCodeLink: null,
    }
  },
  computed: {
    ...mapGetters('mainStore', ['role', 'sessionId'])
  },
  methods: {
    submit() {
      this.registerUser()
      this.qrCodeLink = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + 'https://localhost:8080'+ '/qr-login/' + sha256(this.username + 'salt1')
    },
    registerUser() {
      let formData = new FormData();
      formData.append('name', this.username.split(' ')[0]);
      formData.append('surname', this.username.split(' ')[1]);
      formData.append('patronymic', this.username.split(' ')[2]);
      formData.append('admin_session_id', this.sessionId);
      axios.post(constants.serverIp + 'register/', formData)
    }
  }
}
</script>

<style scoped>

</style>
