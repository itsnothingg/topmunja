<template>
  <div class="modal fade" id="clientRegistrationModal" tabindex="-1" role="dialog" aria-labelledby="clientRegistrationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="clientRegistrationModalLabel" v-if="!client">로딩중...</h5>
          <h5 class="modal-title" id="clientRegistrationModalLabel" v-else>전화번호 등록</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="client">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="form-group mt-3">
              <label for="inputState">그룹</label>
              <select id="inputState" v-model="client.group_id" class="form-control">
                <option :key="group.id" v-for="group in groups" :value="group.id">
                  {{ group.name }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="exampleInputEmail1">휴대폰 번호</label>
              <input v-model="client.phone" type="text" class="form-control" id="exampleInputEmail1" @keyup.enter="register">
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">성명</label>
              <input v-model="client.name" type="text" class="form-control" id="exampleInputPassword1" @keyup.enter="register">
            </div>
          </div>
        </div>
        <div class="modal-footer" v-if="client">
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
  name: "ClientRegistration",
  props: {
    groups: {}
  },
  data() {
    return {
      client: false,
      loading: false
    }
  },
  methods: {
    register() {
      this.loading = true
      this.$axios.put(`${process.env.VUE_APP_API_HOST}/clients/${this.client.id}`, {
        ...this.client
      }).then(() => {
        alert('수정되었습니다.')
        $('#clientRegistrationModal').modal('hide')
        this.$emit('add')
        this.loading = true
      })
    },
    registered() {
    },
    open(clientId) {
      $('#clientRegistrationModal').modal()
      this.$axios.get(`${process.env.VUE_APP_API_HOST}/clients/${clientId}`)
        .then(response => {
          this.client = response.data
          $('#clientRegistrationModal').on('hidden.bs.modal', () => {
            this.client = false
            this.loading = false 
          })
        })
    }
  }
};
</script>

<style>
</style>