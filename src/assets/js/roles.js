var loadDataTable = $("#roles-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addRoleUrl = baseUrl + "Roles/add";
    var validateAddEmailUrl = baseUrl + "Roles/validate_add_email";
    var validateAddPasswordUrl = baseUrl + "Roles/validate_add_password";
    var validateAddPasswordConfirmUrl = baseUrl + "Roles/validate_add_password_confirm";

    var validateFirstNameUrl = baseUrl + "Roles/validate_first_name";
    var validateLastNameUrl = baseUrl + "Roles/validate_last_name";
    var validateRoleUrl = baseUrl + "Roles/validate_role";

    var editRoleUrl = baseUrl + "Roles/edit";
    var validateEditEmailUrl = baseUrl + "Roles/validate_edit_email";
    var validateEditPasswordUrl = baseUrl + "Roles/validate_edit_password";
    var validateEditPasswordConfirmUrl = baseUrl + "Roles/validate_edit_password_confirm";

    var deleteRoleUrl = baseUrl + "Roles/delete/";
    var getActiveRolesUrl = baseUrl + "Roles/get_active";
    /* *** **************** *** */

    /* *** Handle add role *** */
    var addFirstNameField = $('#add-role-form #add-role-first-name');
    var addFirstNameError = $("#add-role-form #add-role-first-name-error");
    addFirstNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateFirstNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addFirstNameError.empty();
                    addFirstNameField.removeClass('is-invalid');
                    addFirstNameField.addClass('is-valid');
                } else {
                    addFirstNameField.removeClass('is-valid');
                    if (! result["first_name"] == "") {
                        if (! result["first_name"] == addFirstNameError.val()) {
                            addFirstNameError.empty(); // empty error messages, if there were any
                            addFirstNameError.append(result["first_name"]); // display the error messages
                        }
                        if (! addFirstNameField.hasClass('is-invalid')) {
                            addFirstNameField.addClass('is-invalid');
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

    var addLastNameField = $('#add-role-form #add-role-last-name');
    var addLastNameError = $("#add-role-form #add-role-last-name-error");
    addLastNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateLastNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addLastNameError.empty();
                    addLastNameField.removeClass('is-invalid');
                    addLastNameField.addClass('is-valid');
                } else {
                    addLastNameField.removeClass('is-valid');
                    if (! result["last_name"] == "") {
                        if (! result["last_name"] == addLastNameError.val()) {
                            addLastNameError.empty(); // empty error messages, if there were any
                            addLastNameError.append(result["last_name"]); // display the error messages
                        }
                        if (! addLastNameField.hasClass('is-invalid')) {
                            addLastNameField.addClass('is-invalid');
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

    var addEmailField = $('#add-role-form #add-role-email');
    var addEmailError = $("#add-role-form #add-role-email-error");
    addEmailField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateAddEmailUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addEmailError.empty();
                    addEmailField.removeClass('is-invalid');
                    addEmailField.addClass('is-valid');
                } else {
                    addEmailField.removeClass('is-valid');
                    if (! result["email"] == "") {
                        if (! result["email"] == addEmailError.val()) {
                            addEmailError.empty(); // empty error messages, if there were any
                            addEmailError.append(result["email"]); // display the error messages
                        }
                        if (! addEmailField.hasClass('is-invalid')) {
                            addEmailField.addClass('is-invalid');
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

    var addPasswordField = $('#add-role-form #add-role-password');
    var addPasswordError = $("#add-role-form #add-role-password-error");
    addPasswordField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateAddPasswordUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addPasswordError.empty();
                    addPasswordField.removeClass('is-invalid');
                    addPasswordField.addClass('is-valid');
                } else {
                    addPasswordField.removeClass('is-valid');
                    if (! result["password"] == "") {
                        if (! result["password"] == addPasswordError.val()) {
                            addPasswordError.empty(); // empty error messages, if there were any
                            addPasswordError.append(result["password"]); // display the error messages
                        }
                        if (! addPasswordField.hasClass('is-invalid')) {
                            addPasswordField.addClass('is-invalid');
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

    var addPasswordConfirmField = $('#add-role-form #add-role-password-confirm');
    var addPasswordConfirmError = $("#add-role-form #add-role-password-confirm-error");
    addPasswordConfirmField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateAddPasswordConfirmUrl,
            dataType: 'json',
            data: $(this).serialize() + "&" + addPasswordField.serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addPasswordConfirmError.empty();
                    addPasswordConfirmField.removeClass('is-invalid');
                    addPasswordConfirmField.addClass('is-valid');
                } else {
                    addPasswordConfirmField.removeClass('is-valid');
                    if (! result["password_confirm"] == "") {
                        if (! result["password_confirm"] == addPasswordConfirmError.val()) {
                            addPasswordConfirmError.empty(); // empty error messages, if there were any
                            addPasswordConfirmError.append(result["password_confirm"]); // display the error messages
                        }
                        if (! addPasswordConfirmField.hasClass('is-invalid')) {
                            addPasswordConfirmField.addClass('is-invalid');
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

    var addRoleField = $('#add-role-form #add-role-role');
    var addRoleError = $("#add-role-form #add-role-role-error");
    addRoleField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateRoleUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    addRoleError.empty();
                    addRoleField.removeClass('is-invalid');
                    addRoleField.addClass('is-valid');
                } else {
                    addRoleField.removeClass('is-valid');
                    if (! result["role"] == "") {
                        if (! result["role"] == addRoleError.val()) {
                            addRoleError.empty(); // empty error messages, if there were any
                            addRoleError.append(result["role"]); // display the error messages
                        }
                        if (! addRoleField.hasClass('is-invalid')) {
                            addRoleField.addClass('is-invalid');
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
                    if (! result["first_name"] == "") {
                        addFirstNameField.removeClass('is-valid');
                        if (! result["first_name"] == addFirstNameError.val()) {
                            addFirstNameError.empty(); // empty error messages, if there were any
                            addFirstNameError.append(result["first_name"]); // display the error messages
                        }
                        if (! addFirstNameField.hasClass('is-invalid')) {
                            addFirstNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["last_name"] == "") {
                        addLastNameField.removeClass('is-valid');
                        if (! result["last_name"] == addLastNameError.val()) {
                            addLastNameError.empty(); // empty error messages, if there were any
                            addLastNameError.append(result["last_name"]); // display the error messages
                        }
                        if (! addLastNameField.hasClass('is-invalid')) {
                            addLastNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["email"] == "") {
                        addEmailField.removeClass('is-valid');
                        if (! result["email"] == addEmailError.val()) {
                            addEmailError.empty(); // empty error messages, if there were any
                            addEmailError.append(result["email"]); // display the error messages
                        }
                        if (! addEmailField.hasClass('is-invalid')) {
                            addEmailField.addClass('is-invalid');
                        }
                    }
                    if (! result["password"] == "") {
                        addPasswordField.removeClass('is-valid');
                        if (! result["password"] == addPasswordError.val()) {
                            addPasswordError.empty(); // empty error messages, if there were any
                            addPasswordError.append(result["password"]); // display the error messages
                        }
                        if (! addPasswordField.hasClass('is-invalid')) {
                            addPasswordField.addClass('is-invalid');
                        }
                    }
                    if (! result["password_confirm"] == "") {
                        addPasswordConfirmField.removeClass('is-valid');
                        if (! result["password_confirm"] == addPasswordConfirmError.val()) {
                            addPasswordConfirmError.empty(); // empty error messages, if there were any
                            addPasswordConfirmError.append(result["password_confirm"]); // display the error messages
                        }
                        if (! addPasswordConfirmField.hasClass('is-invalid')) {
                            addPasswordConfirmField.addClass('is-invalid');
                        }
                    }
                    if (! result["role"] == "") {
                        addRoleField.removeClass('is-valid');
                        if (! result["role"] == addRoleError.val()) {
                            addRoleError.empty(); // empty error messages, if there were any
                            addRoleError.append(result["role"]); // display the error messages
                        }
                        if (! addRoleField.hasClass('is-invalid')) {
                            addRoleField.addClass('is-invalid');
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

    $('#add-role').on('hidden.bs.modal', function () {
        addFirstNameError.empty(); // empty the errors when hiding the modal
        addLastNameError.empty();
        addEmailError.empty();
        addPasswordError.empty();
        addPasswordConfirmError.empty();
        addRoleError.empty();
        addFirstNameField.val(""); // set the value to of the forms to have nothing in them, just in case the role left some data there without submitting
        addLastNameField.val("");
        addEmailField.val("");
        addPasswordField.val("");
        addPasswordConfirmField.val("");
        addRoleField.val("");
        addFirstNameField.removeClass('is-invalid');
        addFirstNameField.removeClass('is-valid');
        addLastNameField.removeClass('is-invalid');
        addLastNameField.removeClass('is-valid');
        addEmailField.removeClass('is-invalid');
        addEmailField.removeClass('is-valid');
        addPasswordField.removeClass('is-invalid');
        addPasswordField.removeClass('is-valid');
        addPasswordConfirmField.removeClass('is-invalid');
        addPasswordConfirmField.removeClass('is-valid');
        addRoleField.removeClass('is-invalid');
        addRoleField.removeClass('is-valid');
    });
    /* *** ********************* *** */

    /* *** Handle edit role *** */
    var editFirstNameField = $('#edit-role-form #edit-role-first-name');
    var editFirstNameError = $('#edit-role-form #edit-role-first-name-error');
    var editLastNameField = $('#edit-role-form #edit-role-last-name');
    var editLastNameError = $('#edit-role-form #edit-role-last-name-error');
    var editEmailField = $('#edit-role-form #edit-role-email');
    var editEmailError = $('#edit-role-form #edit-role-email-error');
    var editPasswordField = $('#edit-role-form #edit-role-password');
    var editPasswordError = $('#edit-role-form #edit-role-password-error');
    var editPasswordConfirmField = $('#edit-role-form #edit-role-password-confirm');
    var editPasswordConfirmError = $('#edit-role-form #edit-role-password-confirm-error');
    var editRoleField = $('#edit-role-form #edit-role-role');
    var editRoleError = $('#edit-role-form #edit-role-role-error');

    $(document).on("click", ".edit-role-button", function () {
        var id = $(this).data('id');
        var firstName = $(this).data('first_name');
        var lastName = $(this).data('last_name');
        var email = $(this).data('email');
        var role = $(this).data('role');

        editFirstNameField.val(firstName); // set values for what is currently set
        editLastNameField.val(lastName);
        editEmailField.val(email);
        editRoleField.val(role);
        $("#edit-role-form #modal-submit-edit-role").data('id', id);
    });

    editFirstNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateFirstNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editFirstNameError.empty();
                    editFirstNameField.removeClass('is-invalid');
                    editFirstNameField.addClass('is-valid');
                } else {
                    editFirstNameField.removeClass('is-valid');
                    if (! result["first_name"] == "") {
                        if (! result["first_name"] == editFirstNameError.val()) {
                            editFirstNameError.empty(); // empty error messages, if there were any
                            editFirstNameError.append(result["first_name"]); // display the error messages
                        }
                        if (! editFirstNameField.hasClass('is-invalid')) {
                            editFirstNameField.addClass('is-invalid');
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

    editLastNameField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateLastNameUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editLastNameError.empty();
                    editLastNameField.removeClass('is-invalid');
                    editLastNameField.addClass('is-valid');
                } else {
                    editLastNameField.removeClass('is-valid');
                    if (! result["last_name"] == "") {
                        if (! result["last_name"] == editLastNameError.val()) {
                            editLastNameError.empty(); // empty error messages, if there were any
                            editLastNameError.append(result["last_name"]); // display the error messages
                        }
                        if (! editLastNameField.hasClass('is-invalid')) {
                            editLastNameField.addClass('is-invalid');
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

    editEmailField.blur(function() {
        var id = $("#modal-submit-edit-role").data('id');

        $.ajax({
            type: 'POST',
            url: validateEditEmailUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editEmailError.empty();
                    editEmailField.removeClass('is-invalid');
                    editEmailField.addClass('is-valid');
                } else {
                    editEmailField.removeClass('is-valid');
                    if (! result["email"] == "") {
                        if (! result["email"] == editEmailError.val()) {
                            editEmailError.empty(); // empty error messages, if there were any
                            editEmailError.append(result["email"]); // display the error messages
                        }
                        if (! editEmailField.hasClass('is-invalid')) {
                            editEmailField.addClass('is-invalid');
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

    editPasswordField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateEditPasswordUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editPasswordError.empty();
                    editPasswordField.removeClass('is-invalid');
                    editPasswordField.addClass('is-valid');
                } else {
                    editPasswordField.removeClass('is-valid');
                    if (! result["password"] == "") {
                        if (! result["password"] == editPasswordError.val()) {
                            editPasswordError.empty(); // empty error messages, if there were any
                            editPasswordError.append(result["password"]); // display the error messages
                        }
                        if (! editPasswordField.hasClass('is-invalid')) {
                            editPasswordField.addClass('is-invalid');
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

    editPasswordConfirmField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateEditPasswordConfirmUrl,
            dataType: 'json',
            data: $(this).serialize() + "&" + editPasswordField.serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editPasswordConfirmError.empty();
                    editPasswordConfirmField.removeClass('is-invalid');
                    editPasswordConfirmField.addClass('is-valid');
                } else {
                    editPasswordConfirmField.removeClass('is-valid');
                    if (! result["password_confirm"] == "") {
                        if (! result["password_confirm"] == editPasswordConfirmError.val()) {
                            editPasswordConfirmError.empty(); // empty error messages, if there were any
                            editPasswordConfirmError.append(result["password_confirm"]); // display the error messages
                        }
                        if (! editPasswordConfirmField.hasClass('is-invalid')) {
                            editPasswordConfirmField.addClass('is-invalid');
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

    editRoleField.blur(function() {
        $.ajax({
            type: 'POST',
            url: validateRoleUrl,
            dataType: 'json',
            data: $(this).serialize(), // get data from the form
            headers: {"X-HTTP-Method-Override": "PUT"},
            async: true,
            success: function(result) {
                if (result == "success") {
                    editRoleError.empty();
                    editRoleField.removeClass('is-invalid');
                    editRoleField.addClass('is-valid');
                } else {
                    editRoleField.removeClass('is-valid');
                    if (! result["role"] == "") {
                        if (! result["role"] == editRoleError.val()) {
                            editRoleError.empty(); // empty error messages, if there were any
                            editRoleError.append(result["role"]); // display the error messages
                        }
                        if (! editRoleField.hasClass('is-invalid')) {
                            editRoleField.addClass('is-invalid');
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
                    console.log(result);
                    if (! result["first_name"] == "") {
                        editFirstNameField.removeClass('is-valid');
                        if (! result["first_name"] == editFirstNameError.val()) {
                            editFirstNameError.empty(); // empty error messages, if there were any
                            editFirstNameError.append(result["first_name"]); // display the error messages
                        }
                        if (! editFirstNameField.hasClass('is-invalid')) {
                            editFirstNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["last_name"] == "") {
                        editLastNameField.removeClass('is-valid');
                        if (! result["last_name"] == editLastNameError.val()) {
                            editLastNameError.empty(); // empty error messages, if there were any
                            editLastNameError.append(result["last_name"]); // display the error messages
                        }
                        if (! editLastNameField.hasClass('is-invalid')) {
                            editLastNameField.addClass('is-invalid');
                        }
                    }
                    if (! result["email"] == "") {
                        editEmailField.removeClass('is-valid');
                        if (! result["email"] == editEmailError.val()) {
                            editEmailError.empty(); // empty error messages, if there were any
                            editEmailError.append(result["email"]); // display the error messages
                        }
                        if (! editEmailField.hasClass('is-invalid')) {
                            editEmailField.addClass('is-invalid');
                        }
                    }
                    if (! result["password"] == "") {
                        editPasswordField.removeClass('is-valid');
                        if (! result["password"] == editPasswordError.val()) {
                            editPasswordError.empty(); // empty error messages, if there were any
                            editPasswordError.append(result["password"]); // display the error messages
                        }
                        if (! editPasswordField.hasClass('is-invalid')) {
                            editPasswordField.addClass('is-invalid');
                        }
                    }
                    if (! result["password_confirm"] == "") {
                        editPasswordConfirmField.removeClass('is-valid');
                        if (! result["password_confirm"] == editPasswordConfirmError.val()) {
                            editPasswordConfirmError.empty(); // empty error messages, if there were any
                            editPasswordConfirmError.append(result["password_confirm"]); // display the error messages
                        }
                        if (! editPasswordConfirmField.hasClass('is-invalid')) {
                            editPasswordConfirmField.addClass('is-invalid');
                        }
                    }
                    if (! result["role"] == "") {
                        editRoleField.removeClass('is-valid');
                        if (! result["role"] == editRoleError.val()) {
                            editRoleError.empty(); // empty error messages, if there were any
                            editRoleError.append(result["role"]); // display the error messages
                        }
                        if (! editRoleField.hasClass('is-invalid')) {
                            editRoleField.addClass('is-invalid');
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
        editFirstNameError.empty(); // empty the errors when hiding the modal
        editLastNameError.empty();
        editEmailError.empty();
        editPasswordError.empty();
        editPasswordConfirmError.empty();
        editRoleError.empty();
        editFirstNameField.val(""); // set the value to of the forms to have nothing in them, just in case the role left some data there without submitting
        editLastNameField.val("");
        editEmailField.val("");
        editPasswordField.val("");
        editPasswordConfirmField.val("");
        editRoleField.val("");
        editFirstNameField.removeClass('is-invalid');
        editFirstNameField.removeClass('is-valid');
        editLastNameField.removeClass('is-invalid');
        editLastNameField.removeClass('is-valid');
        editEmailField.removeClass('is-invalid');
        editEmailField.removeClass('is-valid');
        editPasswordField.removeClass('is-invalid');
        editPasswordField.removeClass('is-valid');
        editPasswordConfirmField.removeClass('is-invalid');
        editPasswordConfirmField.removeClass('is-valid');
        editRoleField.removeClass('is-invalid');
        editRoleField.removeClass('is-valid');
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
                            return '';
                        }
                    }
                },
                { "data": "asset_manager", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "reports", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "asset_groups", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "users", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "roles", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "login_photos", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon edit-role-button" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-dashboard="' + row.dashboard + '" data-asset_manager="' + row.asset_manager + '" data-reports="' + row.reports + '" data-asset_groups="' + row.asset_groups + '" data-users="' + row.users + '" data-login_photos="' + row.login_photos + '" data-target="#edit-role"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
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
