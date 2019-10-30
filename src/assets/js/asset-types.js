var loadDataTable = $("#asset-types-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addAssetTypeUrl = baseUrl + "AssetTypes/add";
    var validateAddNameUrl = baseUrl + "AssetTypes/validate_add_name";
    var validateAddRateUrl = baseUrl + "AssetTypes/validate_add_rate";
    var editAssetTypeUrl = baseUrl + "AssetTypes/edit";
    var validateEditNameUrl = baseUrl + "AssetTypes/validate_edit_name";
    var validateEditRateUrl = baseUrl + "AssetTypes/validate_edit_rate";
    var deleteAssetTypeUrl = baseUrl + "AssetTypes/delete/";
    var getActiveAssetTypesUrl = baseUrl + "AssetTypes/get_active";
    /* *** **************** *** */

    /* *** Handle add asset type *** */
    $("#add-asset-type-form #name").blur(function() {

        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-asset-type-form #name-error").empty();
                    $("#add-asset-type-form #name").removeClass('is-invalid');
                    $("#add-asset-type-form #name").addClass('is-valid');
                } else {
                    $("#add-asset-type-form #name").removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#add-asset-type-form #name-error").val()) {
                            $("#add-asset-type-form #name-error").empty(); // empty error messages, if there were any
                            $("#add-asset-type-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#add-asset-type-form #name").hasClass('is-invalid')) {
                            $("#add-asset-type-form #name").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-asset-type-form #rate").blur(function() {

        $.ajax({
            type: 'POST',
            url: validateAddRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-asset-type-form #rate-error").empty();
                    $("#add-asset-type-form #rate").removeClass('is-invalid');
                    $("#add-asset-type-form #rate").addClass('is-valid');
                } else {
                    $("#add-asset-type-form #rate").removeClass('is-valid');
                    if (! result["rate"] == "") {
                        if (! result["rate"] == $("#add-asset-type-form #rate-error").val()) {
                            $("#add-asset-type-form #rate-error").empty(); // empty error messages, if there were any
                            $("#add-asset-type-form #rate-error").append(result["rate"]); // display the error messages
                        }
                        if (! $("#add-asset-type-form #rate").hasClass('is-invalid')) {
                            $("#add-asset-type-form #rate").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-asset-type-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $.ajax({
            type: 'POST',
            url: addAssetTypeUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#add-asset-type-form #name-error").val()) {
                            $("#add-asset-type-form #name-error").empty(); // empty error messages, if there were any
                            $("#add-asset-type-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#add-asset-type-form #name").hasClass('is-invalid')) {
                            $("#add-asset-type-form #name").addClass('is-invalid');
                        }
                    }
                    if (! result["rate"] == "") {
                        if (! result["rate"] == $("#add-asset-type-form #rate-error").val()) {
                            $("#add-asset-type-form #rate-error").empty(); // empty error messages, if there were any
                            $("#add-asset-type-form #rate-error").append(result["rate"]); // display the error messages
                        }
                        if (! $("#add-asset-type-form #rate").hasClass('is-invalid')) {
                            $("#add-asset-type-form #rate").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#add-asset-type').on('hidden.bs.modal', function () {
        $("#add-asset-type-form #name-error").empty(); // empty the errors when hiding the modal
        $("#add-asset-type-form #rate-error").empty();
        $("#add-asset-type-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#add-asset-type-form #rate").val("");
        $("#add-asset-type-form #name").removeClass('is-invalid');
        $("#add-asset-type-form #name").removeClass('is-valid');
        $("#add-asset-type-form #rate").removeClass('is-invalid');
        $("#add-asset-type-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit asset type *** */
    $(document).on("click", "#edit-asset-type-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var rate = $(this).data('rate');

        $("#edit-asset-type-form #name").val(name); // set values for what is currently set
        $("#edit-asset-type-form #rate").val(rate);
        $("#edit-asset-type-form #modal-submit-edit-asset-type").data('id', id);
    });

    $("#edit-asset-type-form #name").blur(function() {
        var id = $("#modal-submit-edit-asset-type").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-asset-type-form #name-error").empty();
                    $("#edit-asset-type-form #name").removeClass('is-invalid');
                    $("#edit-asset-type-form #name").addClass('is-valid');
                } else {
                    $("#edit-asset-type-form #name").removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#edit-asset-type-form #name-error").val()) {
                            $("#edit-asset-type-form #name-error").empty(); // empty error messages, if there were any
                            $("#edit-asset-type-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#edit-asset-type-form #name").hasClass('is-invalid')) {
                            $("#edit-asset-type-form #name").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-asset-type-form #rate").blur(function() {

        $.ajax({
            type: 'POST',
            url: validateEditRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-asset-type-form #rate-error").empty();
                    $("#edit-asset-type-form #rate").removeClass('is-invalid');
                    $("#edit-asset-type-form #rate").addClass('is-valid');
                } else {
                    $("#edit-asset-type-form #rate").removeClass('is-valid');
                    if (! result["rate"] == "") {
                        if (! result["rate"] == $("#edit-asset-type-form #rate-error").val()) {
                            $("#edit-asset-type-form #rate-error").empty(); // empty error messages, if there were any
                            $("#edit-asset-type-form #rate-error").append(result["rate"]); // display the error messages
                        }
                        if (! $("#edit-asset-type-form #rate").hasClass('is-invalid')) {
                            $("#edit-asset-type-form #rate").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-asset-type-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-asset-type").data('id');

        $.ajax({
            type: 'POST',
            url: editAssetTypeUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-asset-type").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#asset_types").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#edit-asset-type-form #name-error").val()) {
                            $("#edit-asset-type-form #name-error").empty(); // empty error messages, if there were any
                            $("#edit-asset-type-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#edit-asset-type-form #name").hasClass('is-invalid')) {
                            $("#edit-asset-type-form #name").addClass('is-invalid');
                        }
                    }
                    if (! result["rate"] == "") {
                        if (! result["rate"] == $("#edit-asset-type-form #rate-error").val()) {
                            $("#edit-asset-type-form #rate-error").empty(); // empty error messages, if there were any
                            $("#edit-asset-type-form #rate-error").append(result["rate"]); // display the error messages
                        }
                        if (! $("#edit-asset-type-form #rate").hasClass('is-invalid')) {
                            $("#edit-asset-type-form #rate").addClass('is-invalid');
                        }
                    }
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#edit-asset-type').on('hidden.bs.modal', function () {
        $("#edit-asset-type-form #name-error").empty(); // empty the errors when hiding the modal
        $("#edit-asset-type-form #rate-error").empty();
        $("#edit-asset-type-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#edit-asset-type-form #rate").val("");
        $("#edit-asset-type-form #name").removeClass('is-invalid');
        $("#edit-asset-type-form #name").removeClass('is-valid');
        $("#edit-asset-type-form #rate").removeClass('is-invalid');
        $("#edit-asset-type-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete asset type *** */
    $(document).on("click", "#delete-asset-type-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-asset-type").data('id', id);

    });

    $("#modal-submit-delete-asset-type").on("click", function(e) {
        var id = $("#modal-submit-delete-asset-type").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteAssetTypeUrl + id,
            success: function(result) {
                $("#asset_types").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
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
            scrollY:        212,
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
