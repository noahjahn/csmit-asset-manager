$(document).ready( function () {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    /* Prepare Models table */
    var table = $('#asset-manager').DataTable( {
        ajax: {
            url: baseUrl + "assetmanager/get_active",
            dataSrc: ''
        },
        columns: [
            // { "data": "id" },
            // { "data": "name" },
            { "data": "model" },
            { "data": "manufacturer" },
            { "data": "owner" },
            // { "data": "serial_number" },
            { "data": "type" },
            { "data": "asset_tag" },
            // { "data": "purchase_price" },
            // { "data": "purchase_date" },
            // { "data": "location" },
            { "data": "team" },
            // { "data": "job_number" },
            { "data": "rate" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-model" data-type="POST" data-tableid="models" data-url="AssetManager/edit/' + row.id + '" data-target="#edit-asset"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-model" data-type="DELETE" data-tableid="models" data-url="AssetManager/delete/' + row.id + '" data-target="#delete-asset"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        "order": [[ 1, "asc" ]],
        scrollY:        800,
        paging:         true,
        fixedHeader:    true,
        info:           false,
        dom:
          "<'row'<'col-sm'>fB>" +
          "<'row'<'col-sm'tr>>",
        buttons: [
                    {
                        text: "Add Asset",
                        action: function() {
                            $('#add-asset').modal('show');
                        },
                        init: function (api, node, config) {
                            $(node).removeClass('btn-secondary');
                        },
                        className: 'btn-primary'
                    }
                ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        }
    });

    $('#asset-manager').on('click', 'tr', function () {
      var tr = $(this)
      var row = table.row(this);

      if( row.child.isShown() ) {
          //If This row is already open - close it
          $(tr).css({"background-color":"#303030", "box-shadow":"none"});
        //  $(tr).children().css();
          row.child().find('div').css({"background-color":"#303030", "box-shadow":"none"});
          $('div.slider', row.child()).slideUp( 300,function () {
              row.child.hide();
              tr.removeClass('shown');
          } );

      }
      else {
        //Open the row
        row.child( formatRow(row.data()), 'slider' ).show();
        tr.addClass('shown');
        $('div.slider', row.child()).slideDown(300);
        $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
        $(tr).css("background-color","#3B3B3B");
        $(tr).css("box-shadow","inset 0px 2px 2px black")
      }
    } );
});

function formatRow() {
  return '<div class="slider">' +
  '<table class="child-edit-table table data-table" role="grid"><tr class="child-edit-row row" role="row">' +
  '<td><label>Serial Number</label></td>' +
  '<td></td>' +
  '<td><label>Purchase Price</label></td>' +
  '<td></td>' +
  '<td></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-model" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-manufacturer" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-owner" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-type" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-asset-tag" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-team" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><input id="asset-manager-edit-rate" class="asset-manager-edit-field"></input></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></td>' +
  // '<td class="child-edit-col col-sm" colspan="1" rowspan="1"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></td>' +
  '</tr><tr class="child-edit-row row" role="row">' +
  '<td class="child-edit-col"><input id="asset-manager-edit-serial-number" class="asset-manager-edit-field"></input></td>' +
  '<td class="child-edit-col" colspan="1"></td>' +
  '<td class="child-edit-col"><input id="asset-manager-edit-purchase-price" class="asset-manager-edit-field"></input></td>' +
  '<td class="child-edit-col"><input id="asset-manager-edit-job-number" class="asset-manager-edit-field"></input></td>' +
  '<td class="child-edit-col"></td>' +
  '<td class="child-edit-col" rowspan="2"><input id="asset-manager-edit-notes" class="asset-manager-edit-field"></input></td>' +
  '<td class="child-edit-col"></td>' +
  '<td class="child-edit-col"></td>' +
  '<td class="child-edit-col"></td>' +
  '</tr></table>' +
  '</div>'; //Put child row data here.
}
