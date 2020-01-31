var loadDataTable = $("#teams-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveTeamsUrl = baseUrl + "Teams/get_active";
    /* *** **************** *** */

    /* Prepare teams table */
    if (loadDataTable) {
        $('#teams').DataTable( {
            ajax: {
                url: getActiveTeamsUrl,
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
                "<'row'<'col-md-3'<'table-title-teams'>><'col-md-9 pr-0 pt-0 pb-0'f>>" +
    			"<'row'<'col-md'tr>>",
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-teams").html('<h5 class="pt-3">Teams</h5>');
        $("#teams_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
