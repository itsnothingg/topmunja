<template>
  <div class="peers ai-s fxw-nw h-100vh">
    <div class="d-n@sm- bg peer peer-greed h-100 pos-r bgr-n bgpX-c bgpY-c bgsz-cv">
      <div class="pos-a centerXY">
        <div class=" bdrs-50p pos-r" style='width: 120px; height: 120px;'>
          <img class="pos-a centerXY" src="../assets/logo.png" alt="">
        </div>
      </div>
    </div>
    <div class="col-12 col-md-4 peer pX-40 pY-80 h-100 bgc-white scrollable pos-r" style='min-width: 320px;'>
      <h4 class="fw-300 c-grey-900 mB-40">로그인</h4>
      <form @submit.prevent="signIn">
        <div class="form-group">
          <label class="text-normal text-dark">계정</label>
          <input type="text" class="form-control" placeholder="John Doe" v-model="auth.email">
        </div>
        <div class="form-group">
          <label class="text-normal text-dark">비밀번호</label>
          <input type="password" class="form-control" placeholder="Password" v-model="auth.password">
        </div>
        <div class="form-group">
          <div class="peers ai-c jc-sb fxw-nw">
            <div class="peer">
              <button class="btn btn-primary">로그인</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "SignIn",
  data() {
    return {
      auth: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    signIn() {
      this.$axios.post(`${process.env.VUE_APP_API_HOST}/auth/login`, 
        this.auth
      )
      .then(response => {
         let token = response.data.token
         localStorage.setItem('token', token)
         this.$router.replace(`/console/contact`)
      })
      .catch(() => {
        alert(`아이디와 비밀번호를 확인해주세요.`)
      })
    }
  }
};
</script>

<style scoped>
.bg {
  background-image: url(../assets/bg.jpg)
}
#loader {
  transition: all 0.3s ease-in-out;
  opacity: 1;
  visibility: visible;
  position: fixed;
  height: 100vh;
  width: 100%;
  background: #fff;
  z-index: 90000;
}

#loader.fadeOut {
  opacity: 0;
  visibility: hidden;
}

.spinner {
  width: 40px;
  height: 40px;
  position: absolute;
  top: calc(50% - 20px);
  left: calc(50% - 20px);
  background-color: #333;
  border-radius: 100%;
  -webkit-animation: sk-scaleout 1s infinite ease-in-out;
  animation: sk-scaleout 1s infinite ease-in-out;
}

@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>