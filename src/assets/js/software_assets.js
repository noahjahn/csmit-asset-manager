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

function updateSoftwareAsset(id) {
    const $sliderContents = $(`#edit-software-asset-${id}`);
    const $parentRow = $sliderContents.parent().parent().prev('.edit-mode');
    const $nameField = $parentRow.find('#edit-software-asset-name');
    const $nameError = $parentRow.find('#edit-software-asset-name-error');
    const $usernameField = $parentRow.find('#edit-software-asset-username');
    const $usernameError = $parentRow.find('#edit-software-asset-username-error');
    const $loginUrlField = $parentRow.find('#edit-software-asset-login-url');
    const $loginUrlError = $parentRow.find('#edit-software-asset-login-url-error');
    const $renewalDateField = $parentRow.find('#edit-software-asset-renewal-date');
    const $renewalDateError = $parentRow.find('#edit-software-asset-renewal-error');
    const $costField = $parentRow.find('#edit-software-asset-cost');
    const $costError = $parentRow.find('#edit-software-asset-cost-error');
    const $ownerField = $parentRow.find('#edit-software-asset-owner');
    const $ownerError = $parentRow.find('#edit-software-asset-owner-error');
    const $passwordField = $sliderContents.find('#edit-software-asset-password');
    const $passwordError = $sliderContents.find('#edit-software-asset-password-error');
    const $representativeContactField = $sliderContents.find('#edit-software-asset-representative-contact');
    const $representativeContactError = $sliderContents.find('#edit-software-asset-representative-contact-error');
    const $licenseKeyField = $sliderContents.find('#edit-software-asset-license-key');
    const $licenseKeyError = $sliderContents.find('#edit-software-asset-license-key-error');
    const $notesField = $sliderContents.find('#edit-software-asset-notes');
    const $notesError = $sliderContents.find('#edit-software-asset-notes-error');

    const softwareAsset = {
        id,
        name: $nameField.val(),
        username: $usernameField.val(),
        login_url: $loginUrlField.val(),
        renewal_date: $renewalDateField.val(),
        cost: (Math.round($costField.val() * 100) / 100).toFixed(2),
        owner: $ownerField.val(),
        password: $passwordField.val(),
        representative_contact: $representativeContactField.val(),
        license_keys: $licenseKeyField.val(),
        notes: $notesField.val(),
    }

    const formData = new FormData();
    Object.keys(softwareAsset).forEach((key) => {
        formData.append(key, softwareAsset[key]);
    });

    fetch(updateSoftwareAssetsUrl, {
        method: 'POST',
        body: formData,
    }).then((response) => {
        if (response.status >= 200 && response.status <= 300) {
            $("#software-assets").DataTable().ajax.reload();
        } else {
            response.json().then((errors) => {
                console.log(errors);
                if (! errors.name == '') {
                    if (! errors.name == $nameError.val()) {
                        $nameError.empty(); // empty error messages, if there were any
                        $nameError.append(errors.name); // display the error messages
                    }
                    if (! $nameField.hasClass('is-invalid')) {
                        $nameField.addClass('is-invalid');
                        $nameField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.username == '') {
                    if (! errors.username == $usernameError.val()) {
                        $usernameError.empty(); // empty error messages, if there were any
                        $usernameError.append(errors.username); // display the error messages
                    }
                    if (! $usernameField.hasClass('is-invalid')) {
                        $usernameField.addClass('is-invalid');
                        $usernameField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.password == '') {
                    if (! errors.password == $passwordError.val()) {
                        $passwordError.empty(); // empty error messages, if there were any
                        $passwordError.append(errors.password); // display the error messages
                    }
                    if (! $passwordField.hasClass('is-invalid')) {
                        $passwordField.addClass('is-invalid');
                        $passwordField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.login_url == '') {
                    if (! errors.login_url == $loginUrlError.val()) {
                        $loginUrlError.empty(); // empty error messages, if there were any
                        $loginUrlError.append(errors.login_url); // display the error messages
                    }
                    if (! $loginUrlField.hasClass('is-invalid')) {
                        $loginUrlField.addClass('is-invalid');
                        $loginUrlField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.owner == '') {
                    if (! errors.owner == $ownerError.val()) {
                        $ownerError.empty(); // empty error messages, if there were any
                        $ownerError.append(errors.owner); // display the error messages
                    }
                    if (! $ownerField.hasClass('is-invalid')) {
                        $ownerField.addClass('is-invalid');
                        $ownerField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.renewal_date == '') {
                    if (! errors.renewal_date == $renewalDataError.val()) {
                        $renewalDataError.empty(); // empty error messages, if there were any
                        $renwalDataError.append(errors.renewal_date); // display the error messages
                    }
                    if (! $renewalDataField.hasClass('is-invalid')) {
                        $renewalDataField.addClass('is-invalid');
                        $renewalDataField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                // if (! errors.renewal_type_id == '') {
                //     if (! errors.renewal_type_id == $renewalT.val()) {
                //         addRenewalTypeError.empty(); // empty error messages, if there were any
                //         addRenewalTypeError.append(errors.renewal_type_id); // display the error messages
                //     }
                //     if (! addRenewalTypeField.hasClass('is-invalid')) {
                //         addRenewalTypeField.addClass('is-invalid');
                //         addRenewalTypeField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                //     }
                // }
                if (! errors.cost == '') {
                    if (! errors.cost == $costError.val()) {
                        $costError.empty(); // empty error messages, if there were any
                        $costError.append(errors.cost); // display the error messages
                    }
                    if (! $costField.hasClass('is-invalid')) {
                        $costField.addClass('is-invalid');
                        $costField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.notes == '') {
                    if (! errors.notes == $renewalNotesError.val()) {
                        $renewalNotesError.empty(); // empty error messages, if there were any
                        $renewalNotesError.append(errors.notes); // display the error messages
                    }
                    if (! $renewalNotesField.hasClass('is-invalid')) {
                        $renewalNotesField.addClass('is-invalid');
                        $renewalNotesField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.representative_contact == '') {
                    if (! errors.representative_contact == $representativeContactError.val()) {
                        $representativeContactError.empty(); // empty error messages, if there were any
                        $representativeContactError.append(errors.representative_contact); // display the error messages
                    }
                    if (! $representativeContactField.hasClass('is-invalid')) {
                        $representativeContactField.addClass('is-invalid');
                        $representativeContactField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
                if (! errors.license_keys == '') {
                    if (! errors.license_keys == $licenseKeyError.val()) {
                        $licenseKeyError.empty(); // empty error messages, if there were any
                        $licenseKeyError.append(errors.license_keys); // display the error messages
                    }
                    if (! $licenseKeyField.hasClass('is-invalid')) {
                        $licenseKeyField.addClass('is-invalid');
                        $licenseKeyField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                }
    
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            });
        }
    });
}

function replaceParentRowWithReadOnlyFields($parentRow, softwareAsset) {
    $parentRow.find('.name').html(`${softwareAsset.name}`);
    $parentRow.find('.username').html(`${softwareAsset.username}`);
    $parentRow.find('.login-url').html(`${softwareAsset.login_url}`);
    $parentRow.find('.renewal-date').html(`${softwareAsset.renewal_date}`);
    $parentRow.find('.renewal-type-name').html(`${softwareAsset.renewal_type_name}`);
    $parentRow.find('.cost').html(`$${softwareAsset.cost}`);
    $parentRow.find('.owner').html(`${softwareAsset.owner}`);
}

function changeToReadOnly(softwareAsset) {
    const $slider = $(`#edit-software-asset-${softwareAsset.id}`).parent();
    console.log($slider);
    $slider.html(getChildReadOnlyContent(softwareAsset));
    const $parentRow = $slider.prev();
    console.log($parentRow);
    replaceParentRowWithReadOnlyFields($parentRow, softwareAsset);
    $parentRow.removeClass('edit-mode');
}

function getChildReadOnlyContent(softwareAsset) {
    return `
        <div class="slider">
            <table class="edit-table row">
                <tr class="edit-row">
                    <td class="edit-col">
                        <div>
                            <label>Password</label>
                        </div>
                        <div>
                            <a href="#" onclick="showOrHidePassword(this)" data-password="${softwareAsset.password}"><p>*******</p></a>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Representative Contact</label>
                        </div>
                        <div>
                            <p>${softwareAsset.representative_contact}</p>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>License Key</label>
                        </div>
                        <div>
                            <p>${softwareAsset.license_keys}</p>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Last Modified Time</label>
                        </div>
                        <div>
                            <p>${softwareAsset.last_modified_time}</p>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Notes</label>
                        </div>
                        <div>
                            <p>${softwareAsset.notes}</p>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;
}

function getChildEditableContent(softwareAsset) {
    return `
        <div id="edit-software-asset-${softwareAsset.id}" class="slider">
            <table class="edit-table row">
                <tr class="edit-row">
                    <td class="edit-col">
                        <div>
                            <label>Password</label>
                        </div>
                        <div>
                            <input type="password" id="edit-software-asset-password" name="password" class="form-control in-row-edit" autocomplete="new-password" value="${softwareAsset.password}">
                            <div id="edit-software-asset-password-error" class="invalid-feedback"></div>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Representative Contact</label>
                        </div>
                        <div>
                            <input type="text" id="edit-software-asset-representative-contact" name="representative_contact" class="form-control in-row-edit" value="${softwareAsset.representative_contact}">
                            <div id="edit-software-asset-representative-contact-error" class="invalid-feedback"></div>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>License Key</label>
                        </div>
                        <div>
                            <input type="text" id="edit-software-asset-license-key" name="license_key" class="form-control in-row-edit" value="${softwareAsset.license_keys}">
                            <div id="edit-software-asset-license-key-error" class="invalid-feedback"></div>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Last Modified Time</label>
                        </div>
                        <div>
                            <p class="software-assets-last-modified-time">${softwareAsset.last_modified_time}</p>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Notes</label>
                        </div>
                        <div>
                            <input type="text" id="edit-software-asset-notes" name="notes" class="form-control in-row-edit" value="${softwareAsset.notes}">
                            <div id="edit-software-asset-notes-error" class="invalid-feedback"></div>
                        </div>
                    </td>
                    <td class="edit-col">
                        <div>
                            <label>Actions</label>
                        </div>
                        <div>
                            <button class="btn btn-primary" onclick="updateSoftwareAsset(${softwareAsset.id})">Save</button>
                            <button class="btn btn-danger" onclick='changeToReadOnly(${JSON.stringify(softwareAsset)})'>Cancel</button>
                        </div>
                    </td
                </tr>
            </table>
        </div>
    `;
}

function replaceParentRowWithEditableFields($parentRow, softwareAsset) {
    $parentRow.find('.name').html(`
        <input type="text" id="edit-software-asset-name" name="name" class="form-control in-row-edit" value="${softwareAsset.name}">
        <div id="edit-software-asset-name-error" class="invalid-feedback"></div>
    `);
    $parentRow.find('.username').html(`
        <input type="text" id="edit-software-asset-username" name="username" class="form-control in-row-edit" value="${softwareAsset.username}">
        <div id="edit-software-asset-username-error" class="invalid-feedback"></div>
    `);
    $parentRow.find('.login-url').html(`
        <input type="text" id="edit-software-asset-login-url" name="login_url" class="form-control in-row-edit" value="${softwareAsset.login_url}">
        <div id="edit-software-asset-login-url-error" class="invalid-feedback"></div>
    `);
    $parentRow.find('.renewal-date').html(`
        <input type="date" id="edit-software-asset-renewal-date" name="renewal_date" class="form-control in-row-edit" value="${softwareAsset.renewal_date}">
        <div id="edit-software-asset-renewal-date-error" class="invalid-feedback"></div>
    `);
    $parentRow.find('.renewal-type-name').html(`

    `);
    $parentRow.find('.cost').html(`
        <input type="number" step="0.01" id="edit-software-asset-cost" name="cost" class="form-control in-row-edit" value="${softwareAsset.cost}">
        <div id="edit-software-asset-cost-error" class="invalid-feedback"></div>
    `);
    $parentRow.find('.owner').html(`
        <input type="text" id="edit-software-asset-owner" name="owner" class="form-control in-row-edit" value="${softwareAsset.owner}">
        <div id="edit-software-asset-owner-error" class="invalid-feedback"></div>
    `);
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
           {
               "data": "name",
               "sClass": "name",
           },
           {
               "data": "username",
               "sClass": "username",
           },
           {
               "data": "login_url",
               "sClass": "login-url",
           },
           {
               "data": "renewal_date",
               "sClass": "renewal-date",
           },
           {
               "data": "renewal_type_name",
               "sClass": "renewal-type-name",
           },
           {
               "data": "cost",
               "sClass": "cost",
           },
           {
               "data": "owner",
               "sClass": "owner",
           },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" data-toggle="modal" data-target="#edit-software-asset" data-type="POST" data-tableid="software-assets" data-id = "' + row.id + '" data-url="SoftwareAssets/update/' + row.id + '"><img class="mini-icon" id="edit-software-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
               }
           },
           { "render": function ( data, type, row ) {
                   return '<button class="table-icon" data-toggle="modal" data-target="#delete-software-asset" data-type="DELETE" data-tableid="software-assets" data-id = "' + row.id + '"data-url="SoftwareAssets/delete/' + row.id + '"><img class="mini-icon" id="delete-software-asset-button" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
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
        console.log(row);
        const softwareAsset = row.data();
        const parentRow = $(event.currentTarget);
        if (row.child.isShown()) {
            if (!parentRow.hasClass('edit-mode')) {
                if (event.target.id === 'edit-software-asset-button') {
                    console.log(row.child());
                    let slider = $(row.child(), 'td.slider');
                    console.log(slider);
                    slider.html(getChildEditableContent(softwareAsset));
                    replaceParentRowWithEditableFields(parentRow, softwareAsset);
                    parentRow.addClass('edit-mode');
                } else {
                    $('div.slider', row.child()).slideUp(300, function () {
                        row.child.hide();
                    });
                }
            }
        } else {
            let slider;
            if (event.target.id === 'edit-software-asset-button') {
                row.child(getChildEditableContent(softwareAsset), 'slider').show();
                console.log(row.child());
                slider = $('div.slider', row.child());
                console.log(slider);
                replaceParentRowWithEditableFields(parentRow, softwareAsset);
                parentRow.addClass('edit-mode');
                const clickedEditButton = $(event.target).parent();
                clickedEditButton.addClass('d-none');
                const deleteButton = clickedEditButton.parent().siblings().find('#delete-software-asset-button');
                deleteButton.addClass('d-none');
            } else {
                row.child(getChildReadOnlyContent(softwareAsset), 'slider').show();
                slider = $('div.slider', row.child());
            }
            slider.slideDown(300);
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
        const formData = new FormData(document.getElementById('add-software-asset-form'));
        formData.set('cost', ((Math.round(formData.get('cost')  * 100) / 100).toFixed(2)));
        fetch(createSoftwareAssetsUrl, {
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.status >= 200 && response.status <= 300) {
                $("#add-software-asset").modal('hide');
                $("#software-assets").DataTable().ajax.reload();
                document.getElementById('add-software-asset-form').reset();
            } else {
                response.json().then((errors) => {
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
                });
            }
        });
    });
});
