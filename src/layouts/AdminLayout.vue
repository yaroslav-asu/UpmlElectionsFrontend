<template>
  <q-layout>
    <div class="limiter flex column justify-center items-center">
      <h3>Создать кандидата</h3>
      <q-btn color="primary" @click="addCandidate">Добавить кандидата</q-btn>
      <q-form class="candidate-settings float justify-center"
              v-for="(link, id) in candidatesSettingsList"
              :key="link"
              @submit="changeCandidate(id)"
      >
        <q-input v-model="candidatesSettingsList[id].name" label="Имя кандидата"
                 :rules="[val => !!val || 'Поле обязательное']"></q-input>
        <q-input v-model="candidatesSettingsList[id].surname" label="Фамилия кандидата"
                 :rules="[val => !!val || 'Поле обязательное']"></q-input>
        <q-file v-model="candidatesSettingsList[id].image"
                accept=".jpg, .png, image/*"
                :model-value="[]"
        ></q-file>
        <q-input v-model.number="candidatesSettingsList[id].offlineVotes" type="number"
                 label="Количество очных голосов"/>
        <q-btn type="submit">Подтвердить изменения</q-btn>
        <q-btn icon="close" @click="deleteCandidateSettings(id)"></q-btn>
      </q-form>
    </div>
  </q-layout>
</template>

<script>
import CandidateSettings from "components/CandidateSettings";
import {ref} from "vue";
import axios from "axios";
import constants from "src/js/constants";
import {mapGetters} from "vuex";

export default {
  name: "Admin",
  mounted() {
    axios.get(constants.serverIp + 'candidates/').then((req) => {
      this.candidatesSettingsList = req.data
      // console.log(req.data)
    }).catch(
      (req) => {
        console.log(req)
      }
    )
  },
  data() {
    let candidatesSettingsList

    return {
      candidatesCount: 0,
      candidatesSettingsList: []
    }
  },
  methods: {
    addCandidate() {
      axios.post(constants.serverIp + 'add-empty-candidate', {session_id: this.sessionId}).then((req) => {
        console.log(req.data[0])
        this.candidatesSettingsList.push(
          {
            candidateId: req.data[0],
            name: '',
            surname: '',
            image: '',
            offlineVotes: 0,
          }
        )
      })

    },
    deleteCandidateSettings(id) {
      axios.post(constants.serverIp + 'delete-candidate/', {
        session_id: this.sessionId,
        candidate_id: this.candidatesSettingsList[id].candidateId
      })
      this.candidatesSettingsList.splice(id, 1)
    },
    changeCandidate(id) {
      let formData = new FormData();
      formData.append('candidate_id', this.candidatesSettingsList[id].candidateId);
      formData.append('session_id', this.sessionId);
      formData.append('name', this.candidatesSettingsList[id].name);
      formData.append('surname', this.candidatesSettingsList[id].surname);
      if (this.candidatesSettingsList[id].image) {
        formData.append('image', this.candidatesSettingsList[id].image);
      }
      formData.append('offline_votes', this.candidatesSettingsList[id].offlineVotes);

      axios.post(constants.serverIp + 'change-candidate/', formData).then((req) => {
        console.log(req)
      })
    }
  },
  computed: {
    ...mapGetters('mainStore', ['sessionId'])
  }
}
</script>

<style lang="scss" scoped>

</style>
