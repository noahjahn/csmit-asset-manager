$(document).ready( function () {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    /* Prepare Models table */
    var table = $('#asset-manager').DataTable( {
        ajax: {
            url: baseUrl + "assetmanager/get_active",
            dataSrc: ''
        },
        columnDefs: [
            { className: "asset_manager_model", targets: 0 },
            { className: "asset_manager_manufacturer", targets: 1 },
            { className: "asset_manager_owner", targets: 2 },
            { className: "asset_manager_type", targets: 3 },
            { className: "asset_manager_asset_tag", targets: 4 },
            { className: "asset_manager_team", targets: 5 },
            { className: "asset_manager_rate", targets: 6 },
            { responsivePriority: -1, targets: [7,8] },
            { width: "10px", targets: [7,8] },
            { orderable: false, targets: [7,8] }
        ],
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
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-model" data-type="POST" data-tableid="models" data-url="AssetManager/edit/' + row.id + '" data-target="#edit-asset"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-model" data-type="DELETE" data-tableid="models" data-url="AssetManager/delete/' + row.id + '" data-target="#delete-asset"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
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
        },
        createdRow: function (row, data, index) {
          $(row).addClass('parent-row');
        }
    });

    $('#asset-manager').on('click', '.parent-row', function () {
      var tr = $(this)
      var row = table.row(this);


      if( row.child.isShown() ) { //If This detail row is already open - close it

          $(tr).css({"background-color":"#303030", "box-shadow":"none"});
        //  $(tr).children().css();
          row.child().find('div').css({"background-color":"#303030", "box-shadow":"none"});
          $('div.slider', row.child()).slideUp( 300,function () {
              row.child.hide();
              tr.removeClass('shown');
          } );

      }
      else { //Open the details row

        row.child( formatRow(row.data()), 'slider' ).show();
        tr.addClass('shown');
        $('div.slider', row.child()).slideDown(300);
        $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
        $(tr).css("background-color","#3B3B3B");
        $(tr).css("box-shadow","inset 0px 2px 2px black")
      }
    } );
});

function formatRow() { //Put child row data here.
  return '<div class="slider">' +
  '<table class="edit-table row">' +
  '<tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Serial Number</label> </div>' +
      '<div>  <p>HIUH234JFDUF882IFJ</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Price</label> </div>' +
      '<div>  <p>$125</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Job Number</label> </div>' +
      '<div>  <p>BRD12345</p></div>' +
    '</td>' +
  '<td class="edit-col" rowspan="2">' +
      '<div>  <label>Notes</label> </div>' +
      '<div>  <p>Some random notes about it</p></div>' +
    '</td>' +
  '</tr><tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Location</label> </div>'+
      '<div>  <p>Site 4</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Date</label> </div>' +
      '<div>  <p>10-23-19</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Last Updated</label> </div>' +
      '<div>  <p>00:00:00</p></div>' +
    '</td>' +
  '</tr></table>' +
  '</div>';
}

$(window).resize(function () {
  $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
});
//
// '<div class="slider">' +
// '<table class="edit-table row">' +
// '<tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Serial Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-serial-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Price</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-price" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Job Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-job-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col" rowspan="2">' +
//     '<div>  <label>Notes</label> </div>' +
//     '<div>  <textarea rows="6" class="asset-manager-edit-notes asset-manager-edit-field"></textarea> </div>' +
//   '</td>' +
// '</tr><tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Location</label> </div>'+
//     '<div>  <input id="asset-manager-edit-location" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Date</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-date" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Last Updated</label> </div>' +
//     '<div>  <input id="asset-manager-edit-last-updated" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '</tr></table>' +
// '</div>';


// $(tr).find('.asset_manager_model').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_manufacturer').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_owner').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_type').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_asset_tag').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_team').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_rate').html('<input class="in-row-edit form-control"></input>');


// $(tr).find('.asset_manager_model').html('');
// $(tr).find('.asset_manager_manufacturer').html('');
// $(tr).find('.asset_manager_owner').html('');
// $(tr).find('.asset_manager_type').html('');
// $(tr).find('.asset_manager_asset_tag').html('');
// $(tr).find('.asset_manager_team').html('');
// $(tr).find('.asset_manager_rate').html('');
