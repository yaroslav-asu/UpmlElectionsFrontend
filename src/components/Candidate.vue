<template>
  <div class="candidate flex column justify-center items-center q-mt-lg">
    <div class="image-wrapper flex column justify-center">
      <img :src="imagePath" alt="Фото кондидата">
    </div>
    <h4>{{ name }}</h4>
    <div class="color-line" :style="{'background-color': color}"/>
    <q-btn :style="{'background-color': color}" class="q-mt-md" v-if="isVoted" @click="vote">Проголосовать</q-btn>
  </div>
</template>

<script>
import {mapGetters, mapMutations,} from 'vuex'
import axios from "axios";
import constants from "src/js/constants";

export default {
  username: "Elected",
  props: {
    imagePath: {default: 'http://www.rosphoto.com/images/u/articles/1510/4_8.jpg'},
    name: {default: 'Владимир Симкин'},
    percentage: {default: 100},
    color: {default: 'red'},
  },
  methods: {
    ...mapMutations('mainStore', ['mutateVote']),
    vote() {
      axios.post(constants.serverIp + 'vote/', {
        session_id: this.sessionId,
        candidate_id: 1
      }).then((req) => {
        console.log(req)
      }).catch((req) => {
        console.log(req)
      })
      this.mutateVote()
    }
  },
  computed: {
    ...mapGetters('mainStore', ['sessionId', 'isVoted'])
  }
}
</script>

<style scoped>
.image-wrapper {
  flex-grow: 1;
}

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

.candidate-wrapper {
  flex-grow: 1;
}
</style>
