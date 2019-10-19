var loadDataTable = $("#asset-types-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    console.log(baseUrl);
    var addAssetTypeUrl = baseUrl + "AssetTypes/add";
    var editAssetTypeUrl = baseUrl + "AssetTypes/edit";
    var deleteAssetTypeUrl = baseUrl + "AssetTypes/delete";
    var getActiveAssetTypesUrl = baseUrl + "AssetTypes/get_active";
    /* *** **************** *** */

    /* *** Handle add asset type *** */
    $("#add-asset-type-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $("#name-error").empty(); // empty error messages, if there were any
        $("#rate-error").empty();

        $.ajax({
            type: 'POST',
            url: addAssetTypeUrl,
            dataType: 'JSON',
            data: $(this).serializeArray(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                } else {
                    $("#name-error").append(result["name"]); // display the error messages
                    $("#rate-error").append(result["rate"]);
                }
            },
            error: function(result) {
                console.log(result);
            }
        });
    });

    $('#add-asset-type').on('hidden.bs.modal', function () {
        $("#name-error").empty(); // empty the errors when hiding the modal
        $("#rate-error").empty();
        $("#name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#rate").val("");
    });
    /* *** ********************* *** */

    /* *** Handle edit asset type *** */
    $(document).on("click", "#edit-asset-type-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var rate = $(this).data('rate');

        $("#edit-asset-type-form #name").val(name);
        $("#edit-asset-type-form #rate").val(rate);

        $("#edit-asset-type-form").on("submit", function(e) {
            e.preventDefault(); // prevent modal from closing

            $("#name-error").empty(); // empty error messages, if there were any
            $("#rate-error").empty();

            $.ajax({
                type: 'POST',
                url: editAssetTypeUrl,
                dataType: 'JSON',
                data: $(this).serializeArray(), // get data from the form
                success: function(result) {
                    if (result == "success") {
                        $("#edit-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                        $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully edited an asset type
                    } else {
                        $("#name-error").append(result["name"]); // display the error messages
                        $("#rate-error").append(result["rate"]);
                    }
                },
                error: function(result) {
                    console.log(result);
                }
            });
        });

        $('#edit-asset-type').on('hidden.bs.modal', function () {
            $("#name-error").empty(); // empty the errors when hiding the modal
            $("#rate-error").empty();
            $("#name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
            $("#rate").val("");
        });
    });

    /* *** ********************* *** */

    /* *** Handle delete asset type *** */
    // $("#delete-asset-type").on("submit", function(e) {
    // $(document).on("click", ".table-icon", function () {
    //     var url = $(this).data('url');
    //     var id = $(this).data('id');
    //     var type = $(this).data('type');
    //     var tableId = $(this).data('tableid');
    //
    //     if (type == "DELETE") {
    //         $("#modal-confirm" + "-" + id).click(async function(e) {
    //             $.ajax({
    //                 type: type,
    //                 url: baseUrl + url,
    //                 success: function(result) {
    //                     $("#" + tableId).DataTable().ajax.reload();
    //                 },
    //                 error: function(result) {
    //                 }
    //             });
    //         });
    //     } else if (type == "PUT") {
    //
    //     }
    // });
    /* *** ********************* *** */

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
                { "data": "rate", "render": function (data, type, row) {
                        return "$" + row.rate;
                }
                },
                { "render": function ( data, type, row ) {
                        return '<button id="edit-asset-type-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-rate="' + row.rate + '" data-target="#edit-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button id="delete-asset-type-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        200,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { "orderable": false, "targets": [3,4] },
                { "visible": false, "targets": 0 }
            ],
            dom:
                "<'row'<'col-sm'<'table-title-asset_types'>>fB>" +
    			"<'row'<'col-sm'tr>>",
            buttons: [
                {
                    text: "Add Asset Type",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-asset-type");
                    },
                    className: 'btn-primary'
                }
            ],
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
