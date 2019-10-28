var loadDataTable = $("#manufacturers-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addManufacturerUrl = baseUrl + "Manufacturers/add";
    var validateAddNameUrl = baseUrl + "Manufacturers/validate_add_name";
    var editManufacturerUrl = baseUrl + "Manufacturers/edit";
    var validateEditNameUrl = baseUrl + "Manufacturers/validate_edit_name";
    var deleteManufacturerUrl = baseUrl + "Manufacturers/delete/";
    var getActiveManufacturersUrl = baseUrl + "Manufacturers/get_active";
    /* *** **************** *** */

    /* *** Handle add manufacturer *** */
    $("#add-manufacturer-form #name").blur(function() {

        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-manufacturer-form #name-error").empty();
                    $("#add-manufacturer-form #name").removeClass('is-invalid');
                    $("#add-manufacturer-form #name").addClass('is-valid');
                } else {
                    $("#add-manufacturer-form #name").removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#add-manufacturer-form #name-error").val()) {
                            $("#add-manufacturer-form #name-error").empty(); // empty error messages, if there were any
                            $("#add-manufacturer-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#add-manufacturer-form #name").hasClass('is-invalid')) {
                            $("#add-manufacturer-form #name").addClass('is-invalid');
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

    $("#add-manufacturer-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

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
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#add-manufacturer-form #name-error").val()) {
                            $("#add-manufacturer-form #name-error").empty(); // empty error messages, if there were any
                            $("#add-manufacturer-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#add-manufacturer-form #name").hasClass('is-invalid')) {
                            $("#add-manufacturer-form #name").addClass('is-invalid');
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

    $('#add-manufacturer').on('hidden.bs.modal', function () {
        $("#add-manufacturer-form #name-error").empty(); // empty the errors when hiding the modal
        $("#add-manufacturer-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#add-manufacturer-form #name").removeClass('is-invalid');
        $("#add-manufacturer-form #name").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit manufacturer *** */
    $(document).on("click", "#edit-manufacturer-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        $("#edit-manufacturer-form #name").val(name); // set values for what is currently set
        $("#edit-manufacturer-form #modal-submit-edit-manufacturer").data('id', id);
    });

    $("#edit-manufacturer-form #name").blur(function() {
        var id = $("#modal-submit-edit-manufacturer").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-manufacturer-form #name-error").empty();
                    $("#edit-manufacturer-form #name").removeClass('is-invalid');
                    $("#edit-manufacturer-form #name").addClass('is-valid');
                } else {
                    $("#edit-manufacturer-form #name").removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#edit-manufacturer-form #name-error").val()) {
                            $("#edit-manufacturer-form #name-error").empty(); // empty error messages, if there were any
                            $("#edit-manufacturer-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#edit-manufacturer-form #name").hasClass('is-invalid')) {
                            $("#edit-manufacturer-form #name").addClass('is-invalid');
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

    $("#edit-manufacturer-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

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
                    $("#manufacturers").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an manufacturer
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == $("#edit-manufacturer-form #name-error").val()) {
                            $("#edit-manufacturer-form #name-error").empty(); // empty error messages, if there were any
                            $("#edit-manufacturer-form #name-error").append(result["name"]); // display the error messages
                        }
                        if (! $("#edit-manufacturer-form #name").hasClass('is-invalid')) {
                            $("#edit-manufacturer-form #name").addClass('is-invalid');
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

    $('#edit-manufacturer').on('hidden.bs.modal', function () {
        $("#edit-manufacturer-form #name-error").empty(); // empty the errors when hiding the modal
        $("#edit-manufacturer-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#edit-manufacturer-form #name").removeClass('is-invalid');
        $("#edit-manufacturer-form #name").removeClass('is-valid');
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
            dataType: 'json',
            success: function(result) {
                if (result == "success") {
                    $("#delete-manufacturer").modal('hide');
                    $("#manufacturers").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an manufacturer
                } else {
                    if (! result["id"] == "") {
                        if (! result["id"] == $("#delete-manufacturer #id-error").val()) {
                            $("#modal-body-delete-manufacturer #id-error").empty(); // empty error messages, if there were any
                            $("#modal-body-delete-manufacturer #id-error").append(result["id"]); // display the error messages
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

    $('#delete-manufacturer').on('hidden.bs.modal', function () {
        $("#modal-body-delete-manufacturer #id-error").empty(); // empty the errors when hiding the modal
    });
    /* *** ********************* *** */

    /* Prepare manufacturers table */
    if (loadDataTable) {
        $('#manufacturers').DataTable( {
            ajax: {
                url: getActiveManufacturersUrl,
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
