<template>
  <div>
    <div class="iphone">
      <div class="border">
        <iframe :src="url" @load="load" width="100%" height="100%" frameborder="0" id="mobileWeb" />
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "Phone",
  props: {
    url: ``
  },
  data() {
    return {
      bytes: 0,
      oldContent: ``,
      content: ``,
      phone: ``,
      dataTable: {},
      loading: false,
      title: ``,
      content: ``
    }
  },
  created () {
    // this.url = `http://localhost:8081/${auth.user.id}`
  },
  methods: {
    load() {
      let auth = this.$jwt(localStorage.getItem('token'))
       document.all.mobileWeb.contentWindow.postMessage({
        title: this.title,
        content: this.content
      }, '*')
    },
    rewrite(title, content) {
      let data = []
      this.title = title
      this.content = content
      document.all.mobileWeb.contentWindow.postMessage({
        title, content
      }, '*')
    },
  }
};
</script>
<style scoped>
.iphone{
  width:400px;
  height:809px;
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
