<template>
  <div class="candidate flex column justify-between items-center q-mt-lg">
    <img src="../assets/candidate.png" alt="Фото кондидата">
    <h4>{{ name }}</h4>
    <q-btn color="primary" v-if="isLogged">Проголосовать</q-btn>
    <div class="color-line" :style="{'background-color': color}"/>
  </div>
</template>

<script>
import {mapGetters,} from 'vuex'

export default {
  name: "Elected",
  props: {
    imagePath: {default: '../candidate.png'},
    name: {default: 'Владимир Симкин'},
    percentage: {default: 100},
    color: {default: 'red'},
  },
  computed: {
    ...mapGetters('mainStore', ['isLogged', 'serverIp'])
  }
}
</script>

<style scoped>
img {
  width: 100%;
}

.candidate {
  text-align: center;
}

.color-line {
  height: 5px;
  width: 100%;
}

</style>
