var loadDataTable = $("#models-script").attr('data-load-datatable');

$(document).ready(function() {
    /* Prepare models table */
    if (loadDataTable) {
        var modelsTable = $('#models').DataTable( {
            ajax: {
                url: getActiveModelsUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "data": "manufacturer" },
                { "render": function ( data, type, row ) {
                    // if ()
                        return '<button id="edit-model-button" class="table-icon edit-model-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-manufacturer-id="' + row.manufacturersid + '" data-target="#edit-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-model-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            responsive:     true,
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            autoWidth:      false,
            columnDefs: [
                { responsivePriority: -1, targets: [3,4] },
                { width: "20px", targets: [3,4] },
                { orderable: false, targets: [3,4] },
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md-3'<'table-title-models'>><'col-md-9 pr-0 pt-0 pb-0'Bf>>" +
    			"<'row'<'col-md'tr>>",
            buttons: [
                {
                    text: "Add Model",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("id", "add-model-button");
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-model");
                    },
                    className: 'btn-primary'
                }
            ],
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-models").html('<h5 class="pt-3">Models</h5>');
        $("#models_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */
});
