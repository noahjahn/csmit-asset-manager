var loadDataTable = $("#models-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addModelUrl = baseUrl + "Models/add";
    var validateAddNameUrl = baseUrl + "Models/validate_add_name";
    var validateAddManufacturerUrl = baseUrl + "Models/validate_add_manufacturer";
    var editModelUrl = baseUrl + "Models/edit";
    var validateEditNameUrl = baseUrl + "Models/validate_edit_name";
    var validateEditManufacturerUrl = baseUrl + "Models/validate_edit_manufacturer";
    var deleteModelUrl = baseUrl + "Models/delete/";
    var getActiveModelsUrl = baseUrl + "Models/get_active";
    var getActiveManufacturersUrl = baseUrl + "Manufacturers/get_active";
    /* *** **************** *** */

    /* *** Cached Variables *** */
    var manufacturers = [];
    var addManufacturerDropdown;
    var isAddManufacturerFilled = false;
    var isEditManufacturerFilled = false;
    /* *** **************** *** */

    /* *** Prepare Add Manufacturer Dropdown *** */
    $.ajax({
        type: 'GET',
        url: getActiveManufacturersUrl,
        dataType: 'json',
        success: function(result) {
            Object.keys(result).forEach(function(i){
                manufacturers.push(
                    {
                        name: result[i].name,
                        value: result[i].id
                    }
                );
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });

    function compareStrings(str1, str2) {
        str1 = str1.toLowerCase();
        str2 = str2.toLowerCase();
        return (str1 < str2) ? -1 : (str1 > str2) ? 1 : 0;
    }

    $(document).on("click", "#add-model-button", function () {
        if (! isAddManufacturerFilled) {
            manufacturers.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            })

            isAddManufacturerFilled = true;
            $('#add-model-manufacturer').dropdown({
                values: manufacturers
            });
        }
    });

    $(document).on("click", "#edit-model-button", function () {
        if (! isEditManufacturerFilled) {
            manufacturers.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            })

            isEditManufacturerFilled = true;
            $('#edit-model-manufacturer').dropdown({
                values: manufacturers
            });

        }
        var manufacturerId = $(this).data('manufacturer-id');
        $('#edit-model-manufacturer').dropdown('set selected', manufacturerId);

        $('#edit-model').modal('show');
    });
    /* *** ****************************** *** */

    /* *** Handle add model *** */
    var addNameField = $("#add-model-name");
    var addNameError = $("#add-model-name-error");
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

    var addManufacturerField = $('#add-model-form #add-model-manufacturer');
    var addManufacturerError = $("#add-model-form #add-model-manufacturer-error");

    $("#add-model-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var manufacturer = $('#add-model-form .item.active.selected').data('value');

        $.ajax({
            type: 'POST',
            url: addModelUrl,
            dataType: 'json',
            data: $(this).serialize() + "&" + "manufacturer=" + manufacturer, // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-model").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#models").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an model
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

    $('#add-model').on('hidden.bs.modal', function () {
        addNameError.empty(); // empty the errors when hiding the modal
        // $("#add-model-form #manufacturer-error").empty();
        addNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        // $("#add-model .ui.dropdown .text").empty("");
        // $("#add-model .ui.dropdown .menu .active").removeClass('active');
        // $("#add-model .ui.dropdown .menu .selected").removeClass('selected');
        addNameField.removeClass('is-invalid');
        addNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit model *** */
    var editNameField = $("#edit-model-name");
    var editNameError = $("#edit-model-name-error");
    $(document).on("click", ".edit-model-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        editNameField.val(name); // set values for what is currently set
        $("#edit-model-form #modal-submit-edit-model").data('id', id);
    });

    editNameField.blur(function() {
        var id = $("#modal-submit-edit-model").data('id');
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

    $("#edit-model-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-model").data('id');
        var manufacturer = $('#edit-model-form .item.active.selected').data('value');

        $.ajax({
            type: 'POST',
            url: editModelUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize() + "&manufacturer=" + manufacturer, // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    $("#edit-model").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
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

    console.log($('#edit-model-manufacturer.ui.dropdown'));

    $('#edit-model').on('hidden.bs.modal', function () {
        $('.ui.search.dropdown#edit-model-manufacturer').dropdown('remove selected');
        editNameError.empty(); // empty the errors when hiding the modal
        editNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        editNameField.removeClass('is-invalid');
        editNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete model *** */
    $(document).on("click", ".delete-model-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-model").data('id', id);

    });

    $("#modal-submit-delete-model").on("click", function(e) {
        var id = $("#modal-submit-delete-model").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteModelUrl + id,
            success: function(result) {
                $("#models").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

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
