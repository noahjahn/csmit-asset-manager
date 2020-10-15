//Controller function URLs
var deleteAssetUrl = baseUrl + "AssetManager/delete/";
var addAssetUrl = baseUrl + "AssetManager/add";
var editAssetUrl = baseUrl + "AssetManager/edit";
var getActiveManufacturersUrl = baseUrl + "Manufacturers/get_active";
var getActiveModelsUrl = baseUrl + "Models/get_active";
var getActiveModelsByManufacturerIdUrl = baseUrl + "Models/get_active_by_manufacturer_id";
var getActiveTypesUrl = baseUrl + "AssetTypes/get_active";
var getActiveTeamsUrl = baseUrl + "Teams/get_active";

var manufacturersDropdown = [];
var modelsDropdown = [];
var typesDropdown = [];
var teamsDropdown = [];

//Sort function for dropdowns
function compareStrings(str1, str2) {
    str1 = str1.toLowerCase();
    str2 = str2.toLowerCase();
    return (str1 < str2) ? -1 : (str1 > str2) ? 1 : 0;
}

$(document).ready( function () {
    //Fit table to screen size when page loads
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();

    /***Variables for add/edit field dropdown menus****/
    /****End dropdown fields*************************/


/*******************************************************************************
Build Asset Manager table
*******************************************************************************/
    var table = $('#asset-manager').DataTable( {
        ajax: {
            url: baseUrl + "AssetManager/get_active",
            dataSrc: ''
        },
        columnDefs: [
            { "className": "asset_manager_id", "targets": 0 },
            { "className": "asset_manager_model", "targets": 1 },
            { "className": "asset_manager_manufacturer", "targets": 2 },
            { "className": "asset_manager_owner", "targets": 3 },
            { "className": "asset_manager_type", "targets": 4 },
            { "className": "asset_manager_asset_tag", "targets": 5 },
            { "className": "asset_manager_team", "targets": 6 },
            { "className": "asset_manager_rate", "targets": 7 },
            { "responsivePriority": -1, "targets": [8,9] },
            { "width": "10px", "targets": [8,9] },
            { "orderable": false, "targets": [8,9,10,11,12,13,14,15,16,17,18,19,20,21] },
            { "visible": false, "targets": [0,10,11,12,13,14,15,16,17,18,19,20,21] }
        ],
        columns: [
            { "data": "id" },
            { "data": "model" },
            { "data": "manufacturer" },
            { "data": "owner" },
            { "data": "type" },
            { "data": "asset_tag" },
            { "data": "team" },
            { "data": "rate" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" id="edit-asset-button" data-toggle="modal" data-target="#edit-asset" data-type="POST" data-tableid="asset-manager" data-id = "' + row.id + '" data-url="AssetManager/edit/' + row.id + '"><img class="mini-icon" id="edit-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" id="delete-asset-button" data-toggle="modal" data-target="#delete-asset" data-type="DELETE" data-tableid="asset-manager" data-id = "' + row.id + '"data-url="AssetManager/delete/' + row.id + '"><img class="mini-icon" id="delete-asset-button" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button>';
                }
            },
            //Child row fields.
            { "data": "serial_number" },
            { "data": "purchase_price" },
            { "data": "job_number" },
            { "data": "purchase_date" },
            { "data": "notes" },
            { "data": "last_modified_time" },
            { "data": "manufacturer_id" },
            { "data": "model_id" },
            { "data": "type_id" },
            { "data": "team_id" },
            { "data": "phone_number" },
            { "data": "imei" }
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
                text: "Add Asset",
                action: function() {
                    $('#add-asset').modal('show');
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                },
                className: 'btn-primary',
                attr: {
                    id: 'add-asset-btn'
                }
            }
        ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        },
        createdRow: function (row, data, index) {
            $(row).addClass('parent-row'); //Add class used for dropdown
        },
        initComplete: function(settings, json) {
            $('#asset-manager_filter input').unbind();
            $('#asset-manager_filter input').bind('keyup', function(e) {
                if (e.keyCode == 13) {
                    table.search( this.value ).draw();
                }
            });
        }
    });
/****************************End Build Table **********************************/

/********* Manufacturer Dropdown **********/
    //Prepare data
    loadManufacturers();
    loadModels();
    loadTypes();
    loadTeams();
/********* End Manufacturer Dropdown **********/

    manufacturersIsInitialized = false;

    $('#add-asset-btn').on("click", function () {
        // $('#add-asset-manufacturer').dropdown({
        //     values: manufacturersDropdown
        // });

        $('#add-asset-model').dropdown({
              values: modelsDropdown
        });

        // $('#add-asset-manufacturer').dropdown('setting', 'onChange', function(value) {
        //     var filteredModels = filterModelsByManufacturer(value);
        //     $('#add-asset-model').dropdown('change values', filteredModels);
        // });

        $('#add-asset-model').dropdown('setting', 'onChange', function(modelId) {
            var action = 'add';
            var manufacturerId = getModelManufacturer(modelId);
            setManufacturer(getManufacturerName(manufacturerId), manufacturerId, action);
            var assetTypeId = getModelAssetType(modelId);
            setAssetType(getAssetTypeName(assetTypeId), assetTypeId, action);
            setRate(getRate(modelId), action);
        });

        $('#add-asset-team').dropdown({
              values: teamsDropdown
        });
    });

/*******************************************************************************
********************************************************************************
ROW-CLICK EVENT

Decision Path:

-IF Detail Row is Expanded before clicking (row.child.isshown)
    +In Edit mode
        >Save Button clicked              : Save changes and re-display new data
        >Anything else                    : Nothing
    +Not in Edit mode
        >Edit Button clicked              : Enable editing
        >Delete Button clicked            : Open delete menu
        >Anywhere else on the row clicked : Close detail row

-IF Detail Row is Closed before clicking
        >Edit Button clicked              : Expand detail row and enable editing
        >Delete Button clicked            : Open delete menu
        >Anywhere else on the row clicked : Expand details row
********************************************************************************
*******************************************************************************/
$('#asset-manager').on('click', '.parent-row', function(e) {
    // Get row we're on
    var tr = $(this);
    var row = table.row(this);

    // Get current values in row.
    // Replace inputs with these after editing if nothing was changed.
    //--STILL NEED-- Update field if the value changed.
    var id = table.cell(row,0).data();
    var model = table.cell(row,1).data();
    var manufacturer = table.cell(row,2).data();
    var owner = table.cell(row,3).data();
    var type = table.cell(row,4).data();
    var asset_tag = table.cell(row,5).data();
    var team = table.cell(row,6).data();
    var rate = table.cell(row,7).data();
    var serial_number = table.cell(row,10).data();
    var purchase_price = table.cell(row,11).data();
    var job_number = table.cell(row,12).data();
    var purchase_date = table.cell(row,13).data();
    var notes = table.cell(row,14).data();
    var last_modified_time = table.cell(row,15).data();
    var phone_number = table.cell(row,20).data();
    var imei = table.cell(row,21).data();


    /****************IF Detail Row is EXPANDED before clicking*********************/
    if (row.child.isShown() ) {
        /**********************If row is in edit mode************************/
        if ($(this).hasClass('edit-mode')) {
            /**********If the save button is clicked**********/
            if (e.target.id == 'edit-asset-button') {
                var editManufacturerIdField = $("#edit-asset-manufacturer");
                var editModelIdField = $("#edit-asset-model");
                var editOwnerField = $("#edit-asset-owner");
                var editSerialNumberField = $("#edit-asset-serial-number");
                var editTypeIdField = $("#edit-asset-type");
                var editAssetTagField = $("#edit-asset-asset-tag");
                var editTeamIdField = $("#edit-asset-team");
                var editPhoneNumberField = $("#edit-asset-phone-number");
                var editImeiField = $("#edit-asset-imei");
                var editPurchasePriceField = $("#edit-asset-purchase-price");
                var editPurchaseDateField = $("#edit-asset-purchase-date");
                var editJobNumberField = $("#edit-asset-job-number");

                var modelId = $('#edit-asset-model').siblings('.menu').children('.item.active.selected').data('value');
                var manufacturerId = $(this).find('.asset_manager_manufacturer input').data('manufacturer_id');
                var typeId = $(this).find('.asset_manager_type input').data('type_id');
                var teamId = $('#edit-asset-team').siblings('.menu').children('.item.active.selected').data('value');

                var serializedData = "id=" + id + "&model_id=" +  modelId + "&manufacturer_id=" + manufacturerId + "&type_id=" + typeId + "&team_id=" + teamId + "&";
                serializedData = serializedData + $(this).find('.asset_manager_owner :input').serialize() + "&";
                serializedData = serializedData + $(this).find('.asset_manager_asset_tag :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_serial_number :input').serialize()  + "&";
                serializedData = serializedData + row.child().find('.asset_manager_purchase_price :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_purchase_date :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_job_number :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_notes :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_phone_number :input').serialize() + "&";
                serializedData = serializedData + row.child().find('.asset_manager_imei :input').serialize() + "&";

                // Push changes to Database
                $.ajax({
                    type: 'POST',
                    url: editAssetUrl,
                    dataType: 'json',
                    data: serializedData,
                    success: function(result) {
                        if (result == "success") {
                            // leave edit mode
                            $(this).removeClass('edit-mode');

                            // Make delete trash-icon visible and usable.
                            $(this).find('#delete-asset-button').attr('data-target','#delete-asset');
                            $(this).find('#delete-asset-button').css('display','block');

                            // Remove Save button, and replace with Edit Button
                            $(this).find('#edit-asset-button').replaceWith('<button class="table-icon" id="edit-asset-button" data-toggle="modal" data-target="#edit-asset" data-type="POST" data-tableid="asset-manager" data-id = "' + row.id + '" data-url="AssetManager/edit/' + row.id + '"><img class="mini-icon" id="edit-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>');

                            $("#asset-manager").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
                        } else {
                            if (! result["manufacturer_id"] == "") {
                                if (! editManufacturerIdField.parent().hasClass('is-invalid-dropdown')) {
                                    editManufacturerIdField.parent().addClass('is-invalid-dropdown');
                                    editManufacturerIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                                    editManufacturerIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["model_id"] == "") {
                                if (! editModelIdField.parent().hasClass('is-invalid-dropdown')) {
                                    editModelIdField.parent().addClass('is-invalid-dropdown');
                                    editModelIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                                    editModelIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["owner"] == "") {
                                if (! editOwnerField.hasClass('is-invalid')) {
                                    editOwnerField.addClass('is-invalid');
                                    editOwnerField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["serial_number"] == "") {
                                if (! editSerialNumberField.hasClass('is-invalid')) {
                                    editSerialNumberField.addClass('is-invalid');
                                    editSerialNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["type_id"] == "") {
                                if (! editTypeIdField.parent().hasClass('is-invalid-dropdown')) {
                                    editTypeIdField.parent().addClass('is-invalid-dropdown');
                                    editTypeIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                                    editTypeIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["asset_tag"] == "") {
                                if (! editAssetTagField.hasClass('is-invalid')) {
                                    editAssetTagField.addClass('is-invalid');
                                    editAssetTagField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["team_id"] == "") {
                                if (! editTeamIdField.parent().hasClass('is-invalid-dropdown')) {
                                    editTeamIdField.parent().addClass('is-invalid-dropdown');
                                    editTeamIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                                    editTeamIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["purchase_price"] == "") {
                                if (! editPurchasePriceField.hasClass('is-invalid')) {
                                    editPurchasePriceField.addClass('is-invalid');
                                    editPurchasePriceField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["purchase_date"] == "") {
                                if (! editPurchaseDateField.hasClass('is-invalid')) {
                                    editPurchaseDateField.addClass('is-invalid');
                                    editPurchaseDateField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["job_number"] == "") {
                                if (! editJobNumberField.hasClass('is-invalid')) {
                                    editJobNumberField.addClass('is-invalid');
                                    editJobNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["phone_number"] == "") {
                                if (! editPhoneNumberField.hasClass('is-invalid')) {
                                    editPhoneNumberField.addClass('is-invalid');
                                    editPhoneNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                                }
                            }
                            if (! result["imei"] == "") {
                                if (! editImeiField.hasClass('is-invalid')) {
                                    editImeiField.addClass('is-invalid');
                                    editImeiField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
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

                /**If edit was clicked, save changes**/
                //  var serial_number = table.cell(row,10).data();
                //var serial_number = table.cell(row,10).data();
                //  var serial_number = table.cell(row,10).data();

                // $(this).find('.asset_manager_model').html(model);
                // $(this).find('.asset_manager_manufacturer').html(manufacturer);
                // $(this).find('.asset_manager_owner').html(owner);
                // $(this).find('.asset_manager_type').html(type);
                // $(this).find('.asset_manager_asset_tag').html(asset_tag);
                // $(this).find('.asset_manager_team').html(team);
                // $(this).find('.asset_manager_rate').html(rate);
                // row.child().find("p.asset_manager_serial_number").html(serial_number);
                // row.child().find("p.asset_manager_purchase_price").html(purchase_price);
                // row.child().find("p.asset_manager_job_number").html(job_number);
                // row.child().find("p.asset_manager_purchase_date").html(purchase_date);
                // row.child().find("p.asset_manager_notes").html(notes);
                // row.child().find("p.asset_manager_last_modified_time").html(last_modified_time);

            } else {     /**********If the save button is not clicked**********/
            // do nothing.
            }
        } else { /**********************If row is NOT in edit mode**********************/
            if (e.target.id == 'edit-asset-button') { /**********If the edit button is clicked**********/
                // Enter edit mode
                $(this).addClass('edit-mode');

                // dropdown Variables
                var manufacturer_id = table.cell(row,16).data();
                var model_id = table.cell(row,17).data();
                var type_id = table.cell(row,18).data();
                var team_id = table.cell(row,19).data();

                // Hide delete Trash-icon
                $(this).find('#delete-asset-button').attr('data-target','');
                $(this).find('#delete-asset-button').css('display','none');

                // Replace edit button with save button
                $(this).find('img#edit-asset-button.mini-icon').remove();
                $(this).find('button#edit-asset-button.table-icon').replaceWith('<button id="edit-asset-button" type="button" class="btn btn-primary">Save</button>');

                /**If edit was clicked, open input fields and ensure details are expanded.**/
                // Parent row fields
                // Model
                var record = $(this);
                $(this).find('.asset_manager_model').html('<select id="edit-asset-model" name="model_id" class="form-control ui search dropdown in-row-edit-dropdown" value="<?php set_value(\'model_id\'); ?>"></select>');
                $(this).find('#edit-asset-model').dropdown({
                    values: modelsDropdown,
                    onChange: function (modelId) {
                        var action = 'edit';
                        var manufacturerId = getModelManufacturer(modelId);
                        setManufacturer(getManufacturerName(manufacturerId), manufacturerId, action, record);
                        var assetTypeId = getModelAssetType(modelId);
                        setAssetType(getAssetTypeName(assetTypeId), assetTypeId, action, record);
                        setRate(getRate(modelId), action, record);
                    }
                });
                $(this).find('#edit-asset-model').dropdown('set selected', model_id);

                // Manufacturer
                $(this).find('.asset_manager_manufacturer').html('<input type="text" name="manufacturer_id" class="in-row-edit form-control" placeholder="" disabled></input>');
                $(this).find('.asset_manager_manufacturer .in-row-edit').attr("placeholder", manufacturer);
                $(this).find('.asset_manager_manufacturer .in-row-edit').attr('data-manufacturer_id', manufacturer_id);

                // Owner
                $(this).find('.asset_manager_owner').html('<input type="text" name="owner" class="in-row-edit form-control"></input>');
                $(this).find('.asset_manager_owner .in-row-edit').attr('value', owner);

                // Type
                $(this).find('.asset_manager_type').html('<input type="text" name="type_id" class="in-row-edit form-control" placeholder="" disabled></input>');
                $(this).find('.asset_manager_type .in-row-edit').attr("placeholder", type);
                $(this).find('.asset_manager_type .in-row-edit').attr('data-type_id', type_id);

                // Asset Tag
                $(this).find('.asset_manager_asset_tag').html('<input type="text" name="asset_tag" class="in-row-edit form-control" name="asset_tag"></input>');
                $(this).find('.asset_manager_asset_tag .in-row-edit').attr('value', asset_tag)

                // Team
                $(this).find('.asset_manager_team').html('<select id="edit-asset-team" type="text" name="team_id" class="form-control ui search dropdown in-row-edit-dropdown"></select>');
                $(this).find('#edit-asset-team').dropdown({
                    values: teamsDropdown
                });
                $(this).find('#edit-asset-team').dropdown('set selected', team_id);

                // Rate
                // $(this).find('.asset_manager_rate .in-row-edit').attr('value', rate)
                $(this).find('.asset_manager_rate').html('<input type="text" name="rate" class="in-row-edit form-control" placeholder="" disabled></input>');
                $(this).find('.asset_manager_rate .in-row-edit').attr("placeholder", '$' + rate);

                // Child row fields
                // Serial Number
                row.child().find('.asset_manager_serial_number').html('<input type="text" name="serial_number" class="in-row-edit form-control" value="' + serial_number + '"></input>');

                // PHone Number
                row.child().find('.asset_manager_phone_number').html('<input type="text" name="phone_number" class="in-row-edit form-control" value="' + phone_number + '"></input>');

                // IMEI
                row.child().find('.asset_manager_imei').html('<input type="text" name="imei" class="in-row-edit form-control" value="' + imei + '"></input>');

                // Purchase Price
                row.child().find('.asset_manager_purchase_price').html('<input type="text" name="purchase_price" class="in-row-edit form-control" value="' + purchase_price + '"></input>');

                // Job Number
                row.child().find('.asset_manager_job_number').html('<input type="text" name="job_number" class="in-row-edit form-control" value="' + job_number + '"></input>');

                // Purchase Date
                row.child().find('.asset_manager_purchase_date').html('<input type="date" name="purchase_date" class="in-row-edit form-control" value="' + purchase_date + '"></input>');

                // Notes
                row.child().find('.asset_manager_notes').html('<input type="text" name="notes" class="in-row-edit form-control" value="' + notes + '"></input>');
                // Correct the height of the dropdowns.
                //  $(this).find('.in-row-edit-dropdown input').css({'padding-top': '0','horizontal-align': 'center'});
                //  $(this).find('.in-row-edit-dropdown input').css({'padding-bottom': '0','horizontal-align': 'center'});

                $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
            } else if (e.target.id == 'delete-asset-button') { /**********If the delete button is clicked**********/
                // do nothing
            } else { /**********If Anywhere else on the row is clicked**********/
                // Remove light-grey focus styled when detail row is closed
                $(tr).css({"box-shadow":"none"});
                row.child().find('div').css({"box-shadow":"none"});
                // Close detail row
                $('div.slider', row.child()).slideUp( 300,function () {
                    row.child.hide();
                    tr.removeClass('shown');
                });
            }
        }
    /*********END EXPANDED ROW IF***********/
    } else { /****************IF Detail Row is CLOSED before clicking*********************/
        // If child row is NOT shown
        /**********If the edit button is  clicked**********/
        if(e.target.id == 'edit-asset-button') {
            //Enter edit mode
            $(this).addClass('edit-mode');

            //dropdown Variables
            var manufacturer_id = table.cell(row,16).data();
            var model_id = table.cell(row,17).data();
            var type_id = table.cell(row,18).data();
            var team_id = table.cell(row,19).data();

            //Hide delete Trash-icon
            $(this).find('#delete-asset-button').attr('data-target','');
            $(this).find('#delete-asset-button').css('display','none');

            //Replace edit button with save button
            $(this).find('img#edit-asset-button.mini-icon').remove();
            $(this).find('button#edit-asset-button.table-icon').replaceWith('<button id="edit-asset-button" type="button" class="btn btn-primary">Save</button>');

            //Get child row structure
            row.child( formatRow(row.data()), 'slider' ).show();
            //Fill child row fields
            //Slide detail row down
            tr.addClass('shown');
            $('div.slider', row.child()).slideDown(300);
            // Add light-grey focus styling when detail row is opening
            // $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
            // $(tr).css("background-color","#3B3B3B");
            // $(tr).css("box-shadow","inset 0px 2px 2px black");

            /**If edit was clicked, open input fields and ensure details are expanded.**/
            // Parent row fields
            // Model
            var record = $(this);
            $(this).find('.asset_manager_model').html('<select id="edit-asset-model" name="model_id" class="form-control ui search dropdown in-row-edit-dropdown" value="<?php set_value(\'model_id\'); ?>"></select>');
            $(this).find('#edit-asset-model').dropdown({
                values: modelsDropdown,
                onChange: function (modelId) {
                    var action = 'edit';
                    var manufacturerId = getModelManufacturer(modelId);
                    setManufacturer(getManufacturerName(manufacturerId), manufacturerId, action, record);
                    var assetTypeId = getModelAssetType(modelId);
                    setAssetType(getAssetTypeName(assetTypeId), assetTypeId, action, record);
                    setRate(getRate(modelId), action, record);
                }
            });
            $(this).find('#edit-asset-model').dropdown('set selected', model_id);

            // Manufacturer
            $(this).find('.asset_manager_manufacturer').html('<input type="text" name="manufacturer_id" class="in-row-edit form-control" placeholder="" disabled></input>');
            $(this).find('.asset_manager_manufacturer .in-row-edit').attr("placeholder", manufacturer);
            $(this).find('.asset_manager_manufacturer .in-row-edit').attr('data-manufacturer_id', manufacturer_id);

            // Owner
            $(this).find('.asset_manager_owner').html('<input type="text" name="owner" class="in-row-edit form-control"></input>');
            $(this).find('.asset_manager_owner .in-row-edit').attr('value', owner);

            // Type
            $(this).find('.asset_manager_type').html('<input type="text" name="type_id" class="in-row-edit form-control" placeholder="" disabled></input>');
            $(this).find('.asset_manager_type .in-row-edit').attr("placeholder", type);
            $(this).find('.asset_manager_type .in-row-edit').attr('data-type_id', type_id);

            // Asset Tag
            $(this).find('.asset_manager_asset_tag').html('<input type="text" name="asset_tag" class="in-row-edit form-control"></input>');
            $(this).find('.asset_manager_asset_tag .in-row-edit').attr('value', asset_tag)

            // Team
            $(this).find('.asset_manager_team').html('<select id="edit-asset-team" type="text" name="team_id" class="form-control ui search dropdown in-row-edit-dropdown"></select>');
            $(this).find('#edit-asset-team').dropdown({
                values: teamsDropdown
            });
            $(this).find('#edit-asset-team').dropdown('set selected', team_id);

            // Rate
            // $(this).find('.asset_manager_rate .in-row-edit').attr('value', rate)
            $(this).find('.asset_manager_rate').html('<input type="text" name="rate" class="in-row-edit form-control" placeholder="" disabled></input>');
            $(this).find('.asset_manager_rate .in-row-edit').attr("placeholder", '$' + rate);

            // Child row fields
            // Serial Number
            row.child().find('.asset_manager_serial_number').html('<input type="text" name="serial_number" class="in-row-edit form-control" value="' + serial_number + '"></input>');

            // Phone Number
            row.child().find('.asset_manager_phone_number').html('<input type="text" name="phone_number" class="in-row-edit form-control" value="' + phone_number + '"></input>');

            // IMEI
            row.child().find('.asset_manager_imei').html('<input type="text" name="imei" class="in-row-edit form-control" value="' + imei + '"></input>');

            // Purchase Price
            row.child().find('.asset_manager_purchase_price').html('<input type="text" name="purchase_price" class="in-row-edit form-control" value="' + purchase_price + '"></input>');

            // Job Number
            row.child().find('.asset_manager_job_number').html('<input type="text" name="job_number" class="in-row-edit form-control" value="' + job_number + '"></input>');

            // Purchase Date
            row.child().find('.asset_manager_purchase_date').html('<input type="date" name="purchase_date" class="in-row-edit form-control" value="' + purchase_date + '"></input>');

            // Notes
            row.child().find('.asset_manager_notes').html('<input type="text" name="notes" class="in-row-edit form-control" value="' + notes + '"></input>');

            $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();

        } else if (e.target.id == 'delete-asset-button') {//If delete button is clicked
            //Do Nothing *here*. Modal will catch event.
        } else {
            /**********If Anywhere else on the row is clicked**********/
            //Highlight icons
            //Slide detail row down
            tr.addClass('shown');
            //Get child row structure
            row.child( formatRow(row.data()), 'slider' ).show();
            //Fill child row fields
            row.child().find("p.asset_manager_serial_number").html(serial_number);
            row.child().find("p.asset_manager_phone_number").html(phone_number);
            row.child().find("p.asset_manager_imei").html(imei);
            row.child().find("p.asset_manager_purchase_price").html(purchase_price);
            row.child().find("p.asset_manager_job_number").html(job_number);
            row.child().find("p.asset_manager_purchase_date").html(purchase_date);
            row.child().find("p.asset_manager_notes").html(notes);
            row.child().find("p.asset_manager_last_modified_time").html(last_modified_time);
            $('div.slider', row.child()).slideDown(300);
            //Add light-grey focus styling when detail row is opening
            $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
            $(tr).css("background-color","#3B3B3B");
            $(tr).css("box-shadow","inset 0px 2px 2px black");
        }
    } /***************END CLOSED ROW IF***************/
});
/*******************************************************************************
********************************************************************************
END ROW-CLICK EVENT
********************************************************************************
*******************************************************************************/



/**************
Delete Asset
**************/
    $('#asset-manager').on("click", "#delete-asset-button", function () {
        var id = $(this).data('id');
        $("#modal-confirm-delete-asset").data('id', id);

    });

    $('#modal-confirm-delete-asset').on("click", function(e) {
        var id = $("#modal-confirm-delete-asset").data('id');

        $.ajax({
            type: "DELETE",
            url: deleteAssetUrl + id,
            success: function(result) {
                $("#asset-manager").DataTable().ajax.reload();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    addManufacturerIdField = $("#add-asset-form #add-asset-manufacturer");
    addManufacturerIdError = $("#add-asset-form #add-asset-manufacturer-error");

    addModelIdField = $("#add-asset-form #add-asset-model");
    addModelIdError = $("#add-asset-form #add-asset-model-error");

    addOwnerField = $("#add-asset-form #add-asset-owner");
    addOwnerError = $("#add-asset-form #add-asset-owner-error");

    addSerialNumberField = $("#add-asset-form #add-asset-serial-number");
    addSerialNumberError = $("#add-asset-form #add-asset-serial-number-error");

    addTypeIdField = $("#add-asset-form #add-asset-type");
    addTypeIdError = $("#add-asset-form #add-asset-type-error");

    addAssetTagField = $("#add-asset-form #add-asset-asset-tag");
    addAssetTagError = $("#add-asset-form #add-asset-asset-tag-error");

    addTeamIdField = $("#add-asset-form #add-asset-team");
    addTeamIdError = $("#add-asset-form #add-asset-team-error");

    addPhoneNumberField = $("#add-asset-form #add-asset-phone-number");
    addPhoneNumberError = $("#add-asset-form #add-asset-phone-number-error");

    addImeiField = $("#add-asset-form #add-asset-imei");
    addImeiError = $("#add-asset-form #add-asset-imei-error");

    addPurchasePriceField = $("#add-asset-form #add-asset-purchase-price");
    addPurchasePriceError = $("#add-asset-form #add-asset-purchase-price-error");

    addPurchaseDateField = $("#add-asset-form #add-asset-purchase-date");
    addPurchaseDateError = $("#add-asset-form #add-asset-purchase-date-error");

    addJobNumberField = $("#add-asset-form #add-asset-job-number");
    addJobNumberError = $("#add-asset-form #add-asset-job-number-error");

    $('#add-asset-form').on("submit", function (e) {
      e.preventDefault();

      var modelId = $('#add-asset-model').siblings('.menu').children('.item.active.selected').data('value');
      var teamId = $('#add-asset-team').siblings('.menu').children('.item.active.selected').data('value');
      if (!modelId) { var model = ""; }
      if (!teamId) { var team = ""; }

      $.ajax({
          type: 'POST',
          url: addAssetUrl,
          dataType: 'json',
          data: $(this).serialize() + "&model_id=" + modelId + "&team_id=" + teamId, // get data from the form
          success: function(result) {
              if (result == "success") {
                  $("#add-asset").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                  $("#asset-manager").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
              } else {
                  if (! result["model_id"] == "") {
                      if (! result["model_id"] == addModelIdError.val()) {
                          addModelIdError.empty(); // empty error messages, if there were any
                          addModelIdError.append(result["model_id"]); // display the error messages
                      }
                      if (! addModelIdField.parent().hasClass('is-invalid-dropdown')) {
                          addModelIdField.parent().addClass('is-invalid-dropdown');
                          addModelIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                          addModelIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["owner"] == "") {
                      if (! result["owner"] == addOwnerError.val()) {
                          addOwnerError.empty(); // empty error messages, if there were any
                          addOwnerError.append(result["owner"]); // display the error messages
                      }
                      if (! addOwnerField.hasClass('is-invalid')) {
                          addOwnerField.addClass('is-invalid');
                          addOwnerField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["serial_number"] == "") {
                      if (! result["serial_number"] == addSerialNumberError.val()) {
                          addSerialNumberError.empty(); // empty error messages, if there were any
                          addSerialNumberError.append(result["serial_number"]); // display the error messages
                      }
                      if (! addSerialNumberField.hasClass('is-invalid')) {
                          addSerialNumberField.addClass('is-invalid');
                          addSerialNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["asset_tag"] == "") {
                      if (! result["asset_tag"] == addAssetTagError.val()) {
                          addAssetTagError.empty(); // empty error messages, if there were any
                          addAssetTagError.append(result["asset_tag"]); // display the error messages
                      }
                      if (! addAssetTagField.hasClass('is-invalid')) {
                          addAssetTagField.addClass('is-invalid');
                          addAssetTagField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["team_id"] == "") {
                      if (! result["team_id"] == addTeamIdError.val()) {
                          addTeamIdError.empty(); // empty error messages, if there were any
                          addTeamIdError.append(result["team_id"]); // display the error messages
                      }
                      if (! addTeamIdField.parent().hasClass('is-invalid-dropdown')) {
                          addTeamIdField.parent().addClass('is-invalid-dropdown');
                          addTeamIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                          addTeamIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["phone_number"] == "") {
                    if (! result["phone_number"] == addPhoneNumberError.val()) {
                        addPhoneNumberError.empty(); // empty error messages, if there were any
                        addPhoneNumberError.append(result["phone_number"]); // display the error messages
                    }
                    if (! addPhoneNumberField.hasClass('is-invalid')) {
                        addPhoneNumberField.addClass('is-invalid');
                        addPhoneNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                  }
                  if (! result["imei"] == "") {
                    if (! result["imei"] == addImeiError.val()) {
                        addImeiError.empty(); // empty error messages, if there were any
                        addImeiError.append(result["imei"]); // display the error messages
                    }
                    if (! addImeiField.hasClass('is-invalid')) {
                        addImeiField.addClass('is-invalid');
                        addImeiField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                    }
                  }
                  if (! result["purchase_price"] == "") {
                      if (! result["purchase_price"] == addPurchasePriceError.val()) {
                          addPurchasePriceError.empty(); // empty error messages, if there were any
                          addPurchasePriceError.append(result["purchase_price"]); // display the error messages
                      }
                      if (! addPurchasePriceField.hasClass('is-invalid')) {
                          addPurchasePriceField.addClass('is-invalid');
                          addPurchasePriceField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["purchase_date"] == "") {
                      if (! result["purchase_date"] == addPurchaseDateError.val()) {
                          addPurchaseDateError.empty(); // empty error messages, if there were any
                          addPurchaseDateError.append(result["purchase_date"]); // display the error messages
                      }
                      if (! addPurchaseDateField.hasClass('is-invalid')) {
                          addPurchaseDateField.addClass('is-invalid');
                          addPurchaseDateField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
                  if (! result["job_number"] == "") {
                      if (! result["job_number"] == addJobNumberError.val()) {
                          addJobNumberError.empty(); // empty error messages, if there were any
                          addJobNumberError.append(result["job_number"]); // display the error messages
                      }
                      if (! addJobNumberField.hasClass('is-invalid')) {
                          addJobNumberField.addClass('is-invalid');
                          addJobNumberField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
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
});


/**************************** Child Row Structure *****************************/
function formatRow() { //Put child row data here.
  return '<div class="slider">' +
  '<table class="edit-table row">' +
  '<tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Serial Number</label> </div>' +
      '<div>  <p class="asset_manager_serial_number">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Phone Number</label> </div>' +
      '<div>  <p class="asset_manager_phone_number">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>IMEI</label> </div>' +
      '<div>  <p class="asset_manager_imei">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Date</label> </div>' +
      '<div>  <p class="asset_manager_purchase_date">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Price</label> </div>' +
      '<div>  <p class="asset_manager_purchase_price">*error*</p></div>' +
    '</td>' +
  '</tr><tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Job Number</label> </div>' +
      '<div>  <p class="asset_manager_job_number">*error*</p></div>' +
  '</td>' +
  '<td class="edit-col" rowspan="2">' +
      '<div>  <label>Notes</label> </div>' +
      '<div>  <p class="asset_manager_notes">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Last Updated</label> </div>' +
      '<div>  <p class="asset_manager_last_modified_time">00:00:00</p></div>' +
    '</td>' +
  '</tr></table>' +
  '</div>';
}

//Resize table as screen changes size
$(window).resize(function () {
  $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
});
/* *** **************** *** */

/* *** Prepare Add Manufacturer Dropdown *** */

function getModelManufacturer(modelId) {
    var returnValue;
    if (modelId !== "" || modelId !== "undefined" || modelId !== null) {
        Object.keys(modelsDropdown).forEach(function(i) {
            if (modelsDropdown[i].value == modelId) {
                returnValue = modelsDropdown[i].manufacturerId;
            }
        });
    } else {
        returnValue = false;
    }
    return returnValue;
}

function getModelAssetType(modelId) {
    var returnValue;
    if (modelId !== "" || modelId !== "undefined" || modelId !== null) {
        Object.keys(modelsDropdown).forEach(function(i) {
            if (modelsDropdown[i].value == modelId) {
                returnValue = modelsDropdown[i].assetTypeId;
            }
        });
    } else {
        returnValue = false;
    }
    return returnValue;
}

function filterModelsByManufacturer(manufacturerId) {
    var filteredModels = [];

    if (manufacturerId !== "") {
        Object.keys(modelsDropdown).forEach(function(i) {
            if (modelsDropdown[i].manufacturerId == manufacturerId) {
                filteredModels.push(
                    {
                        value: modelsDropdown[i].value,
                        name: modelsDropdown[i].name
                    }
                );
            }
        });
    } else {
        filteredModels = modelsDropdown;
    }

    return filteredModels;
}

function getRate(modelId) {
    var returnValue;
    if (modelId !== "" || modelId !== "undefined" || modelId !== null) {
        Object.keys(modelsDropdown).forEach(function(i) {
            if (modelsDropdown[i].value == modelId) {
                returnValue = modelsDropdown[i].rate;
            }
        });
    } else {
        returnValue = false;
    }

    return returnValue;
}

function setRate(rate, action, record = null) {
    if (rate) {
        if (action == 'add') {
            $('#add-asset-rate').attr("placeholder", '$' + rate.toFixed(2));
        } else if (action == 'edit') {
            record.find('.asset_manager_rate').children('input').attr("placeholder", '$' + rate.toFixed(2));
        }
    }
}

function getManufacturerName(manufacturerId) {
    var returnValue;
    if (manufacturerId !== "" || manufacturerId !== "undefined" || manufacturerId !== null) {
        Object.keys(manufacturersDropdown).forEach(function(i) {
            if (manufacturersDropdown[i].value == manufacturerId) {
                returnValue = manufacturersDropdown[i].name;
            }
        });
    } else {
        returnValue = false;
    }
    return returnValue;
}

function setManufacturer(manufacturer, manufacturerId, action, record = null) {
    if (manufacturer && manufacturerId) {
        if (action == 'add') {
            $('#add-asset-manufacturer').attr("placeholder", manufacturer);
            $('#add-asset-manufacturer').attr('data-manufacturer_id', manufacturerId);
        } else if (action == 'edit') {
            record.find('.asset_manager_manufacturer').children('input').attr("placeholder", manufacturer);
            record.find('.asset_manager_manufacturer').children('input').attr('data-manufacturer_id', manufacturerId);
        }
    }
}

function getAssetTypeName(assetTypeId) {
    var returnValue;
    if (assetTypeId !== "" || assetTypeId !== "undefined" || assetTypeId !== null) {
        Object.keys(typesDropdown).forEach(function(i) {
            if (typesDropdown[i].value == assetTypeId) {
                returnValue = typesDropdown[i].name;
            }
        });
    } else {
        returnValue = false;
    }
    return returnValue;
}

function setAssetType(assetType, assetTypeId, action, record = null) {
    if (assetType && assetTypeId) {
        if (action == 'add') {
            $('#add-asset-type').attr("placeholder", assetType);
            $('#add-asset-type').attr('data-type_id', assetTypeId);
        } else if (action == 'edit') {
            record.find('.asset_manager_type').children('input').attr("placeholder", assetType);
            record.find('.asset_manager_type').children('input').attr('data-type_id', assetTypeId);
        }
    }
}

function loadManufacturers() {
    $.ajax({//Manufacturers
        type: 'GET',
        url: getActiveManufacturersUrl,
        dataType: 'json',
        success: function(result) {
            Object.keys(result).forEach(function(i){
                manufacturersDropdown.push(
                    {
                        name: result[i].name,
                        value: parseInt(result[i].id)
                    }
                );
            });
            manufacturersDropdown.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });
}

function loadModels() {
    $.ajax({ //Models
        type: 'GET',
        url: getActiveModelsUrl,
        dataType: 'json',
        success: function(result) {
            Object.keys(result).forEach(function(i){
                modelsDropdown.push(
                    {
                        name: result[i].name,
                        value: parseInt(result[i].id),
                        manufacturerId: parseInt(result[i].manufacturer_id),
                        assetTypeId: parseInt(result[i].type_id),
                        rate: parseFloat(result[i].rate)
                    }
                );
            });
            modelsDropdown.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });
}

function loadTypes() {
    $.ajax({//Types
        type: 'GET',
        url: getActiveTypesUrl,
        dataType: 'json',
        success: function(result) {
            Object.keys(result).forEach(function(i){
                typesDropdown.push(
                    {
                        name: result[i].name,
                        value: parseInt(result[i].id),
                    }
                );
            });
            typesDropdown.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });
}

function loadTeams() {
    $.ajax({//Teams
        type: 'GET',
        url: getActiveTeamsUrl,
        dataType: 'json',
        success: function(result) {
            Object.keys(result).forEach(function(i){
                teamsDropdown.push(
                    {
                        name: result[i].name,
                        value: parseInt(result[i].id)
                    }
                );
            });
            teamsDropdown.sort(function(a, b) {
                return compareStrings(a.name, b.name);
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });
}
