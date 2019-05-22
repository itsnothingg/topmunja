<template>
  <div>
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
    </form>
    <table id="dataTable" class="table table-striped table-bordered" cellspacing="0" width="100%">
      <thead>
        <tr>
          <th style="width:5%">
            <input type="checkbox" v-model="checker" @change="checkAll">
          </th>
          <th style="width:15%">순번</th>
          <th style="width:40%">성명</th>
          <th style="width:40%">번호</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="client in clients" :key="client.id">
          <td>
            <input type="checkbox" v-model="client.checked">
          </td>
          <td>{{ client.index }}</td>
          <td>{{ client.name }}</td>
          <td>{{ client.phone }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import * as $ from 'jquery'
import 'datatables'
import dataTable from '../../plugins/datatables.settings'

export default {
  name: "Contact",
  data() {
    return {
      groups: [],
      selectedGroup:{},
      selectedGroupId: "",
      clients: [],
      filteredClients: [],
      dataTable: {},
      checker: true
    }
  },
  watch: {
    selectedGroupId(newGroupId) {
      this.reloadClients(newGroupId)
      this.selectedGroup = this.groups.find((group) => {
        return group.id === newGroupId
      })
    }
  },
  methods: {
    getClients() {
      return this.clients.filter(client => {
        return client.checked
      })
    },
    checkAll() {
      this.clients.forEach(client => {
        client.checked = this.checker
      })
      // checker
    },
    reloadClients(groupId) {
       this.$axios.get(`${process.env.VUE_APP_API_HOST}/clients?group_id=${groupId}&start=0&length=9999999`)
        .then(response => {
          this.clients = response.data.data.map(row => {
            return {
              checked: true,
              id: row[0],
              index: row[1],
              name: row[3],
              phone: row[4],
            }
          })
        })
    },
  },
  created() {
    this.$axios.get(`${process.env.VUE_APP_API_HOST}/groups`)
      .then(response => {
        this.groups = response.data
      })
    this.$nextTick(() => {
      this.dataTable = $('#dataTable').DataTable({
          oLanguage: false,
          scrollCollapse: true,
          paging: false,
          scrollY:"600px",
          searching: false,
          processing: false,
          serverSide: false,
          ordering: false
        })
      })
  },
  mounted() {

  }
};
</script>
<style scoped>
</style>
