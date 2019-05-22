<template>
  <div class="modal fade" id="userRegistrationModal" tabindex="-1" role="dialog" aria-labelledby="userRegistrationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="userRegistrationModalLabel" v-if="!user">로딩중...</h5>
          <h5 class="modal-title" id="userRegistrationModalLabel" v-else>회원 등록</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="user">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="form-group mt-3">
              <label for="inputEmail">아이디</label>
              <input v-model="user.email" type="text" class="form-control" id="inputEmail" @keyup.enter="register" :disabled="user.id ? true : false" placeholder="필수">
            </div>
            <div class="form-group">
              <label for="inputName">성명</label>
              <input v-model="user.name" type="text" class="form-control" id="inputName" @keyup.enter="register" placeholder="필수">
            </div>
            
            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="inputPassword">비밀번호</label>
                <input v-model="user.password" type="password" class="form-control" id="inputPassword" @keyup.enter="register" :placeholder="!user.id ? `필수` : ``">
              </div>
              <div class="form-group col-md-6">
                <label for="inputPasswordConfirm">비밀번호 확인</label>
                <input v-model="user.passwordConfirm" type="password" class="form-control" id="inputPasswordConfirm" @keyup.enter="register">
              </div>
            </div>

            <div class="form-group">
              <label for="inputPhone">발신번호</label>
              <input v-model="user.phone" type="text" class="form-control" id="inputPhone" @keyup.enter="register">
            </div>

            <div class="form-group">
              <label for="inputPhone">연락처</label>
              <input v-model="user.contact" type="text" class="form-control" id="inputContact" @keyup.enter="register" placeholder="필수">
            </div>


            <div class="form-group">
              <label for="inputCompany">상호</label>
              <input v-model="user.company" type="text" class="form-control" id="inputCompany" @keyup.enter="register">
            </div>
          
            <div class="form-group">
              <label for="inputPaymentDay">결제일</label>
              <input v-model="user.payment_day" type="text" class="form-control" id="inputPaymentDay" @keyup.enter="register">
            </div>
            <div class="form-group">
              <label for="inputAuth">권한</label>
              <select id="inputAuth" v-model="user.level" class="form-control">
                <option value="1">관리자</option>
                <option value="2">사용자</option>
              </select>
            </div>
            <div class="form-group">
              <label for="inputAuth2">사용 승인</label>
              <select id="inputAuth2" v-model="user.usable" class="form-control">
                <option value="1">승인</option>
                <option value="0">미승인</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="user">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" v-if="!loading">닫기</button>
          <button type="button" class="btn btn-primary" @click="register" v-if="!loading">등록</button>
          <button type="button" disabled class="btn btn-primary" v-if="loading">
            <i class="fa fa-circle-o-notch fa-spin mr-2"></i>등록
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as $ from 'jquery'

export default {
  name: "UserRegistration",
  props: {
    groups: {}
  },
  data() {
    return {
      user: false,
      loading: false
    }
  },
  methods: {
    register() {
      this.loading = true
      let action = {}
      if (this.user.id) {
        action = this.update()
      } else {
        action = this.store()
      }
      
      action.then(() => {
        this.registered()
      }).catch((error) => {
        this.loading = false
        alert(error.response.data.error)
      })
    },
    store() {
      return this.$axios.post(`${process.env.VUE_APP_API_HOST}/users`, {
        ...this.user
      })
    },
    update() {
      return this.$axios.put(`${process.env.VUE_APP_API_HOST}/users/${this.user.id}`, {
        ...this.user
      })
    },
    registered() {
      alert('등록되었습니다.')
      $('#userRegistrationModal').modal('hide')
      this.$emit('add')
      this.loading = false
    },
    open(userId = 0) {
      $('#userRegistrationModal').modal()
      if (!userId) {
        this.user = {
          company: '',
          email: '',
          level: 2,
          name: '',
          password: '',
          passwordConfirm: '',
          payment_day: '',
          phone: '',
          contact: '',
          usable: 1
        }
      } else {
        this.$axios.get(`${process.env.VUE_APP_API_HOST}/users/${userId}`)
          .then(response => {
            this.user = response.data
            this.user.password = ''
            this.user.passwordConfirm = ''
          })
      }

      $('#userRegistrationModal').on('hidden.bs.modal', () => {
        this.user = false
        this.loading = false 
      })
      
    }
  }
};
</script>

<style>
</style>