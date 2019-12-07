var loadDataTable = $("#roles-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addRoleUrl = baseUrl + "Roles/add";
    var validateAddNameUrl = baseUrl + "Roles/validate_add_name";

    var editRoleUrl = baseUrl + "Roles/edit";
    var validateEditNameUrl = baseUrl + "Roles/validate_edit_name";

    var deleteRoleUrl = baseUrl + "Roles/delete/";
    var getActiveRolesUrl = baseUrl + "Roles/get_active";
    /* *** **************** *** */

    /* *** Handle add role *** */
    var addNameField = $('#add-role-form #add-role-name');
    var addNameError = $("#add-role-form #add-role-name-error");
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

    var addDashboardError = $("#add-role-form #add-role-dashboard-error");
    var addAssetManagerError = $("#add-role-form #add-role-asset-manager-error");
    var addReportsError = $("#add-role-form #add-role-reports-error");
    var addAssetGroupsError = $("#add-role-form #add-role-asset-groups-error");
    var addUsersError = $("#add-role-form #add-role-users-error");
    var addRolesError = $("#add-role-form #add-role-roles-error");
    var addLoginPhotosError = $("#add-role-form #add-role-login-photos-error");

    $("#add-role-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        $.ajax({
            type: 'POST',
            url: addRoleUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-role").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#roles").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an role
                } else {
                    if (! result["name"] == "") {
                        addNameField.removeClass('is-valid');
                        if (! result["name"] == addNameError.val()) {
                            addNameError.empty(); // empty error messages, if there were any
                            addNameError.append(result["name"]); // display the error messages
                        }
                        if (! addNameField.hasClass('is-invalid')) {
                            addNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["dashboard"] == "") {
                        if (! result["dashboard"] == addDashboardError.val()) {
                            addDashboardError.empty(); // empty error messages, if there were any
                            addDashboardError.append(result["dashboard"]); // display the error messages
                        }
                    }
                    if (! result["asset_manager"] == "") {
                        if (! result["asset_manager"] == addAssetManagerError.val()) {
                            addAssetManagerError.empty(); // empty error messages, if there were any
                            addAssetManagerError.append(result["asset_manager"]); // display the error messages
                        }
                    }
                    if (! result["reports"] == "") {
                        if (! result["reports"] == addReportsError.val()) {
                            addReportsError.empty(); // empty error messages, if there were any
                            addReportsError.append(result["reports"]); // display the error messages
                        }
                    }
                    if (! result["asset_groups"] == "") {
                        if (! result["asset_groups"] == addAssetGroupsError.val()) {
                            addAssetGroupsError.empty(); // empty error messages, if there were any
                            addAssetGroupsError.append(result["asset_groups"]); // display the error messages
                        }
                    }
                    if (! result["users"] == "") {
                        if (! result["users"] == addUsersError.val()) {
                            addUsersError.empty(); // empty error messages, if there were any
                            addUsersError.append(result["users"]); // display the error messages
                        }
                    }
                    if (! result["roles"] == "") {
                        if (! result["roles"] == addRolesError.val()) {
                            addRolesError.empty(); // empty error messages, if there were any
                            addRolesError.append(result["roles"]); // display the error messages
                        }
                    }
                    if (! result["login_photos"] == "") {
                        if (! result["login_photos"] == addLoginPhotosError.val()) {
                            addLoginPhotosError.empty(); // empty error messages, if there were any
                            addLoginPhotosError.append(result["login_photos"]); // display the error messages
                        }
                    }
                }
            },
            error: function(result) {
                console.log(result);
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $('#add-role').on('hidden.bs.modal', function () {
        addNameError.empty(); // empty the errors when hiding the modal
        addDashboardError.empty();
        addAssetManagerError.empty();
        addReportsError.empty();
        addAssetGroupsError.empty();
        addUsersError.empty();
        addRolesError.empty();
        addLoginPhotosError.empty();
        addNameField.val(""); // set the value to of the forms to have nothing in them, just in case the role left some data there without submitting
        addNameField.removeClass('is-invalid');
        addNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit role *** */
    var editNameField = $('#edit-role-form #edit-role-name');
    var editNameError = $('#edit-role-form #edit-role-name-error');
    var editDashboardRead = $('#edit-role-dashboard-read');
    var editDashboardWrite = $('#edit-role-dashboard-write');
    var editDashboardNone = $('#edit-role-dashboard-none');
    var editAssetManagerRead = $('#edit-role-asset-manager-read');
    var editAssetManagerWrite = $('#edit-role-asset-manager-write');
    var editAssetManagerNone = $('#edit-role-asset-manager-none');
    var editReportsRead = $('#edit-role-reports-read');
    var editReportsWrite = $('#edit-role-reports-write');
    var editReportsNone = $('#edit-role-reports-none');
    var editAssetGroupsRead = $('#edit-role-asset-groups-read');
    var editAssetGroupsWrite = $('#edit-role-asset-groups-write');
    var editAssetGroupsNone = $('#edit-role-asset-groups-none');
    var editUsersRead = $('#edit-role-users-read');
    var editUsersWrite = $('#edit-role-users-write');
    var editUsersNone = $('#edit-role-users-none');
    var editRolesRead = $('#edit-role-roles-read');
    var editRolesWrite = $('#edit-role-roles-write');
    var editRolesNone = $('#edit-role-roles-none');
    var editLoginPhotosRead = $('#edit-role-login-photos-read');
    var editLoginPhotosWrite = $('#edit-role-login-photos-write');
    var editLoginPhotosNone = $('#edit-role-login-photos-none');


    $(document).on("click", ".edit-role-button", function () {
        var id = $(this).data('id');
        var name = $(this).data('name');
        var dashboard = $(this).data('dashboard');
        var assetManager = $(this).data('asset_manager');
        var reports = $(this).data('reports');
        var assetGroups = $(this).data('asset_groups');
        var users = $(this).data('users');
        var roles = $(this).data('roles');
        var loginPhotos = $(this).data('login_photos');

        editNameField.val(name); // set values for what is currently set
        switch (dashboard) {
            case 4:
                editDashboardRead.attr("checked", "");
            break;
            case 6:
                editDashboardWrite.attr("checked", "");
            break;
            default:
                editDashboardNone.attr("checked", "");
        }
        switch (assetManager) {
            case 4:
                editAssetManagerRead.attr("checked", "");
            break;
            case 6:
                editAssetManagerWrite.attr("checked", "");
            break;
            default:
                editAssetManagerNone.attr("checked", "");
        }
        switch (reports) {
            case 4:
                editReportsRead.attr("checked", "");
            break;
            case 6:
                editReportsWrite.attr("checked", "");
            break;
            default:
                editReportsNone.attr("checked", "");
        }
        switch (assetGroups) {
            case 4:
                editAssetGroupsRead.attr("checked", "");
            break;
            case 6:
                editAssetGroupsWrite.attr("checked", "");
            break;
            default:
                editAssetGroupsNone.attr("checked", "");
        }
        switch (users) {
            case 4:
                editUsersRead.attr("checked", "");
            break;
            case 6:
                editUsersWrite.attr("checked", "");
            break;
            default:
                editUsersNone.attr("checked", "");
        }
        switch (roles) {
            case 4:
                editRolesRead.attr("checked", "");
            break;
            case 6:
                editRolesWrite.attr("checked", "");
            break;
            default:
                editRolesNone.attr("checked", "");
        }
        switch (loginPhotos) {
            case 4:
                editLoginPhotosRead.attr("checked", "");
            break;
            case 6:
                editLoginPhotosWrite.attr("checked", "");
            break;
            default:
                editLoginPhotosNone.attr("checked", "");
        }
        $("#edit-role-form #modal-submit-edit-role").data('id', id);
    });

    editNameField.blur(function() {
        var id = $("#modal-submit-edit-role").data('id');

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

    var editDashboardError = $("#edit-role-form #edit-role-dashboard-error");
    var editAssetManagerError = $("#edit-role-form #edit-role-asset-manager-error");
    var editReportsError = $("#edit-role-form #edit-role-reports-error");
    var editAssetGroupsError = $("#edit-role-form #edit-role-asset-groups-error");
    var editUsersError = $("#edit-role-form #edit-role-users-error");
    var editRolesError = $("#edit-role-form #edit-role-roles-error");
    var editLoginPhotosError = $("#edit-role-form #edit-role-login-photos-error");

    $("#edit-role-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-role").data('id');

        $.ajax({
            type: 'POST',
            url: editRoleUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#edit-role").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#roles").DataTable().ajax.reload(); // also need to reload the datatable since we successfully edit an role
                } else {
                    if (! result["name"] == "") {
                        editNameField.removeClass('is-valid');
                        if (! result["name"] == editNameError.val()) {
                            editNameError.empty(); // empty error messages, if there were any
                            editNameError.append(result["name"]); // display the error messages
                        }
                        if (! editNameField.hasClass('is-invalid')) {
                            editNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["dashboard"] == "") {
                        if (! result["dashboard"] == editDashboardError.val()) {
                            editDashboardError.empty(); // empty error messages, if there were any
                            editDashboardError.append(result["dashboard"]); // display the error messages
                        }
                    }
                    if (! result["asset_manager"] == "") {
                        if (! result["asset_manager"] == editAssetManagerError.val()) {
                            editAssetManagerError.empty(); // empty error messages, if there were any
                            editAssetManagerError.append(result["asset_manager"]); // display the error messages
                        }
                    }
                    if (! result["reports"] == "") {
                        if (! result["reports"] == editReportsError.val()) {
                            editReportsError.empty(); // empty error messages, if there were any
                            editReportsError.append(result["reports"]); // display the error messages
                        }
                    }
                    if (! result["asset_groups"] == "") {
                        if (! result["asset_groups"] == editAssetGroupsError.val()) {
                            editAssetGroupsError.empty(); // empty error messages, if there were any
                            editAssetGroupsError.append(result["asset_groups"]); // display the error messages
                        }
                    }
                    if (! result["users"] == "") {
                        if (! result["users"] == editUsersError.val()) {
                            editUsersError.empty(); // empty error messages, if there were any
                            editUsersError.append(result["users"]); // display the error messages
                        }
                    }
                    if (! result["roles"] == "") {
                        if (! result["roles"] == editRolesError.val()) {
                            editRolesError.empty(); // empty error messages, if there were any
                            editRolesError.append(result["roles"]); // display the error messages
                        }
                    }
                    if (! result["login_photos"] == "") {
                        if (! result["login_photos"] == editLoginPhotosError.val()) {
                            editLoginPhotosError.empty(); // empty error messages, if there were any
                            editLoginPhotosError.append(result["login_photos"]); // display the error messages
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

    $('#edit-role').on('hidden.bs.modal', function () {
        editNameError.empty(); // empty the errors when hiding the modal
        editDashboardError.empty();
        editAssetManagerError.empty();
        editReportsError.empty();
        editAssetGroupsError.empty();
        editUsersError.empty();
        editRolesError.empty();
        editLoginPhotosError.empty();
        editNameField.val(""); // set the value to of the forms to have nothing in them, just in case the role left some data there without submitting
        editNameField.removeClass('is-invalid');
        editNameField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle delete role *** */
    $(document).on("click", ".delete-role-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-role").data('id', id);

    });

    $("#modal-submit-delete-role").on("click", function(e) {
        var id = $("#modal-submit-delete-role").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteRoleUrl + id,
            success: function(result) {
                $("#roles").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

    /* Prepare Roles table */
    if (loadDataTable) {
        $('#roles').DataTable( {
            responsive: true,
            ajax: {
                url: getActiveRolesUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "data": "dashboard", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "asset_manager", "render": function (data, type, row) {
                        if (row.asset_manager == 2) {
                            return 'W';
                        } else if (row.asset_manager == 4) {
                            return 'R';
                        } else if (row.asset_manager == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "reports", "render": function (data, type, row) {
                        if (row.reports == 2) {
                            return 'W';
                        } else if (row.reports == 4) {
                            return 'R';
                        } else if (row.reports == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "asset_groups", "render": function (data, type, row) {
                        if (row.asset_groups == 2) {
                            return 'W';
                        } else if (row.asset_groups == 4) {
                            return 'R';
                        } else if (row.asset_groups == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "users", "render": function (data, type, row) {
                        if (row.users == 2) {
                            return 'W';
                        } else if (row.users == 4) {
                            return 'R';
                        } else if (row.users == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "roles", "render": function (data, type, row) {
                        if (row.roles == 2) {
                            return 'W';
                        } else if (row.roles == 4) {
                            return 'R';
                        } else if (row.roles == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "data": "login_photos", "render": function (data, type, row) {
                        if (row.login_photos == 2) {
                            return 'W';
                        } else if (row.login_photos == 4) {
                            return 'R';
                        } else if (row.login_photos == 6) {
                            return 'RW';
                        } else {
                            return 'None';
                        }
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon edit-role-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-dashboard="' + row.dashboard + '" data-asset_manager="' + row.asset_manager + '" data-reports="' + row.reports + '" data-asset_groups="' + row.asset_groups + '" data-users="' + row.users + '" data-roles="' + row.roles + '" data-login_photos="' + row.login_photos + '" data-target="#edit-role"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-role-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-role"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        '56vh',
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { responsivePriority: -1, targets: [9,10] },
                { width: "20px", targets: [9,10] },
                { orderable: false, targets: [9,10] },
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md'>fB>" +
    			"<'row'<'col-md'tr>>",
            buttons: [
                {
                    text: "Add Role",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-role");
                    },
                    className: 'btn-primary'
                }
            ],
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-roles").html('<h5 class="pt-3">Roles</h5>');
        $("#roles_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
