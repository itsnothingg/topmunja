export default ($, vue) => {
  $.fn.dataTable.defaults.processing = true
  $.fn.dataTable.defaults.serverSide = true
  $.fn.dataTable.defaults.ordering = false
  $.fn.dataTable.defaults.columnDefs = [
      {
        'targets': 0,
        'className': 'text-center',
        'render': (data, type, full, meta) => {
          return '<input type="checkbox" name="id[]" value="' + $('<div/>').text(data).html() + '">';
        }
      }
    ]
  $.fn.dataTable.defaults.oLanguage.sLengthMenu = `_MENU_ 개씩 보기`
  $.fn.dataTable.defaults.oLanguage.sProcessing = `<button type="button" disabled class="btn btn-default ml-4" v-if="loading">
        <i class="fa fa-circle-o-notch fa-spin mr-2"></i>데이터를 가져오는 중..
      </button>`
  $.fn.dataTable.defaults.oLanguage.sInfo = `_TOTAL_ 중 _START_부터 _END_까지 보는 중`
  $.fn.dataTable.defaults.oLanguage.sEmptyTable = `데이터가 없습니다`
  $.fn.dataTable.defaults.oLanguage.sInfoEmpty = `0 중 0부터 0까지 보는 중`
  $.fn.dataTable.defaults.oLanguage.oPaginate.sPrevious = `이전`
  $.fn.dataTable.defaults.oLanguage.oPaginate.sNext = `다음`

  $("body").off("processing.dt", '#dataTable')
  $("body").off("change", '#dataTable input[type=checkbox]')
  $("body").off("click", '#removeHandler')
  $("body").off("click", '#dataTable input[type=checkbox]')
  $("body").off("click", '#dataTable tr:has(td)')

  $('#dataTable').on('processing.dt', ( e, settings, processing ) => {
    $('#removeHandler').css('opacity', '0')
  })

  let getSelectedIds = () => {
    return $('#dataTable input[type=checkbox]:checkbox:checked').map(function () {
      return this.value
    }).get();
  }
  $('body').on('change', '#dataTable input[type=checkbox]', (e) => {
    let selectedIds = getSelectedIds()
    if (selectedIds.length) {
      $('#removeHandler').css('opacity', '1')
    } else {
      $('#removeHandler').css('opacity', '0')
    }
  });

  $('body').on('click', '#removeHandler', (e) => {
    vue.onDataTableRemoved(getSelectedIds())
  })
  $('#removeHandler').css('opacity', '0')

  $('body').on('click', '#dataTable input[type=checkbox]', (e) => {
     e.stopPropagation()
  })

  $('body').on('click', '#dataTable tr:has(td)', (e) => {
    let $this = $(e.currentTarget);
    let rowId = $this.find('input[type=checkbox]').val()
    vue.onDataTableClicked(rowId)
  
  })

};