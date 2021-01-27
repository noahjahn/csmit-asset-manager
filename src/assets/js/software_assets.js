// Controller function URLs
const createSoftwareAssetsUrl = baseUrl + "SoftwareAssets/create";
const readSoftwareAssetsUrl = baseUrl + "SoftwareAssets/read"
const updateSoftwareAssetsUrl = baseUrl + "SoftwareAssets/update";
const deleteSoftwareAssestUrl = baseUrl + "SoftwareAssets/delete/";
const getRenewalTypesUrl = baseUrl + "RenewalTypes/read";

function showOrHidePassword(element) {
    const $element = $(element);
    if ($element.hasClass('shown')) {
        $element.html('<p>*******</p>');
        $element.removeClass('shown');
    } else {
        const password = $element.data('password');
        $element.html(`<p>${password}</p>`);
        $element.addClass('shown');
    }
}

function formatRow() {
    return '<div class="slider">' +
            '<table class="edit-table row">' +
                '<tr class="edit-row">' +
                    '<td class="edit-col">' +
                        '<div> <label>Password</label> </div>' +
                        '<div> <a href="#" class="software-assets-password" onclick="showOrHidePassword(this)"></a> </div>' +
                    '</td>' +
                    '<td class = "edit-col">'+
                        '<div> <label>Representative Contact</label> </div>' +
                        '<div> <p class="software-assets-representative-contact"></p> </div>' +
                    '</td>' +
                    '<td class = "edit-col">'+
                        '<div> <label>License Key</label> </div>' +
                        '<div> <p class="software-assets-license-key"></p> </div> '+
                    '</td>'+
                    '<td class = "edit-col">'+
                        '<div> <label>Last Modified Time</label> </div>' +
                        '<div> <p class="software-assets-last-modified-time"></p> </div> '+
                    '</td>'+
                    '<td class = "edit-col">'+
                        '<div> <label>Notes</label> </div>' +
                        '<div> <p class="software-assets-notes"></p> </div> '+
                    '</td>'+
                '</tr><tr class="edit-row">' +
                '</tr></table>' +
          '</div>';
}

$(document).ready(function () {
    $('#add-software-asset-renewal-type').dropdown();

    const softwareAssetsDataTable = $('#software-assets').DataTable({
        ajax: {
            url: readSoftwareAssetsUrl,
            dataSrc: '',
        },
        columnDefs: [
           { "responsivePriority": -1, "targets": [8,9] },
           { "width": "10px", "targets": [8,9] },
           { "orderable": false, "targets": [8,9,10,11,12,13,14] },
           { "visible": false, "targets": [0,10,11,12,13,14] }
       ],
       columns: [
           { "data": "id" },
           { "data": "name" },
           { "data": "username" },
           { "data": "login_url" },
           {
               "data": "renewal_date",
           },
           { "data": "renewal_type_name" },
           { "data": "cost" },
           { "data": "owner" },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" id="edit-software-asset-button" data-toggle="modal" data-target="#edit-software-asset" data-type="POST" data-tableid="software-assets" data-id = "' + row.id + '" data-url="SoftwareAssets/update/' + row.id + '"><img class="mini-icon" id="edit-software-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
               }
           },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" id="delete-software-asset-button" data-toggle="modal" data-target="#delete-software-asset" data-type="DELETE" data-tableid="software-assets" data-id = "' + row.id + '"data-url="SoftwareAssets/delete/' + row.id + '"><img class="mini-icon" id="delete-software-asset-button" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
               }
           },
           { "data": "password" },
           { "data": "notes" },
           { "data": "representative_contact" },
           { "data": "license_keys" },
           { "data": "last_modified_time" },
       ],
       "order": [[ 1, "asc" ]],
        scrollY:        $(document).height() - 260,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        dom:
            "<'row'<'col-sm'>fB>" +
            "<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Software Asset",
                action: function() {
                    $('#add-software-asset').modal('show');
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                },
                className: 'btn-primary',
                attr: {
                    id: 'add-software-asset-btn'
                }
            }
        ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        },
        createdRow: function (row, data, index) {
            $(row).addClass('parent-row');
        },
        initComplete: function(settings, json) {
            $('#software-assets_filter input').unbind();
            $('#software-assets_filter input').bind('keyup', function(e) {
                if (e.keyCode == 13) {
                    softwareAssetsDataTable.search(this.value).draw();
                }
            });
        }
    });

    $('#software-assets').on('click', '.parent-row', (event) => {
        const row = softwareAssetsDataTable.row(event.currentTarget);
        if (row.child.isShown()) {
            $('div.slider', row.child()).slideUp(300, function () {
                row.child.hide();
            });
        } else {
            row.child(formatRow(row.data()), 'slider').show();
            const id = softwareAssetsDataTable.cell(row, 0).data();
            const password = softwareAssetsDataTable.cell(row, 10).data();
            const representative_contact = softwareAssetsDataTable.cell(row, 12).data();
            const license_key = softwareAssetsDataTable.cell(row, 13).data();
            const last_modified_time = softwareAssetsDataTable.cell(row, 14).data();
            const notes = softwareAssetsDataTable.cell(row, 11).data();
            const sliderOfRow = $('div.slider', row.child());
            sliderOfRow.slideDown(300);
            if (password) {
                sliderOfRow.find('.software-assets-password').data('password', password).html('<p>*******</p>');
            }
            sliderOfRow.find('.software-assets-representative-contact').html(representative_contact);
            sliderOfRow.find('.software-assets-license-key').html(license_key);
            sliderOfRow.find('.software-assets-last-modified-time').html(last_modified_time);
            sliderOfRow.find('.software-assets-notes').html(notes);
        }
    });

    $('#software-assets').on("click", "#delete-software-asset-button", function () {
        var id = $(this).data('id');
        $("#modal-confirm-delete-software-asset").data('id', id);

    });

    $('#modal-confirm-delete-software-asset').on("click", function(e) {
        var id = $("#modal-confirm-delete-software-asset").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteSoftwareAssestUrl + id,
            success: function(result) {
                $("#software-assets").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    const addNameField = $("#add-software-asset-form #add-software-asset-name");
    const addNameError = $("#add-software-asset-form #add-software-asset-name-error");

    const addUsernameField = $("#add-software-asset-form #add-software-asset-username");
    const addUsernameError = $("#add-software-asset-form #add-software-asset-username-error");

    const addPasswordField = $("#add-software-asset-form #add-software-asset-password");
    const addPasswordError = $("#add-software-asset-form #add-software-asset-password-error");

    const addLoginUrlField = $("#add-software-asset-form #add-software-asset-login-url");
    const addLoginUrlError = $("#add-software-asset-form #add-software-asset-login-url-error");

    const addOwnerField = $("#add-software-asset-form #add-software-asset-owner");
    const addOwnerError = $("#add-software-asset-form #add-software-asset-owner-error");

    const addRenewalDateField = $("#add-software-asset-form #add-software-asset-renewal-date");
    const addRenewalDateError = $("#add-software-asset-form #add-software-asset-renewal-date-error");

    const addRenewalTypeIdField = $("#add-software-asset-form #add-software-asset-renewal-type");
    const addRenewalTypeIdError = $("#add-software-asset-form #add-software-asset-renewal-type-error");

    const addCostField = $("#add-software-asset-form #add-software-asset-cost");
    const addCostError = $("#add-software-asset-form #add-software-asset-cost-error");

    const addRepresentativeContactField = $("#add-software-asset-form #add-software-asset-representative-contact");
    const addRepresentativeContactError = $("#add-software-asset-form #add-software-asset-representative-contact-error");

    const addLicenseKeyField = $("#add-software-asset-form #add-software-asset-license-key");
    const addLicenseKeyError = $("#add-software-asset-form #add-software-asset-license-key-error");

    const addNotesField = $("#add-software-asset-form #add-software-asset-notes");
    const addNotesError = $("#add-software-asset-form #add-software-asset-notes-error");

    $('#add-software-asset-form').on("submit", function (event) {
          event.preventDefault();

          const renewalTypeId = addRenewalTypeIdField.siblings('.menu').children('.item.active.selected').data('value');
          if (!renewalTypeId) { var renewalType = ""; }

          $.ajax({
              type: 'POST',
              url: createSoftwareAssetsUrl,
              data: $(this).find(":input[value!='']").serialize() + `&renewal_type_id=${renewalTypeId}`, //replaces empty date/cost values to blank field on front end
              success: function(result) {
                  $("#add-software-asset").modal('hide');
                  $("#software-assets").DataTable().ajax.reload();
              },
              error: function(result) {
                  const errors = result.responseJSON;
                  if (! errors.name == '') {
                      if (! errors.name == addNameError.val()) {
                          addNameError.empty(); // empty error messages, if there were any
                          addNameError.append(errors.name); // display the error messages
                      }
                      if (! addNameField.hasClass('is-invalid')) {
                          addNameField.addClass('is-invalid');
                          addNameField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.username == '') {
                      if (! errors.username == addUsernameError.val()) {
                          addUsernameError.empty(); // empty error messages, if there were any
                          addUsernameError.append(errors.username); // display the error messages
                      }
                      if (! addUsernameField.hasClass('is-invalid')) {
                          addUsernameField.addClass('is-invalid');
                          addUsernameField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.password == '') {
                      if (! errors.password == addPasswordError.val()) {
                          addPasswordError.empty(); // empty error messages, if there were any
                          addPasswordError.append(errors.password); // display the error messages
                      }
                      if (! addPasswordField.hasClass('is-invalid')) {
                          addPasswordField.addClass('is-invalid');
                          addPasswordField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.login_url == '') {
                      if (! errors.login_url == addLoginUrlError.val()) {
                          addLoginUrlError.empty(); // empty error messages, if there were any
                          addLoginUrlError.append(errors.login_url); // display the error messages
                      }
                      if (! addLoginUrlField.hasClass('is-invalid')) {
                          addLoginUrlField.addClass('is-invalid');
                          addLoginUrlField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.owner == '') {
                      if (! errors.owner == addOwnerError.val()) {
                          addOwnerError.empty(); // empty error messages, if there were any
                          addOwnerError.append(errors.owner); // display the error messages
                      }
                      if (! addOwnerField.hasClass('is-invalid')) {
                          addOwnerField.addClass('is-invalid');
                          addOwnerField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.renewal_date == '') {
                      if (! errors.renewal_date == addRenewalDateError.val()) {
                          addRenewalDateError.empty(); // empty error messages, if there were any
                          addRenewalDateError.append(errors.renewal_date); // display the error messages
                      }
                      if (! addRenewalDateField.hasClass('is-invalid')) {
                          addRenewalDateField.addClass('is-invalid');
                          addRenewalDateField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.renewal_type_id == '') {
                      if (! errors.renewal_type_id == addRenewalTypeError.val()) {
                          addRenewalTypeError.empty(); // empty error messages, if there were any
                          addRenewalTypeError.append(errors.renewal_type_id); // display the error messages
                      }
                      if (! addRenewalTypeField.hasClass('is-invalid')) {
                          addRenewalTypeField.addClass('is-invalid');
                          addRenewalTypeField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.cost == '') {
                      if (! errors.cost == addCostError.val()) {
                          addCostError.empty(); // empty error messages, if there were any
                          addCostError.append(errors.cost); // display the error messages
                      }
                      if (! addCostField.hasClass('is-invalid')) {
                          addCostField.addClass('is-invalid');
                          addCostField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.notes == '') {
                      if (! errors.notes == addNotesError.val()) {
                          addNotesError.empty(); // empty error messages, if there were any
                          addNotesError.append(errors.notes); // display the error messages
                      }
                      if (! addNotesField.hasClass('is-invalid')) {
                          addNotesField.addClass('is-invalid');
                          addNotesField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.representative_contact == '') {
                      if (! errors.representative_contact == addRepresentativeContactError.val()) {
                          addRepresentativeContactError.empty(); // empty error messages, if there were any
                          addRepresentativeContactError.append(errors.representative_contact); // display the error messages
                      }
                      if (! addRepresentativeContactField.hasClass('is-invalid')) {
                          addRepresentativeContactField.addClass('is-invalid');
                          addRepresentativeContactField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! errors.license_keys == '') {
                      if (! errors.license_keys == addLicenseKeyError.val()) {
                          addLicenseKeyError.empty(); // empty error messages, if there were any
                          addLicenseKeyError.append(errors.license_keys); // display the error messages
                      }
                      if (! addLicenseKeyField.hasClass('is-invalid')) {
                          addLicenseKeyField.addClass('is-invalid');
                          addLicenseKeyField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  var today = new Date();
                  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                  console.log("AJAX error, check server logs near local time: " + time);
              }
          });
    });
});
