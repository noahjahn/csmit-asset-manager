var loadDataTable = $("#models-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveModelsUrl = baseUrl + "Models/get_active";
    /* *** **************** *** */

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
                { "data": "type" },
            ],
            responsive:     true,
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            autoWidth:      false,
            columnDefs: [
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md-3'<'table-title-models'>><'col-md-9 pr-0 pt-0 pb-0'f>>" +
    			"<'row'<'col-md'tr>>",
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
