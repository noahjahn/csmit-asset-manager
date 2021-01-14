// Controller function URLs
const createSoftwareAssetsUrl = baseUrl + "SoftwareAssets/create";
const readSoftwareAssetsUrl = baseUrl + "SoftwareAssets/read"
const updateSoftwareAssetsUrl = baseUrl + "SoftwareAssets/update";
const deleteSoftwareAssestUrl = baseUrl + "SoftwareAssets/delete/";

$(document).ready(function () {
    const softwareAssetsDataTable = $('#software-assets').DataTable({
        ajax: {
            url: readSoftwareAssetsUrl,
            dataSrc: '',
        },
        columnDefs: [
           { "responsivePriority": -1, "targets": [8,9] },
           { "width": "10px", "targets": [8,9] },
           { "orderable": false, "targets": [] },
           { "visible": false, "targets": [0] }
       ],
       columns: [
           { "data": "id" },
           { "data": "name" },
           { "data": "username" },
           { "data": "login_url" },
           { "data": "renewal_date" },
           { "data": "renewal_type_id" },
           { "data": "cost" },
           { "data": "owner" },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" id="edit-software-asset-button" data-toggle="modal" data-target="#edit-software-asset" data-type="POST" data-tableid="software-assets" data-id = "' + row.id + '" data-url="SoftwareAssets/update/' + row.id + '"><img class="mini-icon" id="edit-software-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
               }
           },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" id="delete-software-asset-button" data-toggle="modal" data-target="#delete-software-asset" data-type="DELETE" data-tableid="software-assets" data-id = "' + row.id + '"data-url="SoftwareAssets/delete/' + row.id + '"><img class="mini-icon" id="delete-software-asset-button" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
               }
           }
       ],
       "order": [[ 1, "asc" ]],
        scrollY:        $(document).height() - 260,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        dom:
            "<'row'<'col-sm'>fB>" +
            "<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Software Asset",
                action: function() {
                    $('#add-software-asset').modal('show');
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                },
                className: 'btn-primary',
                attr: {
                    id: 'add-software-asset-btn'
                }
            }
        ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        },
        createdRow: function (row, data, index) {
            $(row).addClass('parent-row'); //Add class used for dropdown
        },
        initComplete: function(settings, json) {
            $('#software-assets_filter input').unbind();
            $('#software-assets_filter input').bind('keyup', function(e) {
                if (e.keyCode == 13) {
                    table.search( this.value ).draw();
                }
            });
        }
    });
});
