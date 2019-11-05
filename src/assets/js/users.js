var loadDataTable = $("#users-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var addUserUrl = baseUrl + "Users/add";
    var validateAddNameUrl = baseUrl + "Users/validate_add_name";
    var validateAddRateUrl = baseUrl + "Users/validate_add_rate";
    var editUserUrl = baseUrl + "Users/edit";
    var validateEditNameUrl = baseUrl + "Users/validate_edit_name";
    var validateEditRateUrl = baseUrl + "Users/validate_edit_rate";
    var deleteUserUrl = baseUrl + "Users/delete/";
    var getActiveUsersUrl = baseUrl + "Users/get_active";
    /* *** **************** *** */

    /* *** Handle add user *** */
    // $("#add-user-form #name").blur(function() {
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: validateAddNameUrl,
    //         dataType: 'json',
    //         data: $(this).serialize(), // get data from the form
    //         headers: {"X-HTTP-Method-Override": "PUT"},
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#add-user-form #name-error").empty();
    //                 $("#add-user-form #name").removeClass('is-invalid');
    //                 $("#add-user-form #name").addClass('is-valid');
    //             } else {
    //                 $("#add-user-form #name").removeClass('is-valid');
    //                 if (! result["name"] == "") {
    //                     if (! result["name"] == $("#add-user-form #name-error").val()) {
    //                         $("#add-user-form #name-error").empty(); // empty error messages, if there were any
    //                         $("#add-user-form #name-error").append(result["name"]); // display the error messages
    //                     }
    //                     if (! $("#add-user-form #name").hasClass('is-invalid')) {
    //                         $("#add-user-form #name").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $("#add-user-form #rate").blur(function() {
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: validateAddRateUrl,
    //         dataType: 'json',
    //         data: $(this).serialize(), // get data from the form
    //         headers: {"X-HTTP-Method-Override": "PUT"},
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#add-user-form #rate-error").empty();
    //                 $("#add-user-form #rate").removeClass('is-invalid');
    //                 $("#add-user-form #rate").addClass('is-valid');
    //             } else {
    //                 $("#add-user-form #rate").removeClass('is-valid');
    //                 if (! result["rate"] == "") {
    //                     if (! result["rate"] == $("#add-user-form #rate-error").val()) {
    //                         $("#add-user-form #rate-error").empty(); // empty error messages, if there were any
    //                         $("#add-user-form #rate-error").append(result["rate"]); // display the error messages
    //                     }
    //                     if (! $("#add-user-form #rate").hasClass('is-invalid')) {
    //                         $("#add-user-form #rate").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $("#add-user-form").on("submit", function(e) {
    //     e.preventDefault(); // prevent modal from closing
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: addUserUrl,
    //         dataType: 'json',
    //         data: $(this).serialize(), // get data from the form
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#add-user").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
    //                 $("#users").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an user
    //             } else {
    //                 if (! result["name"] == "") {
    //                     if (! result["name"] == $("#add-user-form #name-error").val()) {
    //                         $("#add-user-form #name-error").empty(); // empty error messages, if there were any
    //                         $("#add-user-form #name-error").append(result["name"]); // display the error messages
    //                     }
    //                     if (! $("#add-user-form #name").hasClass('is-invalid')) {
    //                         $("#add-user-form #name").addClass('is-invalid');
    //                     }
    //                 }
    //                 if (! result["rate"] == "") {
    //                     if (! result["rate"] == $("#add-user-form #rate-error").val()) {
    //                         $("#add-user-form #rate-error").empty(); // empty error messages, if there were any
    //                         $("#add-user-form #rate-error").append(result["rate"]); // display the error messages
    //                     }
    //                     if (! $("#add-user-form #rate").hasClass('is-invalid')) {
    //                         $("#add-user-form #rate").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $('#add-user').on('hidden.bs.modal', function () {
    //     $("#add-user-form #name-error").empty(); // empty the errors when hiding the modal
    //     $("#add-user-form #rate-error").empty();
    //     $("#add-user-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
    //     $("#add-user-form #rate").val("");
    //     $("#add-user-form #name").removeClass('is-invalid');
    //     $("#add-user-form #name").removeClass('is-valid');
    //     $("#add-user-form #rate").removeClass('is-invalid');
    //     $("#add-user-form #rate").removeClass('is-valid');
    // });
    // /* *** ********************* *** */
    //
    // /* *** Handle edit user *** */
    // $(document).on("click", "#edit-user-button", function () {
    //     var id = $(this).data('id');
    //     var name = $(this).data('name');
    //     var rate = $(this).data('rate');
    //
    //     $("#edit-user-form #name").val(name); // set values for what is currently set
    //     $("#edit-user-form #rate").val(rate);
    //     $("#edit-user-form #modal-submit-edit-user").data('id', id);
    // });
    //
    // $("#edit-user-form #name").blur(function() {
    //     var id = $("#modal-submit-edit-user").data('id');
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: validateEditNameUrl,
    //         dataType: 'json',
    //         data: "id=" + id + "&" + $(this).serialize(), // get data from the form
    //         // headers: {"X-HTTP-Method-Override": "PUT"},
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#edit-user-form #name-error").empty();
    //                 $("#edit-user-form #name").removeClass('is-invalid');
    //                 $("#edit-user-form #name").addClass('is-valid');
    //             } else {
    //                 $("#edit-user-form #name").removeClass('is-valid');
    //                 if (! result["name"] == "") {
    //                     if (! result["name"] == $("#edit-user-form #name-error").val()) {
    //                         $("#edit-user-form #name-error").empty(); // empty error messages, if there were any
    //                         $("#edit-user-form #name-error").append(result["name"]); // display the error messages
    //                     }
    //                     if (! $("#edit-user-form #name").hasClass('is-invalid')) {
    //                         $("#edit-user-form #name").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $("#edit-user-form #rate").blur(function() {
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: validateEditRateUrl,
    //         dataType: 'json',
    //         data: $(this).serialize(), // get data from the form
    //         headers: {"X-HTTP-Method-Override": "PUT"},
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#edit-user-form #rate-error").empty();
    //                 $("#edit-user-form #rate").removeClass('is-invalid');
    //                 $("#edit-user-form #rate").addClass('is-valid');
    //             } else {
    //                 $("#edit-user-form #rate").removeClass('is-valid');
    //                 if (! result["rate"] == "") {
    //                     if (! result["rate"] == $("#edit-user-form #rate-error").val()) {
    //                         $("#edit-user-form #rate-error").empty(); // empty error messages, if there were any
    //                         $("#edit-user-form #rate-error").append(result["rate"]); // display the error messages
    //                     }
    //                     if (! $("#edit-user-form #rate").hasClass('is-invalid')) {
    //                         $("#edit-user-form #rate").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $("#edit-user-form").on("submit", function(e) {
    //     e.preventDefault(); // prevent modal from closing
    //
    //     var id = $("#modal-submit-edit-user").data('id');
    //
    //     $.ajax({
    //         type: 'POST',
    //         url: editUserUrl,
    //         dataType: 'json',
    //         data: "id=" + id + "&" + $(this).serialize(), // get data from the form
    //         headers: {"X-HTTP-Method-Override": "PUT"},
    //         success: function(result) {
    //             if (result == "success") {
    //                 $("#edit-user").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
    //                 $("#users").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an user
    //             } else {
    //                 if (! result["name"] == "") {
    //                     if (! result["name"] == $("#edit-user-form #name-error").val()) {
    //                         $("#edit-user-form #name-error").empty(); // empty error messages, if there were any
    //                         $("#edit-user-form #name-error").append(result["name"]); // display the error messages
    //                     }
    //                     if (! $("#edit-user-form #name").hasClass('is-invalid')) {
    //                         $("#edit-user-form #name").addClass('is-invalid');
    //                     }
    //                 }
    //                 if (! result["rate"] == "") {
    //                     if (! result["rate"] == $("#edit-user-form #rate-error").val()) {
    //                         $("#edit-user-form #rate-error").empty(); // empty error messages, if there were any
    //                         $("#edit-user-form #rate-error").append(result["rate"]); // display the error messages
    //                     }
    //                     if (! $("#edit-user-form #rate").hasClass('is-invalid')) {
    //                         $("#edit-user-form #rate").addClass('is-invalid');
    //                     }
    //                 }
    //             }
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
    //
    // $('#edit-user').on('hidden.bs.modal', function () {
    //     $("#edit-user-form #name-error").empty(); // empty the errors when hiding the modal
    //     $("#edit-user-form #rate-error").empty();
    //     $("#edit-user-form #name").val(""); // set the value to of the forms to have nothing in them, just in case the user left some data there without submitting
    //     $("#edit-user-form #rate").val("");
    //     $("#edit-user-form #name").removeClass('is-invalid');
    //     $("#edit-user-form #name").removeClass('is-valid');
    //     $("#edit-user-form #rate").removeClass('is-invalid');
    //     $("#edit-user-form #rate").removeClass('is-valid');
    // });
    // /* *** ********************* *** */
    //
    // /* *** Handle delete user *** */
    // $(document).on("click", "#delete-user-button", function () {
    //     var id = $(this).data('id');
    //     $("#modal-submit-delete-user").data('id', id);
    //
    // });
    //
    // $("#modal-submit-delete-user").on("click", function(e) {
    //     var id = $("#modal-submit-delete-user").data('id');
    //
    //     $.ajax({
    //         type: "DELETE",
    //         url: deleteUserUrl + id,
    //         success: function(result) {
    //             $("#users").DataTable().ajax.reload();
    //         },
    //         error: function(result) {
    //             var today = new Date();
    //             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //             console.log("AJAX error, check server logs near local time: " + time);
    //         }
    //     });
    // });
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
                { "render": function ( data, type, row ) {
                        return '<button id="edit-user-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-name="' + row.name + '" data-rate="' + row.rate + '" data-target="#edit-user"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                    }
                },
                { "render": function ( data, type, row ) {
                        return '<button id="delete-user-button" class="table-icon" data-toggle="modal" data-id="' + row.id + '" data-target="#delete-user"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                    }
                }
            ],
            scrollY:        '56vh',
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { "width": "20px", "targets": [4,5] },
                { "orderable": false, "targets": [4,5] },
                { "visible": false, "targets": 0 }
            ],
            dom:
                "<'row'<'col-sm'<'table-title-users'>>fB>" +
    			"<'row'<'col-sm'tr>>",
            buttons: [
                {
                    text: "Add User",
                    action: function (e, dt, node, config) {
                    },
                    init: function (api, node, config) {
                        $(node).removeClass('btn-secondary');
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
