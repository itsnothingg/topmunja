<template>
  <div>
    <div class="iphone">
      <div class="border">
        <header>
          <span v-if="bytes <= 90" class="btn bytes">{{ bytes }}/90 bytes&nbsp;
            <span class="badge badge-primary">SMS</span>
            <!-- <span class="badge badge-dark">SMS</span> -->
          </span>
          <span v-else class="btn bytes">{{ bytes }}/2000 bytes&nbsp;
            <span class="badge badge-danger">LMS</span>
            <!-- <span class="badge badge-dark">SMS</span> -->
          </span>
          
          <div class="float-right">
            <button type="button" class="btn btn-link">저장</button>
            <button type="button" class="btn btn-link">불러오기</button>
          </div>
          
        </header>
        <!-- <span style="text-align:right;display:block;width:100%;margin-bottom:5px">10/90 bytes&nbsp;</span> -->
        <textarea class="form-control" id="inputContent"  placeholder="내용"  @keyup="saveState" ref="content" v-model="content"></textarea>
        <input type="text" class="form-control" id="insertInputGroupName" readonly="readonly"
        :value="phone">
        <button v-if="!loading" type="button" class="btn btn-success" @click="send" style="width:100%;border-radius:0px">
           <i class="fa fa-send mr-3"></i>전송
        </button>
        <button v-else disabled type="button" class="btn btn-success" @click="send" style="width:100%;border-radius:0px">
           <i class="fa fa-circle-o-notch fa-spin mr-3"></i>전송
        </button>

      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Phone",
  data() {
    return {
      bytes: 0,
      oldContent: ``,
      content: ``,
      phone: ``,
      dataTable: {},
      loading: false
    }
  },
  watch: {
    content(newContent) {
      this.bytes = mb_strwidth(`[WEB발신]\n${newContent}`)
      if (this.bytes > 2000) {
        this.content = this.oldContent
      }
    },
  },
  methods: {
    send() {
      let data = []
      this.$emit('send')
    },
    saveState() {
      this.oldContent = this.content
    },
    getUTF8Length(s) {
      var len = 0;
      for (var i = 0; i < s.length; i++) {
        var code = s.charCodeAt(i);
        if (code <= 0x7f) {
          len += 1;
        } else if (code <= 0x7ff) {
          len += 2;
        } else if (code >= 0xd800 && code <= 0xdfff) {
          len += 4; i++;
        } else if (code < 0xffff) {
          len += 3;
        } else {
          len += 4;
        }
      }
      return len;
    }
  },
  mounted() {
    let auth = this.$jwt(localStorage.getItem('token'))
    console.log();
    this.phone = `발신번호: ${auth.user.phone}`
    this.content = `
(광고)관리자



무료거부 080-123-4567`
  }
};
</script>
<style scoped>
.iphone{
  width:300px;
  height:609px;
  background-image:url('http://www.adobewordpress.com/tasarim/images/iphone6.png');
  background-size:100% 100%;
  margin:0 auto;
  position:relative;
}
.border{
	position:absolute;
	top:12%;right:6.3%;left:6.3%;bottom:11%;
	overflow:hidden;
}
textarea {
  height: 358px !important;
  border-top: none;
  border-left: none;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  border-right: none;
}
input {
  border: 0;
  outline: 0;
  border-bottom-left-radius: 0px;
  border-bottom-right-radius: 0px;
  background: transparent;
  border-bottom: 1px solid #ced4da;
}
header {
  background: #eee;
  border: 1px solid #ccc;
  border-bottom: 1px solid #bbb;
  box-shadow: 0 1px 2px rgba(1,1,1,0.2);
  white-space: nowrap;
}
.bytes {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 12px
}
.float-right .btn{
  font-size: 12px;
  padding: 5px;
}
</style>
