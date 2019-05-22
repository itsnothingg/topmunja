<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20">
          <h4 class="c-grey-900 mB-20">전단지관리 - 
            <span v-if="type === `sale`">기간 세일</span>
            <span v-else-if="type === `map`">오시는 길</span>
            <span v-else>전단지</span>

          </h4>
          <form>
            <div class="form-group col-md-6 mb-4">
              <label for="inputName">제목</label>
              <input type="text" class="form-control" id="inputName" v-model="flyer.title">
            </div>
            <div class="form-group col-md-6">
              <input ref="file" type="file" class="custom-file-input" accept="image/*" @change="handleFileChange">
              <label class="custom-file-label">
                <span v-if="flyer.img_title">{{ flyer.img_title }}</span>
                <span v-else>전단지 이미지 1</span>
              </label>
            </div>
            <div class="form-group col-md-6">
              <input ref="file2" type="file" class="custom-file-input" accept="image/*" @change="handleFile2Change" >
              <label class="custom-file-label" >
                <span v-if="flyer.img_title2">{{ flyer.img_title2 }}</span>
                <span v-else>전단지 이미지 2</span>
              </label>
            </div>
          </form>
          <div class="col-md-12" v-if="src || src2">
            <div class="card">
              <h5 class="card-header">미리보기</h5>
              <div class="card-body">
                <div class="row">
                  <div :class="[type !== `flyer` ? `col-md-6` : `col-md-12`]">
                    <button v-if="src" type="button" class="btn btn-sm btn-danger mb-2" @click="delete_file1 = true">
                      <i class="fa fa-trash"></i>
                    </button>
                    <img class="card-img mb-2" v-if="src" alt="Card image" :src="src">
                  </div>
                  <div class="col-md-6">
                    <button v-if="src2" type="button" class="btn btn-sm btn-danger mb-2" @click="delete_file2 = true">
                      <i class="fa fa-trash"></i>
                    </button>
                    <img class="card-img mb-2" v-if="src2" alt="Card image" :src="src2">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-md-12 text-right mt-2">
            <button type="button" class="btn btn-success mt-2" @click="register">
              <i class="fa fa-pencil mr-1"></i>
              등록
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Flyer",
  components: {

  },
  data() {
    return {
      flyer: {},
      file: false,
      file2: false,
      src: '',
      src2: '',
      delete_file1: false,
      delete_file2: false
    }
  },
  watch: {
    delete_file1 (val) {
      if (val) {
        this.file = false
        this.flyer.img_title = ''
        this.src = ''
      }
    },
    delete_file2 (val) {
      if (val) {
        this.file2 = false
        this.flyer.img_title2 = ''
        this.src2 = ''
      }
    },
    file (file) {
      this.flyer.img_title = file.name
      this.src = URL.createObjectURL(file)
      this.delete_file1 = false
      
    },
    file2 (file) {
      this.flyer.img_title2 = file.name
      this.src2 = URL.createObjectURL(file)
      this.delete_file2 = false
    }
  },
  methods: {
    handleFileChange(e) {
      let file = e.target.files[0]
      if (file) {
        this.file = file
      }
    },
    handleFile2Change(e) {
      let file = e.target.files[0]
      if (file) {
        this.file2 = file
      }
    },
    register() {
      let formData = new FormData()
      if (this.file)
        formData.append('file1', this.file)
      if (this.file2)
        formData.append('file2', this.file2)
      formData.append('delete_file1', this.delete_file1)
      formData.append('delete_file2', this.delete_file2)
      formData.append('title', this.flyer.title)
      axios.post(`${process.env.VUE_APP_API_HOST}/flyers?type=${this.type}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then((response) => {
        alert(`등록되었습니다.`)
      });
    }
  },
  created() {
    this.type = this.$route.params.type
    this.$axios.get(`${process.env.VUE_APP_API_HOST}/flyers?type=${this.type}`)
      .then((response) => {
        this.flyer = (response.data) ? response.data : {
          title: '',
          img_url: '',
          img_url2: '',
          type: this.type,
          img_title: '',
          img_title2: ''
        }
        this.src = (this.flyer.img_url) ? this.flyer.img_url : ''
        this.src2 = (this.flyer.img_url2) ? this.flyer.img_url2 : ''
      })
  }
};
</script>
<style scoped>
.custom-file-label {
  margin-left: 15px
}
</style>

