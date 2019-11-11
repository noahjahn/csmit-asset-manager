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
    var addNameField = $("#add-manufacturer-form #add-manufacturer-name");
    var addNameError = $("#add-manufacturer-form #add-manufacturer-name-error");

    addNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addNameError.empty();
                    addNameField.removeClass('is-invalid');
                    addNameField.addClass('is-valid');
                } else {
                    addNameField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == addNameError.val()) {
                            addNameError.empty(); // empty error messages, if there were any
                            addNameError.append(result["name"]); // display the error messages
                        }
                        if (! addNameField.hasClass('is-invalid')) {
                            addNameField.addClass('is-invalid');
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
                        if (! result["name"] == addNameError.val()) {
                            addNameError.empty(); // empty error messages, if there were any
                            addNameError.append(result["name"]); // display the error messages
                        }
                        if (! addNameField.hasClass('is-invalid')) {
                            addNameField.addClass('is-invalid');
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
        addNameError.empty(); // empty the errors when hiding the modal
        addNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        addNameField.removeClass('is-invalid');
        addNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit manufacturer *** */
    var editNameField = $("#edit-manufacturer-form #edit-manufacturer-name");
    var editNameError = $("#edit-manufacturer-form #edit-manufacturer-name-error");

    $(document).on("click", ".edit-manufacturer-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        editNameField.val(name); // set values for what is currently set
        $("#edit-manufacturer-form #modal-submit-edit-manufacturer").data('id', id);
    });

    editNameField.blur(function() {
        var id = $("#modal-submit-edit-manufacturer").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editNameError.empty();
                    editNameField.removeClass('is-invalid');
                    editNameField.addClass('is-valid');
                } else {
                    editNameField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == editNameError.val()) {
                            editNameError.empty(); // empty error messages, if there were any
                            editNameError.append(result["name"]); // display the error messages
                        }
                        if (! editNameField.hasClass('is-invalid')) {
                            editNameField.addClass('is-invalid');
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
            async: true,
            success: function(result) {
                if (result == "success") {
                    $("#edit-manufacturer").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#manufacturers").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an manufacturer
                    $("#models").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an model
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == editNameError.val()) {
                            editNameError.empty(); // empty error messages, if there were any
                            editNameError.append(result["name"]); // display the error messages
                        }
                        if (! editNameField.hasClass('is-invalid')) {
                            editNameField.addClass('is-invalid');
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
        editNameError.empty(); // empty the errors when hiding the modal
        editNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        editNameField.removeClass('is-invalid');
        editNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete manufacturer *** */
    $(document).on("click", ".delete-manufacturer-button", function () {
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
                        return '<button class="table-icon edit-manufacturer-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-target="#edit-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-manufacturer-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            responsive:     true,
            scrollY:        212,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { responsivePriority: -1, targets: [2,3] },
                { width: "20px", targets: [2,3] },
                { orderable: false, targets: [2,3] },
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md-3'<'table-title-manufacturers'>><'col-md-9 pr-0 pt-0 pb-0'Bf>>" +
    			"<'row'<'col-md'tr>>",
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
