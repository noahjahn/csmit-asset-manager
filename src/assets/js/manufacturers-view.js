var loadDataTable = $("#manufacturers-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveManufacturersUrl = baseUrl + "Manufacturers/get_active";
    /* *** **************** *** */

    /* Prepare manufacturers table */
    if (loadDataTable) {
        $('#manufacturers').DataTable( {
            ajax: {
                url: getActiveManufacturersUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" }
            ],
            responsive:     true,
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md-3'<'table-title-manufacturers'>><'col-md-9 pr-0 pt-0 pb-0'f>>" +
    			"<'row'<'col-md'tr>>",
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-manufacturers").html('<h5 class="pt-3">Manufacturers</h5>');
        $("#manufacturers_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
