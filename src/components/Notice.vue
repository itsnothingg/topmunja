<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20">
          <h4 class="c-grey-900 mB-20">공지사항</h4>
          <form>
            <div class="form-row">
              <div class="form-group">
                <button type="button" class="btn  btn-sm btn-success mr-2" @click="addNotice">
                  <i class="fa fa-plus mr-1"></i>
                  공지사항 등록
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
                <th style="width:25%">제목</th>
                <th style="width:15%">작성자</th>
                <th style="width:20%">게시일</th>
                <th style="width:15%">사용 여부</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <NoticeRegistration ref="noticeRegistration" @add="reloadNotices"></NoticeRegistration>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import dataTable from '../plugins/datatables.settings'
import NoticeRegistration from './NoticeRegistration'

export default {
  name: "Notice",
  components: {
    NoticeRegistration
  },
  data() {
    return {
      dataTable: {}
    }
  },
  methods: {
    addNotice() {
      this.$refs.noticeRegistration.open()
    },
    reloadNotices() {
      this.dataTable.ajax.reload(null, false)
    },
    onDataTableClicked(rowId) {
      this.$refs.noticeRegistration.open(rowId)
    },
    onDataTableRemoved(ids) {
      if (confirm('선택된 목록을 삭제하시겠습니까?\n복원될 수 없습니다.')) {
        this.$axios.delete(`${process.env.VUE_APP_API_HOST}/notices`, {
          data : {
            ids
          }
        }).then(response => {
          this.reloadNotices()
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
          let text = (data) ? '사용' : '미사용';
          return text;
        }
      }           
    );

    this.dataTable = $('#dataTable').DataTable({
        columnDefs: customColumnDefs,
        ajax: {
            url: `${process.env.VUE_APP_API_HOST}/notices`,
            type: `GET`,
            beforeSend: function (request) {
                request.setRequestHeader("token", localStorage.getItem(`token`));
            }
        },
        language: {
          search: "제목 검색: "
        }
      })
  }
};
</script>
