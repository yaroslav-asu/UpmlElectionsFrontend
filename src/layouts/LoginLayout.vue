<template>
  <q-layout class="flex justify-center items-center">
    <q-card class="q-pa-xl">
      <q-form
        class="flex column justify-center items-center"
        @submit="onSubmit"

      >
        <h3 class="q-mb-sm">Вход</h3>
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
        <q-input type="password"
                 v-model="password"
                 model-value=""
                 label="Пароль" class="q-mb-md"
                 lazy-rules
                 :rules="[val => !!val || 'Это поле обязательное']"
        />
        <q-btn color="primary" class="q-mt-sm" type="submit">Вход</q-btn>
        <a href="/" class="q-mt-md">На главную</a>
      </q-form>
    </q-card>
  </q-layout>
</template>

<script>
import {ref} from 'vue'
import axios from "axios";
import constants from "src/js/constants";
import {mapMutations,} from 'vuex'
import {useQuasar,} from 'quasar'

export default {
  name: "LoginLayout",
  setup() {
    let $q = useQuasar()
    return {
      triggerNotification(message, type) {
        $q.notify({
          type: type,
          message: message
        })
      },
    }
  },
  data() {
    return {
      username: ref(null),
      password: ref(null),
      serverIp: constants.serverIp
    }
  },
  computed: {
    name() {
      return this.username.toString().split(' ')[1]
    },
    surname() {
      return this.username.toString().split(' ')[0]
    },
    patronymic() {
      return this.username.toString().split(' ')[2]
    }
  },
  methods: {
    ...mapMutations('mainStore', ['login', 'changeRole']),
    onSubmit() {
      axios.post(constants.serverIp + 'login/', {
        name: this.name,
        surname: this.surname,
        patronymic: this.patronymic,
        password: this.password,
      }).then((req) => {
        let sessionId = req.data['session_id']
        if (sessionId) {
          this.login(sessionId)
          axios.get(constants.serverIp + 'get-role/' + sessionId).then(req => {
            this.changeRole(req.data)
          })
          this.$router.push('/')
        } else {
          this.triggerNotification('Неправильное ФИО или пароль', 'negative')
        }
      }).catch((err) => {
        this.triggerNotification(err, 'warning')
      })
    },
  },

}
</script>

<style scoped>
.q-card {
  border-radius: 20px;
}

.q-btn {
  width: 100%;
}

.q-input {
  width: 100%;
}

a {
  color: black;
}
</style>
