var loadDataTable = $("#teams-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addTeamUrl = baseUrl + "Teams/add";
    var validateAddNameUrl = baseUrl + "Teams/validate_add_name";
    var editTeamUrl = baseUrl + "Teams/edit";
    var validateEditNameUrl = baseUrl + "Teams/validate_edit_name";
    var deleteTeamUrl = baseUrl + "Teams/delete/";
    var getActiveTeamsUrl = baseUrl + "Teams/get_active";
    /* *** **************** *** */

    /* *** Handle add team *** */
    var addTeamField = $("#add-team-form #add-team-name");
    var addTeamError = $("#add-team-form #add-team-name-error");

    addTeamField.blur(function() {

        $.ajax({
            type: 'POST',
            url: validateAddNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addTeamError.empty();
                    addTeamField.removeClass('is-invalid');
                    addTeamField.addClass('is-valid');
                } else {
                    addTeamField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == addTeamError.val()) {
                            addTeamError.empty(); // empty error messages, if there were any
                            addTeamError.append(result["name"]); // display the error messages
                        }
                        if (! addTeamField.hasClass('is-invalid')) {
                            addTeamField.addClass('is-invalid');
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

    $("#add-team-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

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
                    if (! result["name"] == "") {
                        if (! result["name"] == addTeamError.val()) {
                            addTeamError.empty(); // empty error messages, if there were any
                            addTeamError.append(result["name"]); // display the error messages
                        }
                        if (! addTeamField.hasClass('is-invalid')) {
                            addTeamField.addClass('is-invalid');
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

    $('#add-team').on('hidden.bs.modal', function () {
        addTeamError.empty(); // empty the errors when hiding the modal
        addTeamField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        addTeamField.removeClass('is-invalid');
        addTeamField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit team *** */
    var editTeamField = $("#edit-team-form #edit-team-name");
    var editTeamError = $("#edit-team-form #edit-team-name-error");

    $(document).on("click", ".edit-team-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');

        editTeamField.val(name); // set values for what is currently set
        $("#edit-team-form #modal-submit-edit-team").data('id', id);
    });

    editTeamField.blur(function() {
        var id = $("#modal-submit-edit-team").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditNameUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editTeamError.empty();
                    editTeamField.removeClass('is-invalid');
                    editTeamField.addClass('is-valid');
                } else {
                    editTeamField.removeClass('is-valid');
                    if (! result["name"] == "") {
                        if (! result["name"] == editTeamError.val()) {
                            editTeamError.empty(); // empty error messages, if there were any
                            editTeamError.append(result["name"]); // display the error messages
                        }
                        if (! editTeamField.hasClass('is-invalid')) {
                            editTeamField.addClass('is-invalid');
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

    $("#edit-team-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-team").data('id');

        $.ajax({
            type: 'POST',
            url: editTeamUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    $("#edit-team").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#teams").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an team
                } else {
                    if (! result["name"] == "") {
                        if (! result["name"] == editTeamError.val()) {
                            editTeamError.empty(); // empty error messages, if there were any
                            editTeamError.append(result["name"]); // display the error messages
                        }
                        if (! editTeamField.hasClass('is-invalid')) {
                            editTeamField.addClass('is-invalid');
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

    $('#edit-team').on('hidden.bs.modal', function () {
        editTeamError.empty(); // empty the errors when hiding the modal
        editTeamField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
        editTeamField.removeClass('is-invalid');
        editTeamField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete team *** */
    $(document).on("click", ".delete-team-button", function () {
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

    /* Prepare teams table */
    if (loadDataTable) {
        $('#teams').DataTable( {
            ajax: {
                url: getActiveTeamsUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon edit-team-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-target="#edit-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-team-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
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
                "<'row'<'col-md-3'<'table-title-teams'>><'col-md-9 pr-0 pt-0 pb-0'Bf>>" +
    			"<'row'<'col-md'tr>>",
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
