<template>
  <div>
    <!-- @App Content -->
    <!-- =================================================== -->
    <div>
      <!-- #Left Sidebar ==================== -->
      <div class="sidebar">
        <div class="sidebar-inner">
          <!-- ### $Sidebar Header ### -->
          <div class="sidebar-logo">
            <div class="peers ai-c fxw-nw">
              <div class="peer peer-greed">
                <a class="sidebar-link td-n" href="index.html">
                  <div class="peers ai-c fxw-nw">
                    <div class="peer">
                      <div class="logo">
                        <img src="../assets/logo.png" alt="" style="height: 65px">
                      </div>
                    </div>
                    <div class="peer peer-greed">
                      <h5 class="lh-1 mB-0 logo-text">탑문자</h5>
                    </div>
                  </div>
                </a>
              </div>
              <div class="peer">
                <div class="mobile-toggle sidebar-toggle">
                  <a href="" class="td-n">
                    <i class="ti-arrow-circle-left"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- ### $Sidebar Menu ### -->
          <ul class="sidebar-menu scrollable pos-r">
            <li class="nav-item mT-30 active">
              <router-link :to="`/console/message`" class='sidebar-link'>
                <span class="icon-holder">
                  <i class="c-indigo-500 ti-mobile"></i>
                </span>
                <span class="title">문자 발송</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="`/console/messages`" class='sidebar-link'>

                <span class="icon-holder">
                  <i class="c-purple-500 ti-email"></i>
                </span>
                <span class="title">발송 이력</span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link :to="`/console/contact`" class='sidebar-link'>

                <span class="icon-holder">
                  <i class="c-brown-500 ti-layout-tab"></i>
                </span>
                <span class="title">전화번호부</span>
              </router-link>
            </li>
            <li class="nav-item dropdown">
              <router-link :to="`/console/notice`" class='sidebar-link'>
                <span class="icon-holder">
                  <i class="c-pink-500 ti-bell"></i>
                </span>
                <span class="title">공지사항</span>
              </router-link>
            </li>
             <li class="nav-item dropdown">
              <a class="dropdown-toggle" href="javascript:void(0);">
                <span class="icon-holder">
                  <i class="c-teal-500 ti-agenda"></i>
                </span>
                <span class="title">전단지 관리</span>
                <span class="arrow">
                  <i class="ti-angle-right"></i>
                </span>
              </a>
              <ul class="dropdown-menu">
                <li class="nav-item dropdown">
                  <router-link :to="`/console/flyer/flyer`" class='sidebar-link'>
                    <span>전단지</span>
                  </router-link>
                </li>
                <li class="nav-item dropdown">
                  <router-link :to="`/console/flyer/sale`" class='sidebar-link'>
                    <span>기간 세일</span>
                  </router-link>
                </li>
                <li class="nav-item dropdown">
                  <router-link :to="`/console/flyer/map`" class='sidebar-link'>
                    <span>오시는 길</span>
                  </router-link>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown">
              <router-link :to="`/console/user`" class='sidebar-link'>
                <span class="icon-holder">
                  <i class="c-red-500 ti-id-badge"></i>
                </span>
                <span class="title">회원관리</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- #Main ============================ -->
      <div class="page-container">
        <!-- ### $Topbar ### -->
        <div class="header navbar">
          <div class="header-container">
            <ul class="nav-left">
              <li>
                <a id='sidebar-toggle' class="sidebar-toggle" href="javascript:void(0);">
                  <i class="ti-menu"></i>
                </a>
              </li>
              <li class="search-box">
                <a class="search-toggle no-pdd-right" href="javascript:void(0);">
                  <i class="search-icon ti-search pdd-right-10"></i>
                  <i class="search-icon-close ti-close pdd-right-10"></i>
                </a>
              </li>
              <li class="search-input">
                <input class="form-control" type="text" placeholder="Search...">
              </li>
            </ul>
            <ul class="nav-right">
              <li class="dropdown">
                <a href="" @click="logout" class="dropdown-toggle no-after peers fxw-nw ai-c lh-1" data-toggle="dropdown">
                  <div class="peer">
                    <span class="fsz-sm c-grey-900">로그아웃</span>
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <!-- ### $App Screen Content ### -->
        <main class='main-content bgc-grey-100'>
          <div id='mainContent'>
            <div class="container-fluid">
              <router-view :key="$route.fullPath"></router-view>
            </div>
          </div>
        </main>
        <!-- ### $App Screen Footer ### -->
        <footer class="bdT ta-c p-30 lh-0 fsz-sm c-grey-600">
          <span>Copyright © 2017 Designed by <a href="https://colorlib.com" target='_blank' title="Colorlib">Colorlib</a>.
            All rights reserved.</span>
        </footer>
      </div>
    </div>
    <div v-for="(modal, index) in modals" :key="modal.id" :id="index" class="notice modal fade" tabindex="-1" role="dialog" aria-hidden="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">공지사항</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="mt-2">
              {{ modal.title }}
            </div>
            <pre class="mt-3">{{ modal.content.trim() }}</pre>
          </div>
          <div class="modal-footer">
            <div class="form-check" v-if="modal.dismissable">
              <input type="checkbox" class="form-check-input" v-model="modal.dismiss">
              <label class="form-check-label">오늘 다시 보지 않기</label>
            </div>
            <button type="button" class="btn btn-info" data-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sidebar from '../plugins/sidebar.js'
import $ from 'jquery'

export default {
  name: "Console",
  data() {
    return {
      modals: []
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      this.$router.replace(`/`)
    }
  },
  mounted() {
    let modals = []
    sidebar()
    this.$axios.get(`${process.env.VUE_APP_API_HOST}/notices?length=10&start=0&shouldNotice=true`)
      .then((response) => {
        modals = response.data.data
          .map(data => {
            return {
              id: data[0],
              title: data[2],
              content: data[6],
              dismissable: true,
              dismiss: false
            }
          })
          return this.$axios.get(`${process.env.VUE_APP_API_HOST}/auth/me`)
      })
      .then((response) => {
        let payment_day = response.data.payment_day
        let dueDate = moment(`${moment().format('YYYY-MM')}-${payment_day.pad(2)}`)
                console.log(dueDate)
        let today = moment().startOf('day')
        let leftDays = 0
        if (dueDate.isBefore(today)) {
          dueDate = moment(dueDate).add(1, 'M')
        }
        leftDays = dueDate.diff(today, 'days')
        if (leftDays <= 3) {
          let content =  `결제일까지 ${leftDays}일 남았습니다.`
          if (!leftDays) {
            content = `오늘은 결제일입니다.`
          }
          modals.push({
            id: payment_day,
            title: '결제일 알림',
            content,
            dismissable: false,
            dismiss: true
          })
          console.log('modals')
        }
        
        this.modals = modals.filter(data => {
          return !this.$cookie.get(`notice-${data.id}`)
        })
        this.$nextTick(() => {
          $('.notice.modal').modal()
          $('.notice.modal').on('hidden.bs.modal', (e) => {
            let index = $(e.target).attr('id')
            let modal = this.modals[index]
            if (modal.dismiss) {
              this.$cookie.set(`notice-${modal.id}`, true, 1)
            }
          })
        })
      })

      
  }
};
</script>

<style>
#dataTable tbody tr:hover td {
  background-color: #DDD;
  cursor: pointer;
}
pre {
    white-space: pre-wrap;       /* Since CSS 2.1 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
}
</style>