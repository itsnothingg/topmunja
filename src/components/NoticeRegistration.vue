<template>
  <div class="modal fade" id="noticeRegistrationModal" tabindex="-1" role="dialog" aria-labelledby="noticeRegistrationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="noticeRegistrationModalLabel" v-if="!notice">로딩중...</h5>
          <h5 class="modal-title" id="noticeRegistrationModalLabel" v-else>공지사항 등록</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body" v-if="notice">
          <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
            <div class="form-group mt-3">
              <label for="inputEmail">제목</label>
              <input v-model="notice.title" type="text" class="form-control" id="inputEmail" placeholder="필수">
            </div>

            <div class="form-group">
              <label for="inputContent">내용</label>
               <textarea class="form-control" v-model="notice.content" rows="10" id="inputContent"  placeholder="필수"></textarea>
            </div>
          
            <div class="form-group">
              <label for="inputPaymentDay">게시일</label>
              <date-picker v-if="notice" v-model="notice.notice_at" :config="options"></date-picker>
            </div>

            <div class="form-check">
              <input v-model="notice.usable" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="1" checked>
              <label class="form-check-label" for="exampleRadios1">
                사용
              </label>
            </div>
            <div class="form-check">
              <input v-model="notice.usable" class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="0">
              <label class="form-check-label" for="exampleRadios2">
                미사용
              </label>
            </div>

          </div>
        </div>
        <div class="modal-footer" v-if="notice">
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
import datePicker from 'vue-bootstrap-datetimepicker';

export default {
  name: "NoticeRegistration",
  components: {
    datePicker
  },
  data() {
    return {
      options: {
        format: 'YYYY-MM-DD'
      },
      notice: false,
      loading: false
    }
  },
  methods: {
    register() {
      this.loading = true
      let action = {}
      if (this.notice.id) {
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
      return this.$axios.post(`${process.env.VUE_APP_API_HOST}/notices`, {
        ...this.notice
      })
    },
    update() {
      return this.$axios.put(`${process.env.VUE_APP_API_HOST}/notices/${this.notice.id}`, {
        ...this.notice
      })
    },
    registered() {
      alert('등록되었습니다.')
      $('#noticeRegistrationModal').modal('hide')
      this.$emit('add')
      this.loading = false
    },
    open(noticeId = 0) {
      $('#noticeRegistrationModal').modal()
      if (!noticeId) {
        this.notice = {
          title: '',
          content: '',
          notice_at: '',
          usable: 1,
        }
      } else {
        this.$axios.get(`${process.env.VUE_APP_API_HOST}/notices/${noticeId}`)
          .then(response => {
            this.options.date = moment(response.data.notice_at).toDate()
            this.notice = response.data
          })
      }

      $('#noticeRegistrationModal').on('hidden.bs.modal', () => {
        this.notice = false
        this.loading = false 
      })
      
    }
  }
};
</script>

<style>
</style>