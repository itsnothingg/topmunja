<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20" style="padding-bottom: 120px !important;">
          <nav class="nav nav-pills nav-justified">
            <a class="nav-link active" data-toggle="tab" href="#home" role="tab" aria-controls="home">SMS</a>
            <a class="nav-link" data-toggle="tab" href="#profile" role="tab" aria-controls="profile">WEB</a>
          </nav>
           <div class="tab-content" id="myTabContent">
            <div class="tab-pane show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <div class="row mt-5">
                <div class="col-md-5">
                  <phone @send="send" ref="phone"></phone>
                  <div class="point mt-3">
                    <div class="info alert alert-primary" role="alert">
                      <i class="fa fa-money mr-3"></i>사용 가능 포인트: <a href="#" class="alert-link">1,100</a>
                    </div>
                    <div class="info bottom alert alert-success" role="alert">
                      <i class="fa fa-send mr-3"></i> 발송 가능 건수: <a href="#" class="alert-link">1,100</a>
                    </div> 
                  </div>
                </div>
                <div class="col-md-7">
                  <contact ref="contact"></contact>
                </div>
              </div>
              
            </div>
            <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <div class="row mt-5">
                <div class="col-md-6">
                  <mobileWeb :url="web.url" ref="mobileWeb"></mobileWeb>
                </div>
                <div class="col-md-6">
                  <div class="form-group mt-3">
                    <label for="inputEmail">제목</label>
                    <input v-model="web.title" type="text" class="form-control" id="inputEmail" placeholder="필수">
                  </div>
                  <div class="form-group">
                    <label for="inputName">내용</label>
                    <textarea v-model="web.content" class="form-control" rows="20" id="inputContent" placeholder="내용" ref="content"></textarea>
                  </div>
                  <button type="button" @click="saveMobile" class="btn btn-primary float-right" v-if="!loading">등록</button>
                  <button type="button" disabled class="btn btn-primary float-right" v-if="loading">
                    <i class="fa fa-circle-o-notch fa-spin mr-2"></i>등록
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import Phone from './Message/Phone.vue'
import MobileWeb from './Message/MobileWeb.vue'
import Contact from './Message/Contact.vue'

export default {
  name: "Message",
  components: {
    Phone,
    Contact,
    MobileWeb
  },
  data() {
    return {
      loading: false,
      dataTable: {},
      web: {
        url: ``,
        title: ``,
        content: ``,
        loading: false
      }
    }
  },
  watch: {
    'web.title': function (newVal, oldVal) {
      this.$refs.mobileWeb.rewrite(this.web.title, this.web.content)
     },
     'web.content': function (newVal, oldVal) {
      this.$refs.mobileWeb.rewrite(this.web.title, this.web.content)
     }
  },
  methods: {
    saveMobile() {
      if (confirm('해당 내용을 등록하시겠습니까?')) {
        this.laoding = true
        this.$axios.put(`${process.env.VUE_APP_API_HOST}/user/mobile`, {
          title: this.web.title,
          content: this.web.content
        }).then(() => {
          alert('등록되었습니다.')
          this.loading = false
        })
      }
      
    },
    send() {
      let phones = this.$refs.contact.getClients().map(client => {
        return client.phone
      })
      let content = this.$refs.phone.content
      if (confirm(`총 ${phones.length}명에게 메시지를 발송하시겠습니까?`)) {
        this.$refs.phone.loading = true
        this.$axios.post(`${process.env.VUE_APP_API_HOST}/messages`, 
          {
            content,
            phones
          }
        )
        .then(response => {
          alert(`성공적으로 발송되었습니다.`)
          this.$refs.phone.loading = false
        })
        .catch(error => {
          alert(error.response.data.error)
          this.$refs.phone.loading = false
        })
      }
    }
  },
  created() {
    let auth = this.$jwt(localStorage.getItem('token'))
    this.web.url = `${process.env.VUE_APP_MOBILE_HOST}/${auth.user.id}`
    this.$axios.get(`${process.env.VUE_APP_API_HOST}/auth/me`)
      .then(response => {
        this.web.title = response.data.mobile_title
        this.web.content = response.data.mobile_content
        if (!this.web.title && !this.web.content) {
          this.web.title =  `${moment().format("YYYY-MM-DD")} 문자 세일 정보`,
          this.web.content = `${moment().format("YYYY-MM-DD")} 문자 세일 정보 내용 입력`
        }
      })
  }
};
</script>
<style scoped>
.nav-link {
  width: 150px;
  text-align: center
}
.point {
  width:300px;
  margin:0 auto;
  position:relative;
}
.point .info{
	position:absolute;
	right:3%;left:3%;
	overflow:hidden;
}
.point .info.bottom {
  top: 50px
}
</style>
