var loadDataTable = $("#users-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addUserUrl = baseUrl + "Users/add";
    var validateAddEmailUrl = baseUrl + "Users/validate_add_email";
    var validateAddPasswordUrl = baseUrl + "Users/validate_add_password";
    var validateAddPasswordConfirmUrl = baseUrl + "Users/validate_password_confirm";

    var validateFirstNameUrl = baseUrl + "Users/validate_first_name";
    var validateLastNameUrl = baseUrl + "Users/validate_last_name";
    var validateRoleUrl = baseUrl + "Users/validate_role";

    var editUserUrl = baseUrl + "Users/edit";
    var validateEditEmailUrl = baseUrl + "Users/validate_edit_email";
    var validateEditPasswordUrl = baseUrl + "Users/validate_edit_password";
    var validateEditPasswordConfirmUrl = baseUrl + "Users/validate_edit_password_confirm";

    var deleteUserUrl = baseUrl + "Users/delete/";
    var getActiveUsersUrl = baseUrl + "Users/get_active";
    var getActiveRolesUrl = baseUrl + "Roles/get_active";
    /* *** **************** *** */

    /* *** Cached Variables *** */
    var roles = [];
    var addRoleDropdown;
    var isAddRoleFilled = false;
    var isEditRoleFilled = false;
    /* *** **************** *** */

    /* *** Prepare Add Manufacturer Dropdown *** */
    $.ajax({
        type: 'GET',
        url: getActiveRolesUrl,
        dataType: 'json',
        success: function(result) {
            // console.log(result[0].id);
            Object.keys(result).forEach(function(i){
                roles.push({name: result[i].name, value: result[i].id});
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

    var addUserButton = $('#add-user-button');
    console.log(addUserButton);
    addUserButton.click(function(e) {
        e.preventDefault();
      alert( "Handler for .click() called." );
    });
    // addUserButton.click(function (e) {
    //     e.preventDefault();
    //     console.log("clicked add button");
    //
    //     if (! isAddRoleFilled) {
    //         roles.sort(function(a, b) {
    //             return compareStrings(a.name, b.name);
    //         })
    //         console.log(roles);
    //         isAddRoleFilled = true;
    //         $('#add-user-role').dropdown({
    //             values: roles
    //         });
    //     }
    // });

    var editUserButton = $('#edit-user-button');
    $(document).on("click", editUserButton, function () {
        console.log("clicked edit button");
        // if (! isAddRoleFilled) {
            roles.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            })
            // isAddRoleFilled = true;
            var role = $("#modal-submit-edit-user").data('role');
            console.log(role);
            var editDisplayRoles = [];
            Object.keys(roles).forEach(function(i){
                if (roles[i].value == role) {
                    editDisplayRoles.push({name: roles[i].name, value: roles[i].id, selected: true });
                } else {
                    editDisplayRoles.push({name: roles[i].name, value: roles[i].id});
                }
            });
            $('#role-user-role').dropdown({
                values: editDisplayRoles
            });
            console.log(editDisplayRoles);
        // }
    });

    /* *** Handle add user *** */
    var addFirstNameField = $('#add-user-form #add-user-first-name');
    var addFirstNameError = $("#add-user-form #add-user-first-name-error");
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

    var addLastNameField = $('#add-user-form #add-user-last-name');
    var addLastNameError = $("#add-user-form #add-user-last-name-error");
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

    var addEmailField = $('#add-user-form #add-user-email');
    var addEmailError = $("#add-user-form #add-user-email-error");
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

    var addPasswordField = $('#add-user-form #add-user-password');
    var addPasswordError = $("#add-user-form #add-user-password-error");
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

    var addPasswordConfirmField = $('#add-user-form #add-user-password-confirm');
    var addPasswordConfirmError = $("#add-user-form #add-user-password-confirm-error");
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

    var addRoleField = $('#add-user-form #add-user-role');
    var addRoleError = $("#add-user-form #add-user-role-error");
    addRoleField.blur(function() {
        // $.ajax({
        //     type: 'POST',
        //     url: validateRoleUrl,
        //     dataType: 'json',
        //     data: $(this).serialize(), // get data from the form
        //     headers: {"X-HTTP-Method-Override": "PUT"},
        //     async: true,
        //     success: function(result) {
        //         if (result == "success") {
        //             addRoleError.empty();
        //             addRoleField.removeClass('is-invalid');
        //             addRoleField.addClass('is-valid');
        //         } else {
        //             addRoleField.removeClass('is-valid');
        //             if (! result["role"] == "") {
        //                 if (! result["role"] == addRoleError.val()) {
        //                     addRoleError.empty(); // empty error messages, if there were any
        //                     addRoleError.append(result["role"]); // display the error messages
        //                 }
        //                 if (! addRoleField.hasClass('is-invalid')) {
        //                     addRoleField.addClass('is-invalid');
        //                 }
        //             }
        //         }
        //     },
        //     error: function(result) {
        //         var today = new Date();
        //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        //         console.log("AJAX error, check server logs near local time: " + time);
        //     }
        // });
    });

    $("#add-user-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var role = $('#add-user-form .item.active.selected').data('value');
        console.log(role);

        $.ajax({
            type: 'POST',
            url: addUserUrl,
            dataType: 'json',
            data: $(this).serialize() + "&" + "role=" + role, // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#add-user").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#users").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an user
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

    $('#add-user').on('hidden.bs.modal', function () {
        addFirstNameError.empty(); // empty the errors when hiding the modal
        addLastNameError.empty();
        addEmailError.empty();
        addPasswordError.empty();
        addPasswordConfirmError.empty();
        addRoleError.empty();
        addFirstNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
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

    /* *** Handle edit user *** */
    var editFirstNameField = $('#edit-user-form #edit-user-first-name');
    var editFirstNameError = $('#edit-user-form #edit-user-first-name-error');
    var editLastNameField = $('#edit-user-form #edit-user-last-name');
    var editLastNameError = $('#edit-user-form #edit-user-last-name-error');
    var editEmailField = $('#edit-user-form #edit-user-email');
    var editEmailError = $('#edit-user-form #edit-user-email-error');
    var editPasswordField = $('#edit-user-form #edit-user-password');
    var editPasswordError = $('#edit-user-form #edit-user-password-error');
    var editPasswordConfirmField = $('#edit-user-form #edit-user-password-confirm');
    var editPasswordConfirmError = $('#edit-user-form #edit-user-password-confirm-error');
    var editRoleField = $('#edit-user-form #edit-user-role');
    var editRoleError = $('#edit-user-form #edit-user-role-error');

    $(document).on("click", ".edit-user-button", function () {
        var id = $(this).data('id');
        var firstName = $(this).data('first_name');
        var lastName = $(this).data('last_name');
        var email = $(this).data('email');
        var role = $(this).data('role');

        editFirstNameField.val(firstName); // set values for what is currently set
        editLastNameField.val(lastName);
        editEmailField.val(email);
        editRoleField.val(role);
        $("#edit-user-form #modal-submit-edit-user").data('id', id);
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
        var id = $("#modal-submit-edit-user").data('id');

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

    $("#edit-user-form").on("submit", function(e) {
        e.preventDefault(); // prevent modal from closing

        var id = $("#modal-submit-edit-user").data('id');

        $.ajax({
            type: 'POST',
            url: editUserUrl,
            dataType: 'json',
            data: "id=" + id + "&" + $(this).serialize(), // get data from the form
            success: function(result) {
                if (result == "success") {
                    $("#edit-user").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                    $("#users").DataTable().ajax.reload(); // also need to reload the datatable since we successfully edit an user
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

    $('#edit-user').on('hidden.bs.modal', function () {
        editFirstNameError.empty(); // empty the errors when hiding the modal
        editLastNameError.empty();
        editEmailError.empty();
        editPasswordError.empty();
        editPasswordConfirmError.empty();
        editRoleError.empty();
        editFirstNameField.val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
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

    /* *** Handle delete user *** */
    $(document).on("click", ".delete-user-button", function () {
        var id = $(this).data('id');
        $("#modal-submit-delete-user").data('id', id);

    });

    $("#modal-submit-delete-user").on("click", function(e) {
        var id = $("#modal-submit-delete-user").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteUserUrl + id,
            success: function(result) {
                $("#users").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });
    /* *** ********************* *** */

    /* Prepare Users table */
    if (loadDataTable) {
        $('#users').DataTable( {
            responsive: true,
            ajax: {
                url: getActiveUsersUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "first_name" },
                { "data": "last_name" },
                { "data": "email" },
                { "data": "role" },
                { "data": "last_login", "render": function (data, type, row) {
                        var ret;
                        if (row.last_login == null) {
                            ret = "Never!";
                        } else {
                            var date = new Date(row.last_login);
                            ret = date.toLocaleString('en-US', { hour12: true });
                        }
                        return ret;
                    }
                },
                // { "data": "last_modified_by_name"},
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon edit-user-button" data-toggle="modal" data-id="' + row.id + '" data-first_name="' + row.first_name + '" data-last_name="' + row.last_name + '" data-email="' + row.email + '" data-role="' + row.role + '" data-target="#edit-user"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button class="table-icon delete-user-button" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-user"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        '56vh',
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { responsivePriority: -1, targets: [6,7] },
                { width: "20px", targets: [6,7] },
                { orderable: false, targets: [6,7] },
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md'>fB>" +
    			"<'row'<'col-md'tr>>",
            buttons: [
                {
                    text: "Add User",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
                        $(node).attr("id", "add-user-button");
                        $(node).attr("data-toggle", "modal");
                        $(node).attr("data-target", "#add-user");
                    },
                    className: 'btn-primary'
                }
            ],
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-users").html('<h5 class="pt-3">Users</h5>');
        $("#users_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
