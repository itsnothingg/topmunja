<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20">
          <h4 class="c-grey-900 mB-20">발송 이력</h4>
          <table id="dataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
            <thead>
              <tr>
                <th style="width:5%"></th>
                <th style="width:7%">순번</th>
                <th style="width:15%">사용자</th>
                <th style="width:32%">내용</th>
                <th style="width:5%">분류</th>
                <th style="width:15%">전송 일자</th>
                <th style="width:20%">결과 전송 (대기/성공/실패)</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
      aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="editModalLabel">발송 내용</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group mt-3">

              <textarea class="form-control"  v-model="selectedContent" readonly rows="20"></textarea>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import dataTable from '../plugins/datatables.settings'

export default {
  name: "Messages",
  components: {
  },
  data() {
    return {
      selectedContent: ``,
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
      let data = Object.values(this.dataTable.rows().data()).find((row) => {
        return row[0] == rowId
      })
      this.selectedContent = data[3]
      $('#editModal').modal()
    },
  },
  mounted() {
    dataTable($, this)
    let customColumnDefs = $.extend(true, {}, $.fn.dataTable.defaults).columnDefs;
    customColumnDefs.push(
      {
        'targets': 3,
        'render': (data, type, full, meta) => {
          if (data.length > 50)
            return `${data.substring(0, 50)}...`
          return data;
        }
      },
      {
        'targets': 4,
        'render': (data, type, full, meta) => {
          let text = (data === 1) ? 'SMS' : 'WEB';
          return text;
        }
      },
      {
        'targets': 6,
        'render': (data, type, full, meta) => {
          return `${full[6]}/${full[7]}/${full[8]}`;
        }
      }   
    );

    this.dataTable = $('#dataTable').DataTable({
        columnDefs: customColumnDefs,
        ajax: {
            url: `${process.env.VUE_APP_API_HOST}/messages`,
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
