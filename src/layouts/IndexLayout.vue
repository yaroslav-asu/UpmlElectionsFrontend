<template>
  <q-layout class="flex column">
    <header class="">
      <div class="limiter flex justify-between items-center q-mb-sm">
        <Logo>Выборы ЮФМЛ</Logo>
        <HeaderNavigation/>
      </div>
    </header>
    <div class="limiter">
      <section class="candidates-wrapper q-mb-xl">
        <!--        <h2 class="q-my-md">Кандидаты:</h2>-->
        <div class="candidates flex justify-center">
          <Candidate
            v-for="(candidate, candidateName, id) in candidates"
            :key="candidate"
            :image-path="candidate.imagePath"
            :color="candidatesColors[id]"
            :name="candidateName"
            :percentage="candidate.percentage"
          />
        </div>
      </section>
      <section class="votes">
        <VotesDisplay :colors="candidatesColors"/>
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
  name: "IndexLayout",
  components: {
    Logo,
    HeaderNavigation,
    Candidate,
    VotesDisplay,
  },
  mounted() {
    axios.get(constants.serverIp + 'candidates/').then((req) => {
      this.candidates = req.data
      this.candidatesColors = this.generateCandidatesColors()
      console.log(this.candidatesColors)
    })
  },
  data() {
    return {
      candidates: null,
      candidatesColors: null,
    }
  },
  methods: {
    generateCandidatesColors() {
      let colors = []
      let candidatesCount = Object.keys(this.candidates).length
      for (let hue = 0; hue < candidatesCount; hue++) {
        colors.push(hsbToHex(hue * 360 / candidatesCount, 52, 70))
      }
      return colors
    }
  },

}
</script>

<style lang="scss" scoped>

header {
  background-color: $primary;
  color: white;
}

.candidates {
  width: 100%;

  .candidate {
    max-width: 22%;
    margin-left: 1.5%;
    margin-right: 1.5%;
  }
}

@media (max-width: 768px) {
  .candidate {
    max-width: 45% !important;
    margin-top: 5%;
    margin-bottom: 5%;
  }
}

@media (max-width: $breakpoint-xs-max) {
  .candidate {
    max-width: 100% !important;
    margin-top: 5%;
    margin-bottom: 5%;
  }
}
</style>
