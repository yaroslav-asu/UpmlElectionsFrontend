<template>
  <q-layout>
    <div class="limiter flex column justify-center items-center " v-if="role !== 0">
      <h3>Создать кандидата</h3>
      <q-btn color="primary" @click="addCandidate">Добавить кандидата</q-btn>
      <div class="form-wrapper flex justify-center">
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
          <q-select v-model="candidatesSettingsList[id].gender"
                    :options="selectOptions"
                    label="Пол"
                    @update:model-value="changeCandidateData(id)"
          />
          <div class="flex q-my-sm ">
            <q-input v-model="candidatesSettingsList[id].offlineVotes"
                     label="Количество очных голосов"
                     @update:model-value="changeCandidateData(id)"
            />
            <div class="change-votes-btns flex column reverse">
              <q-btn icon="expand_more" @click="changeOfflineVotes(id, '-')"></q-btn>
              <q-btn icon="expand_less" @click="changeOfflineVotes(id, '+')"></q-btn>
            </div>
          </div>

          <q-btn icon="close" @click="deleteCandidate(id)">Удалить Кандидата</q-btn>
        </q-form>
      </div>
      <q-checkbox
        label="Подвести итоги"
        @update:model-value="toggleEnd()"
        v-model="isEnded"
        :model-value="isEnded"
      />
    </div>
    <div class="unautorised flex column justify-center items-center text-center" v-else>
      <h1>У вас недостаточно полномочий</h1>
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

    this.isVoteDisplayChecked = this.isVoteDisplayShown
    this.isNameShowed = this.isNameShown
    axios.get(constants.serverIp + 'candidates/').then((req) => {
      for (let i in req.data) {
        if (req.data[i].gender) {
          req.data[i].gender = 'Мужской'
        } else {
          req.data[i].gender = 'Женский'
        }
      }

      this.candidatesSettingsList = req.data
    }).catch(
      (req) => {
        console.log(req)
      }
    )
    axios.get(constants.serverIp + 'is-ended/').then(req => {
      this.isEnded = req.data
    })
  },
  data() {
    return {
      candidatesCount: 0,
      candidatesSettingsList: [],
      isVoteDisplayChecked: null,
      isNameShowed: null,
      candidatesShow: [],
      isEnded: false,
      selectOptions: ['Мужской', 'Женский']
    }
  },
  methods: {
    ...mapMutations('mainStore', ['toggleVoteDisplay', 'toggleNameShow', 'changeCandidatesShown', 'changeWinnerName']),
    changeOfflineVotes(id, action) {
      if (action === '+') {
        this.candidatesSettingsList[id].offlineVotes++
      } else {
        this.candidatesSettingsList[id].offlineVotes--
      }
      this.changeCandidateData(id)
    },
    addCandidate() {
      axios.post(constants.serverIp + 'add-empty-candidate', {session_id: this.sessionId}).then((req) => {
        this.candidatesSettingsList.push(
          {
            candidateId: req.data[0],
            name: '',
            surname: '',
            image: '',
            offlineVotes: 0,
            gender: 'Мужской'
          }
        )
      })
    },
    toggleEnd() {
      this.isEnded = !this.isEnded
      axios.post(constants.serverIp + 'toggle-end', {session_id: this.sessionId}).then(req => {
        this.changeWinnerName(req.data)
        console.log(req.data)
      })
    },
    deleteCandidate(id) {
      axios.post(constants.serverIp + 'delete-candidate/', {
        session_id: this.sessionId,
        candidate_id: this.candidatesSettingsList[id].candidateId
      })
      this.candidatesSettingsList.splice(id, 1)
    },
    changeCandidateData(id) {
      console.log(this.candidatesSettingsList[id].candidateId, this.sessionId, this.candidatesSettingsList[id].name, this.candidatesSettingsList[id].surname, this.candidatesSettingsList[id].offlineVotes, this.candidatesSettingsList[id].gender == 'Мужской' ? 1 : 0)
      let formData = new FormData();
      formData.append('candidate_id', this.candidatesSettingsList[id].candidateId);
      formData.append('session_id', this.sessionId);
      formData.append('name', this.candidatesSettingsList[id].name);
      formData.append('surname', this.candidatesSettingsList[id].surname);
      formData.append('gender', this.candidatesSettingsList[id].gender === 'Мужской' ? 1 : 0);
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
.unautorised {
  width: 100vw;
  height: 100vh;
}

h1 {
  font-size: 5vw !important;
}

.change-votes-btns {
  .q-btn {
    width: 10px;
    height: 10px;
  }
}
</style>
