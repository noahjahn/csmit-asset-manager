$(document).ready( function () {
    /* Prepare Models table */
    $('#asset_manager').DataTable( {
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
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-model" data-type="POST" data-tableid="models" data-url="Models/edit/' + row.id + '" data-target="#add-edit-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-model" data-type="DELETE" data-tableid="models" data-url="Models/delete/' + row.id + '" data-target="#delete-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        "order": [[ 1, "asc" ]],
        scrollY:        200,
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
});



/* *** Handle initial tab loading *** */
// $(document).ready(function() {
//         $('#asset_manager').DataTable({
//             responsive: true,
//         scrollY:        "70vh",
//         paging:         false,
//         fixedHeader:    true,
//         info:           false,
//         columns: [
//             null,
//             null,
//             null,
//             null,
//             null,
//             null,
//             null,
//             {
//                 width: "16px"
//             },
//             {
//                 width: "10px"
//             },
//         ],
//         columnDefs: [
//             {
//                 orderable: false,
//                 targets: [
//                     7,
//                     8
//                 ]
//             }
//         ],
//         dom:
//             "<'row'<'col-sm'>fB>" +
//             "<'row'<'col-sm'tr>>",
//         buttons: [
//             {
//                 text: "Add Asset",
//                 action: function() {
//                     $('#add-asset').modal('show');
//                 },
//                 init: function (api, node, config) {
//                     $(node).removeClass('btn-secondary');
//                 },
//                 className: 'btn-primary'
//             }
//         ],
//         language: {
//         search: "",
//         searchPlaceholder: "Search..."
//         }
//         });
// });
