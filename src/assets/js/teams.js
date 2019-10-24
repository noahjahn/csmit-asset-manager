var loadDataTable = $("#teams-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addTeamUrl = baseUrl + "Teams/add";
    var validateAddNameUrl = baseUrl + "Teams/validate_add_name";
    var validateAddRateUrl = baseUrl + "Teams/validate_add_rate";
    var editTeamUrl = baseUrl + "Teams/edit";
    var validateEditNameUrl = baseUrl + "Teams/validate_edit_name";
    var validateEditRateUrl = baseUrl + "Teams/validate_edit_rate";
    var deleteTeamUrl = baseUrl + "Teams/delete/";
    var getActiveTeamsUrl = baseUrl + "Teams/get_active";
    /* *** **************** *** */

    /* *** Handle add team *** */
    $("#add-team-form #name").blur(function() {
        $("#add-team-form #name-error").empty(); // empty error messages, if there were any
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
                    $("#add-team-form #name").addClass('is-valid');
                } else {
                    $("#add-team-form #name").addClass('is-invalid');
                    $("#add-team-form #name-error").append(result["name"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-team-form #rate").blur(function() {
        $("#add-team-form #rate-error").empty();
        $(this).removeClass('is-invalid');

        $.ajax({
            type: 'POST',
            url: validateAddRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#add-team-form #rate").addClass('is-valid');
                } else {
                    $("#add-team-form #rate").addClass('is-invalid');
                    $("#add-team-form #rate-error").append(result["rate"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#add-team-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $("#add-team-form #name-error").empty(); // empty error messages, if there were any
        $("#add-team-form #rate-error").empty();

        $.ajax({
            type: 'POST',
            url: addTeamUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-team").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#teams").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an team
                } else {
                    $("#add-team-form #name-error").append(result["name"]); // display the error messages
                    $("#add-team-form #rate-error").append(result["rate"]);
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#add-team').on('hidden.bs.modal', function () {
        $("#add-team-form #name-error").empty(); // empty the errors when hiding the modal
        $("#add-team-form #rate-error").empty();
        $("#add-team-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#add-team-form #rate").val("");
        $("#add-team-form #name").removeClass('is-invalid');
        $("#add-team-form #name").removeClass('is-valid');
        $("#add-team-form #rate").removeClass('is-invalid');
        $("#add-team-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit team *** */
    $(document).on("click", "#edit-team-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var rate = $(this).data('rate');

        $("#edit-team-form #name").val(name); // set values for what is currently set
        $("#edit-team-form #rate").val(rate);
        $("#edit-team-form #modal-submit-edit-team").data('id', id);
    });

    $("#edit-team-form #name").blur(function() {
        $("#edit-team-form #name-error").empty(); // empty error messages, if there were any
        $(this).removeClass('is-invalid');
        $(this).removeClass('is-valid');


        var id = $("#modal-submit-edit-team").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-team-form #name").addClass('is-valid');
                } else {
                    $("#edit-team-form #name").addClass('is-invalid');
                    $("#edit-team-form #name-error").append(result["name"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-team-form #rate").blur(function() {
        $("#edit-team-form #rate-error").empty();
        $(this).removeClass('is-invalid');

        $.ajax({
            type: 'POST',
            url: validateEditRateUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-team-form #rate").addClass('is-valid');
                } else {
                    $("#edit-team-form #rate").addClass('is-invalid');
                    $("#edit-team-form #rate-error").append(result["rate"]); // display the error messages
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $("#edit-team-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $("#edit-team-form #name-error").empty(); // empty error messages, if there were any
        $("#edit-team-form #rate-error").empty();

        var id = $("#modal-submit-edit-team").data('id');

        $.ajax({
            type: 'POST',
            url: editTeamUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            success: function(result) {
                if (result == "success") {
                    $("#edit-team").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#teams").DataTable().ajax.reload(); // also need to reload the datatable since we successfully edited an team
                } else {
                    if (result["id"]) {
                        console.log(result["id"]);
                    }
                    $("#edit-team-form #name-error").append(result["name"]); // display the error messages
                    $("#edit-team-form #rate-error").append(result["rate"]);
                }
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#edit-team').on('hidden.bs.modal', function () {
        $("#edit-team-form #name-error").empty(); // empty the errors when hiding the modal
        $("#edit-team-form #rate-error").empty();
        $("#edit-team-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        $("#edit-team-form #rate").val("");
        $("#edit-team-form #name").removeClass('is-invalid');
        $("#edit-team-form #name").removeClass('is-valid');
        $("#edit-team-form #rate").removeClass('is-invalid');
        $("#edit-team-form #rate").removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete team *** */
    $(document).on("click", "#delete-team-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-team").data('id', id);

    });

    $("#modal-submit-delete-team").on("click", function(e) {
        var id = $("#modal-submit-delete-team").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteTeamUrl + id,
            success: function(result) {
                $("#teams").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

    /* Prepare Teams table */
    if (loadDataTable) {
        /* Prepare Teams table */
        $('#teams').DataTable( {
            ajax: {
                url: baseUrl + "Teams/get_active",
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "render": function ( data, type, row ) {
                        return '<button id="edit-team-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-target="#edit-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button id="delete-team-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        200,
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { "orderable": false, "targets": [2,3] },
                { "visible": false, "targets": 0 }
            ],
            dom:
                "<'row'<'col-sm'<'table-title-teams'>>fB>" +
    			"<'row'<'col-sm'tr>>",
            buttons: [
                {
                    text: "Add Team",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-team");
                    },
                    className: 'btn-primary'
                }
            ],
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
