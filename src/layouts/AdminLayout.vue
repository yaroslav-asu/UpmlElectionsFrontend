<template>
  <q-layout>
    <div class="limiter flex column justify-center items-center " v-if="role !== 0">
      <h3>Создать кандидата</h3>
      <q-btn color="primary" @click="addCandidate">Добавить кандидата</q-btn>
      <div class="form-wrapper flex">
        <q-form class="candidate-settings float column justify-center q-ma-md"
                v-for="(link, id) in candidatesSettingsList"
                :key="link"
                @submit="changeCandidateData(id)"
        >
          <q-input v-model="candidatesSettingsList[id].name"
                   label="Имя кандидата"
                   :rules="[val => !!val || 'Поле обязательное']"
                   @update:model-value="changeCandidateData(id)"
          />
          <q-input v-model="candidatesSettingsList[id].surname"
                   label="Фамилия кандидата"
                   :rules="[val => !!val || 'Поле обязательное']"
                   @update:model-value="changeCandidateData(id)"
          />
          <q-file v-model="candidatesSettingsList[id].image"
                  accept=".jpg, .png, image/*"
                  @update:model-value="changeCandidateData(id)"
                  label="Новое фото кандидата"
          />

          <q-input v-model.number="candidatesSettingsList[id].offlineVotes" type="number"
                   label="Количество очных голосов"
                   @update:model-value="changeCandidateData(id)"
          />
          <q-btn icon="close" @click="deleteCandidateSettings(id)">Удалить Кандидата</q-btn>
        </q-form>
      </div>
      <q-checkbox
        label="Отображать на главной полосу голосования"
        @update:model-value="toggleVoteDisplay()"
        v-model="isVoteDisplayChecked"
        :model-value="isVoteDisplayChecked"
      />
      <q-checkbox
        label="Отображать на главной имя пользователя"
        @update:model-value="toggleNameShow()"
        v-model="isNameShowed"
        :model-value="isNameShowed"
      />
    </div>
    <div class="unautorised flex column justify-center items-center text-center" v-else>
      <h1>Вы не авторизованы как админ</h1>
    </div>
  </q-layout>
</template>

<script>
import CandidateSettings from "components/CandidateSettings";
import {ref} from "vue";
import axios from "axios";
import constants from "src/js/constants";
import {mapGetters, mapMutations} from "vuex";

export default {
  name: "Admin",
  mounted() {
    console.log()
    // setInterval(() => {
    //   console.log(this.candidatesShow)
    // })
    this.isVoteDisplayChecked = this.isVoteDisplayShown
    this.isNameShowed = this.isNameShown
    axios.get(constants.serverIp + 'candidates/').then((req) => {
      this.candidatesSettingsList = req.data
    }).catch(
      (req) => {
        console.log(req)
      }
    )
  },
  data() {
    return {
      candidatesCount: 0,
      candidatesSettingsList: [],
      isVoteDisplayChecked: null,
      isNameShowed: null,
      candidatesShow: []
    }
  },
  methods: {
    ...mapMutations('mainStore', ['toggleVoteDisplay', 'toggleNameShow', 'changeCandidatesShown']),
    addCandidate() {
      axios.post(constants.serverIp + 'add-empty-candidate', {session_id: this.sessionId}).then((req) => {
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
    changeCandidateData(id) {
      console.log(this.candidatesSettingsList[id].candidateId, this.sessionId, this.candidatesSettingsList[id].name, this.candidatesSettingsList[id].surname, this.candidatesSettingsList[id].offlineVotes)
      let formData = new FormData();
      formData.append('candidate_id', this.candidatesSettingsList[id].candidateId);
      formData.append('session_id', this.sessionId);
      formData.append('name', this.candidatesSettingsList[id].name);
      formData.append('surname', this.candidatesSettingsList[id].surname);
      if (this.candidatesSettingsList[id].image && typeof this.candidatesSettingsList[id].image !== 'string') {
        formData.append('image', this.candidatesSettingsList[id].image);
      }
      formData.append('offline_votes', this.candidatesSettingsList[id].offlineVotes);
      axios.post(constants.serverIp + 'change-candidate/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((req) => {
        console.log(req)
      })
    }
  },
  computed: {
    ...mapGetters('mainStore', ['sessionId', 'isVoteDisplayShown', 'isNameShown', 'role'])
  },
}
</script>

<style lang="scss" scoped>
.unautorised{
  width: 100vw;
  height: 100vh;
}
</style>
