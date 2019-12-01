$(document).ready( function () {
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
      }
    } );
});

function formatRow() {
  return '<div class="slider">' +
  '<table><tr>' +
  '<td>Sub-Row Column 1</td>' +
  '<td>Sub-Row Column 2</td>' +
  '<td>Sub-Row Column 3</td>' +
 '</tr><tr>' +
  '<td>Sub-Row Column 4</td>' +
  '<td>Sub-Row Column 5</td>' +
  '<td>Sub-Row Column 6</td>' +
  '</tr></table>' +
  '</div>'; //Put child row data here.
}
