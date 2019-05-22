<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20">
          <h4 class="c-grey-900 mB-20">전화번호부</h4>
          <form>
            <div class="form-row">
              <div class="form-group">
                <button type="button" class="btn  btn-sm btn-success mr-2" @click="addUser">
                  <i class="fa fa-plus mr-1"></i>
                  회원 추가
                </button>
                <button  type="button" class="btn btn-sm btn-danger mr-2" id="removeHandler">
                  <i class="fa fa-trash mr-1"></i>선택 삭제
                </button>
              </div>
            </div>
          </form>
          <table id="dataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th style="width:5%"></th>
                <th style="width:10%">순번</th>
                <th style="width:15%">아이디</th>
                <th style="width:15%">상호</th>
                <th style="width:20%">연락처</th>
                <th style="width:10%">구분</th>
                <th style="width:15%">결제일</th>
                <th style="width:10%">승인</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <UserRegistration ref="userRegistration" @add="reloadUsers"></UserRegistration>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import dataTable from '../plugins/datatables.settings'
import UserRegistration from './UserRegistration'

export default {
  name: "User",
  components: {
    UserRegistration
  },
  data() {
    return {
      dataTable: {}
    }
  },
  methods: {
    addUser() {
      this.$refs.userRegistration.open()
    },
    reloadUsers() {
      this.dataTable.ajax.reload(null, false)
    },
    onDataTableClicked(rowId) {
      this.$refs.userRegistration.open(rowId)
    },
    onDataTableRemoved(ids) {
      if (confirm('선택된 목록을 삭제하시겠습니까?\n복원될 수 없습니다.')) {
        this.$axios.delete(`${process.env.VUE_APP_API_HOST}/users`, {
          data : {
            ids
          }
        }).then(response => {
          this.reloadUsers()
        })
      }
    }
  },
  mounted() {
    dataTable($, this)
    let customColumnDefs = $.extend(true, {}, $.fn.dataTable.defaults).columnDefs;
    customColumnDefs.push(
      {
        'targets': 5,
        'render': (data, type, full, meta) => {
          let text = (data === 1) ? '관리자' : '사용자';
          return text;
        }
      },
      {
        'targets': 6,
        'render': (data, type, full, meta) => {
          if (!data) return '' 
          let dueDate = moment(`${moment().format('YYYY-MM')}-${data.pad(2)}`)
          let today = moment().startOf('day')
          let leftDays = 0
          if (dueDate.isBefore(today)) {
            dueDate = moment(dueDate).add(1, 'M')
          }
          leftDays = dueDate.diff(today, 'days')
          if (!leftDays) {
            return `${data}일 (<span class="text-danger">오늘</span>)`
          } else {
            return `${data}일 (<span class="text-danger">${leftDays}</span>일 남음)`
          }
        }
      },
      {
        'targets': 7,
        'render': (data, type, full, meta) => {
          let text = (data) ? '승인' : '미승인';
          return text;
        }
      }           
    );

    this.dataTable = $('#dataTable').DataTable({
        columnDefs: customColumnDefs,
        ajax: {
            url: `${process.env.VUE_APP_API_HOST}/users`,
            type: `GET`,
            beforeSend: function (request) {
                request.setRequestHeader("token", localStorage.getItem(`token`));
            }
        },
        language: {
          search: "검색: "
        }
      })
  }
};
</script>
