<template>
  <q-layout class="flex column">
    <header class="">
      <div class="limiter flex justify-between items-center q-my-sm">
        <Logo>Выборы ЮФМЛ</Logo>
        <HeaderNavigation v-if="isNameShown"/>
      </div>
    </header>

    <div class="limiter">
      <section class="candidates-wrapper q-mb-xl">
        <div class="candidates flex justify-center">
          <Candidate
            v-for="(candidate, id) in candidates"
            :key="candidate"
            :candidate="candidate"
            :color="candidatesColors[id]"
          />
        </div>
      </section>
      <section class="votes q-mb-xl" v-if="isVoted || isVoteDisplayShown">
        <VotesDisplay :colors="candidatesColors" :candidates="candidates"/>
      </section>
    </div>
  </q-layout>
</template>

<script>
import Logo from "components/Logo";
import HeaderNavigation from "components/HeaderNavigation";
import Candidate from "components/Candidate";
import VotesDisplay from "components/VotesDisplay";
import axios from "axios";
import {mapGetters,} from 'vuex'
import constants from "src/js/constants";

function hsbToHex(h, s, b) {
  b /= 100;
  const a = s * Math.min(b, 1 - b) / 100;
  const f = n => {
    const k = (n + h / 30) % 12;
    const color = b - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export default {
  username: "IndexLayout",
  components: {
    Logo,
    HeaderNavigation,
    Candidate,
    VotesDisplay,
  },
  mounted() {

    axios.get(constants.serverIp + 'candidates/').then((req) => {
      this.candidates = req.data
      // this.candidatesColors = this.generateCandidatesColors()
    })
  },
  data() {
    return {
      candidates: null,
      // candidatesColors: null,
      width: null,
      role: null,
    }
  },
  methods: {
    // ...mapGetters('mainStore', ['sessionId']),
    generateCandidatesColors(count) {
      let colors = []
      let candidatesCount = count
      for (let hue = 0; hue < candidatesCount; hue++) {
        colors.push(hsbToHex(hue * 360 / candidatesCount, 72, 51))
      }
      return colors
    },

  },
  computed: {
    ...mapGetters('mainStore', ['sessionId', 'isVoted', 'isVoteDisplayShown', 'isNameShown', 'candidatesShow']),
    candidatesColors() {
      if (this.candidates) {
        return this.generateCandidatesColors(Object.keys(this.candidates).length)
      }
      return this.generateCandidatesColors(10)
    }
  }

}
</script>

<style lang="scss" scoped>

header {
  background-color: $primary;
  color: white;

  .limiter {
    height: 100%;
  }
}

.candidate-wrapper {
  width: 100%;

  .candidate-wrapper {
    max-width: 22%;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
}

@media (max-width: 768px) {
  .candidate-wrapper {
    max-width: 45% !important;
    margin-top: 5%;
    margin-bottom: 5%;
  }
}

@media (max-width: $breakpoint-xs-max) {
  .candidate-wrapper {
    max-width: 100% !important;
    margin-top: 5%;
    margin-bottom: 5%;
  }
}
</style>
