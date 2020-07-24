var loadDataTable = $("#asset-types-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveAssetTypesUrl = baseUrl + "AssetTypes/get_active";
    /* *** **************** *** */

    /* Prepare Asset Types table */
    if (loadDataTable) {
        $('#asset_types').DataTable( {
            ajax: {
                url: getActiveAssetTypesUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
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
                "<'row'<'col-md-3'<'table-title-asset_types'>><'col-md-9 pr-0 pt-0 pb-0'f>>" +
    			"<'row'<'col-md'tr>>",
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-asset_types").html('<h5 class="pt-3">Asset Types</h5>');
        $("#asset_types_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
