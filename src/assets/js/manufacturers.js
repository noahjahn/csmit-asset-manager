var loadDataTable = $("#manufacturers-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addManufacturerUrl = baseUrl + "Manufacturers/add";
    var validateAddNameUrl = baseUrl + "Manufacturers/validate_add_name";
    var validateAddRateUrl = baseUrl + "Manufacturers/validate_add_rate";
    var editManufacturerUrl = baseUrl + "Manufacturers/edit";
    var validateEditNameUrl = baseUrl + "Manufacturers/validate_edit_name";
    var validateEditRateUrl = baseUrl + "Manufacturers/validate_edit_rate";
    var deleteManufacturerUrl = baseUrl + "Manufacturers/delete/";
    var getActiveManufacturersUrl = baseUrl + "Manufacturers/get_active";
    /* *** **************** *** */

    /* *** Handle add manufacturer *** */
    $("#add-manufacturer-form #name").blur(function() {
        $("#add-manufacturer-form #name-error").empty(); // empty error messages, if there were any
        $(this).removeClass('is-invalid');
        $(this).removeClass('is-valid');

        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-manufacturer-form #name").addClass('is-valid');
                } else {
                    $("#add-manufacturer-form #name").addClass('is-invalid');
                    $("#add-manufacturer-form #name-error").append(result["name"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-manufacturer-form #rate").blur(function() {
        $("#add-manufacturer-form #rate-error").empty();
        $(this).removeClass('is-invalid');

        $.ajax({
            type: 'POST',
            url: validateAddRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-manufacturer-form #rate").addClass('is-valid');
                } else {
                    $("#add-manufacturer-form #rate").addClass('is-invalid');
                    $("#add-manufacturer-form #rate-error").append(result["rate"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-manufacturer-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $("#add-manufacturer-form #name-error").empty(); // empty error messages, if there were any
        $("#add-manufacturer-form #rate-error").empty();

        $.ajax({
            type: 'POST',
            url: addManufacturerUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-manufacturer").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#manufacturers").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an manufacturer
                } else {
                    $("#add-manufacturer-form #name-error").append(result["name"]); // display the error messages
                    $("#add-manufacturer-form #rate-error").append(result["rate"]);
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#add-manufacturer').on('hidden.bs.modal', function () {
        $("#add-manufacturer-form #name-error").empty(); // empty the errors when hiding the modal
        $("#add-manufacturer-form #rate-error").empty();
        $("#add-manufacturer-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#add-manufacturer-form #rate").val("");
        $("#add-manufacturer-form #name").removeClass('is-invalid');
        $("#add-manufacturer-form #name").removeClass('is-valid');
        $("#add-manufacturer-form #rate").removeClass('is-invalid');
        $("#add-manufacturer-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit manufacturer *** */
    $(document).on("click", "#edit-manufacturer-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var rate = $(this).data('rate');

        $("#edit-manufacturer-form #name").val(name); // set values for what is currently set
        $("#edit-manufacturer-form #rate").val(rate);
        $("#edit-manufacturer-form #modal-submit-edit-manufacturer").data('id', id);
    });

    $("#edit-manufacturer-form #name").blur(function() {
        $("#edit-manufacturer-form #name-error").empty(); // empty error messages, if there were any
        $(this).removeClass('is-invalid');
        $(this).removeClass('is-valid');


        var id = $("#modal-submit-edit-manufacturer").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-manufacturer-form #name").addClass('is-valid');
                } else {
                    $("#edit-manufacturer-form #name").addClass('is-invalid');
                    $("#edit-manufacturer-form #name-error").append(result["name"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-manufacturer-form #rate").blur(function() {
        $("#edit-manufacturer-form #rate-error").empty();
        $(this).removeClass('is-invalid');

        $.ajax({
            type: 'POST',
            url: validateEditRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-manufacturer-form #rate").addClass('is-valid');
                } else {
                    $("#edit-manufacturer-form #rate").addClass('is-invalid');
                    $("#edit-manufacturer-form #rate-error").append(result["rate"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-manufacturer-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $("#edit-manufacturer-form #name-error").empty(); // empty error messages, if there were any
        $("#edit-manufacturer-form #rate-error").empty();

        var id = $("#modal-submit-edit-manufacturer").data('id');

        $.ajax({
            type: 'POST',
            url: editManufacturerUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-manufacturer").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#manufacturers").DataTable().ajax.reload(); // also need to reload the datatable since we successfully edited an manufacturer
                } else {
                    if (result["id"]) {
                        console.log(result["id"]);
                    }
                    $("#edit-manufacturer-form #name-error").append(result["name"]); // display the error messages
                    $("#edit-manufacturer-form #rate-error").append(result["rate"]);
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#edit-manufacturer').on('hidden.bs.modal', function () {
        $("#edit-manufacturer-form #name-error").empty(); // empty the errors when hiding the modal
        $("#edit-manufacturer-form #rate-error").empty();
        $("#edit-manufacturer-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#edit-manufacturer-form #rate").val("");
        $("#edit-manufacturer-form #name").removeClass('is-invalid');
        $("#edit-manufacturer-form #name").removeClass('is-valid');
        $("#edit-manufacturer-form #rate").removeClass('is-invalid');
        $("#edit-manufacturer-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete manufacturer *** */
    $(document).on("click", "#delete-manufacturer-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-manufacturer").data('id', id);

    });

    $("#modal-submit-delete-manufacturer").on("click", function(e) {
        var id = $("#modal-submit-delete-manufacturer").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteManufacturerUrl + id,
            success: function(result) {
                $("#manufacturers").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

    /* Prepare Manufacturers table */
    if (loadDataTable) {
        /* Prepare Manufacturers table */
        $('#manufacturers').DataTable( {
            ajax: {
                url: baseUrl + "Manufacturers/get_active",
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "render": function ( data, type, row ) {
                        return '<button id="edit-manufacturer-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-target="#edit-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button id="delete-manufacturer-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { "orderable": false, "targets": [2,3] },
                { "visible": false, "targets": 0 }
            ],
            dom:
                "<'row'<'col-sm'<'table-title-manufacturers'>>fB>" +
    			"<'row'<'col-sm'tr>>",
            buttons: [
                {
                    text: "Add Manufacturer",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-manufacturer");
                    },
                    className: 'btn-primary'
                }
            ],
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
