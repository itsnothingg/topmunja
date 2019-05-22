<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="bgc-white bd bdrs-3 p-20 mB-20">
          <h4 class="c-grey-900 mB-20">전화번호부</h4>
          <form>
            <div class="form-row">
              <div class="form-group col-md-2">
                <label for="inputState">그룹</label>
                <select id="inputState" v-model="selectedGroupId" class="form-control">
                  <option selected value="">선택 안됨</option>
                  <option :key="group.id" v-for="group in groups" :value="group.id">
                    {{ group.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <button type="button" class="btn btn-sm btn-info mr-2" @click="exportClients()">
                  <i class="fa fa-download mr-1"></i>
                  엑셀 다운로드
                </button>
                <button type="button" class="btn  btn-sm btn-success mr-2" data-toggle="modal" data-target="#insertModal">
                  <i class="fa fa-plus mr-1"></i>
                  그룹 추가
                </button>
                <div class="modal fade" id="insertModal" tabindex="-1" role="dialog" aria-labelledby="insertModalLabel"
                  aria-hidden="true">
                  <div class="modal-dialog" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="insertModalLabel">그룹 추가</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        <div class="form-group mt-3">
                          <label for="insertInputGroupName">그룹명</label>
                          <input type="text" class="form-control" id="insertInputGroupName">
                        </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                        <button type="button" class="btn btn-success" data-dismiss="modal" @click="addGroup">추가</button>
                      </div>
                    </div>
                  </div>
                </div>
                <template v-if="selectedGroupId">
                  <button type="button" @click="phoneRegistration()" class="btn  btn-sm btn-primary mr-2">
                    <i class="fa fa-file mr-1"></i>
                    전화번호 등록
                  </button>
                  <button @click="updateGroup" type="button" class="btn  btn-sm btn-secondary mr-2" data-toggle="modal" data-target="#editModal">
                    <i class="fa fa-pencil mr-1"></i>
                    그룹명 변경
                  </button>
                  <div class="modal fade" id="editModal" tabindex="-1" role="dialog" aria-labelledby="editModalLabel"
                  aria-hidden="true">
                    <div class="modal-dialog" role="document">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title" id="editModalLabel">그룹명 변경</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div class="modal-body">
                          <div class="form-group mt-3">
                            <label for="editInputGroupName">그룹명</label>
                            <input type="text" class="form-control" id="editInputGroupName" :value="selectedGroup.name">
                          </div>
                        </div>
                        <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
                          <button type="button" class="btn btn-success" @click="updateGroup" data-dismiss="modal">변경</button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button @click="deleteGroup" type="button" class="btn  btn-sm btn-danger mr-2">
                    <i class="fa fa-trash mr-1"></i>
                    그룹 삭제
                  </button>
                </template>
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
                <th style="width:25%">그룹</th>
                <th style="width:15%">성명</th>
                <th style="width:20%">휴대폰번호</th>
                <th style="width:35%">입력일시</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <PhoneRegistration ref="phoneRegistration" @add="reloadClients"></PhoneRegistration>
    <ClientRegistration ref="clientRegistration" @add="reloadClients" :groups="groups" ></ClientRegistration>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import dataTable from '../plugins/datatables.settings'
import PhoneRegistration from './PhoneRegistration'
import ClientRegistration from './ClientRegistration'

export default {
  name: "Contact",
  components: {
    PhoneRegistration,
    ClientRegistration
  },
  data() {
    return {
      groups: [],
      selectedGroup:{},
      selectedGroupId: "",
      clients: [],
      filteredClients: [],
      dataTable: {}
    }
  },
  watch: {
    selectedGroupId(newGroupId) {
      this.dataTable.ajax.url(`${process.env.VUE_APP_API_HOST}/clients?group_id=${newGroupId}`).load()
      this.selectedGroup = this.groups.find((group) => {
        return group.id === newGroupId
      })
    }
  },
  methods: {
    reloadClients() {
      this.dataTable.ajax.reload(null, false)
    },
    phoneRegistration() {
      this.$refs.phoneRegistration.open(this.selectedGroupId)
    },
    exportClients() {
      location.href = `${process.env.VUE_APP_API_HOST}/clients/export?group_id=${this.selectedGroupId}&Token=${localStorage.getItem('token')}`;
    },
    updateGroup() {
      let newName = $(`#editInputGroupName`).val()
      this.selectedGroup.name = newName
      this.$axios.put(`${process.env.VUE_APP_API_HOST}/groups/${this.selectedGroupId}`, {
          name: newName
        })
    },
    deleteGroup() {
      if (confirm('선택된 그룹을 삭제하시겠습니까?\n복원될 수 없습니다.')) {
        this.$axios.delete(`${process.env.VUE_APP_API_HOST}/groups/${this.selectedGroupId}`)
          .then(response => {
            this.groups = this.groups.filter((group) => {
              return group.id !== this.selectedGroupId
            })
            this.selectedGroupId = ""
          })
      }
    },
    addGroup() {
      let name = $(`#insertInputGroupName`).val()
      $(`#insertInputGroupName`).val('')
      this.$axios.post(`${process.env.VUE_APP_API_HOST}/groups`, {
          name
        })
        .then(response => {
          this.groups.push(response.data)
        })
    },
    onDataTableClicked(rowId) {
      this.$refs.clientRegistration.open(rowId)
    },
    onDataTableRemoved(ids) {
      if (confirm('선택된 목록을 삭제하시겠습니까?\n복원될 수 없습니다.')) {
        this.$axios.delete(`${process.env.VUE_APP_API_HOST}/clients`, {
          data : {
            ids
          }
        }).then(response => {
          this.reloadClients()
        })
      }
    },
    onDataTableEdited(data, className, rowId) {
      let body = {}
      body[className] = data
      this.$axios.put(`${process.env.VUE_APP_API_HOST}/clients/${rowId}`, body)
    }
  },
  created() {
    this.$axios.get(`${process.env.VUE_APP_API_HOST}/groups`)
      .then(response => {
        this.groups = response.data
      })
    this.$nextTick(() => {
      dataTable($, this)
      let oLanguage = $.extend(true, {}, $.fn.dataTable.defaults).oLanguage
      oLanguage.sSearch = "휴대폰번호/성명 검색: "
      this.dataTable = $('#dataTable').DataTable({
          ajax: {
              url: `${process.env.VUE_APP_API_HOST}/clients`,
              type: `GET`,
              beforeSend: function (request) {
                  request.setRequestHeader("token", localStorage.getItem(`token`));
              }
          },
          oLanguage
        })
      })
  },
  mounted() {

  }
};
</script>
