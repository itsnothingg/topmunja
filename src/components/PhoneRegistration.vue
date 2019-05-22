<template>
  <div class="modal fade" id="registrationModal" tabindex="-1" role="dialog" aria-labelledby="phoneRegistrationModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="phoneRegistrationModalLabel">전화번호 등록</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a @click="mode=`text`" class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home"
                aria-selected="true">간편등록</a>
            </li>
            <li class="nav-item">
              <a @click="mode=`excel`" class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile"
                aria-selected="false">엑셀등록</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="form-group mt-3">
                <label for="exampleInputEmail1">휴대폰 번호</label>
                <input ref="phone" type="text" class="form-control" id="exampleInputEmail1" @keyup.enter="register">
              </div>
              <div class="form-group">
                <label for="exampleInputPassword1">성명</label>
                <input ref="name" type="text" class="form-control" id="exampleInputPassword1" @keyup.enter="register">
              </div>
            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="form-group mt-3">
                <button type="button" @click="downloadSample" class="btn btn-sm btn-info">
                  <i class="fa fa-download mr-1"></i>
                  엑셀 등록 양식 다운로드
                </button>
              </div>
              <div class="custom-file">
                <input ref="file" type="file" @change="handleFileChange" class="custom-file-input" id="validatedCustomFile" required>
                <label class="custom-file-label" for="validatedCustomFile">
                  <span v-if="file">{{ file.name }}</span>
                  <span v-else>엑셀 선택...</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" @click="register">등록</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as $ from 'jquery'

export default {
  name: "PhoneRegistration",
  data() {
    return {
      groupId: false,
      file: false,
      mode: 'text'
    }
  },
  methods: {
    downloadSample() {
      location.href = `${process.env.VUE_APP_S3_URL}/sample.xlsx`
    },
    register() {
      if (this.mode === 'text') {
        this.registerByText()
      } else if (this.mode === 'excel') {
        this.registerByExcel()
      }
      
    },
    registerByExcel() {
      if (!this.file) {
        alert('파일을 선택해주세요.')
        return
      } 
      let formData = new FormData()
      formData.append('file', this.file)
      axios.post(`${process.env.VUE_APP_API_HOST}/groups/${this.groupId}/clients?method=excel`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        alert(`${response.data.insertedRow}명이 그룹에 추가되었습니다.`)
         this.registered()
      });
    },
    registerByText() {
      let name = this.$refs.name.value
      let phone = this.$refs.phone.value
      axios.post(`${process.env.VUE_APP_API_HOST}/groups/${this.groupId}/clients?method=text`,
        {
          name,
          phone
        },
      ).then((response) => {
        alert(`그룹에 추가되었습니다.`)
        this.registered()
      });
    },
    registered() {
      this.file = false
      this.$emit('add')
      $('#registrationModal').modal('hide')
      this.$refs.file.value = ''
      this.$refs.name.value = ''
      this.$refs.phone.value = ''
    },
    handleFileChange(e) {
      let file = e.target.files[0]
      if (file)
        this.file = file
    },
    open(groupId) {
      this.groupId = groupId
      $('#registrationModal').modal()
    }
  }
};
</script>

<style>
</style>