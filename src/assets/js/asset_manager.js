//Controller function URLs
var deleteAssetUrl = baseUrl + "AssetManager/delete";
var addAssetUrl = baseUrl + "AssetManager/add";
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
            { "orderable": false, "targets": [8,9,10,11,12,13,14,15,16,17,18,19,20] },
            { "visible": false, "targets": [0,10,11,12,13,14,15,16,17,18,19,20] }
        ],
        columns: [
            { "data": "id" },
            // { "data": "name" },
            { "data": "model" },
            { "data": "manufacturer" },
            { "data": "owner" },
            { "data": "type" },
            { "data": "asset_tag" },
            // { "data": "purchase_date" },
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
            { "data": "location" },
            { "data": "purchase_date" },
            { "data": "notes" },
            { "data": "last_modified_time" },
            {"data": "manufacturer_id"},
            {"data": "model_id"},
            {"data": "type_id"},
            {"data": "team_id"}
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
        $('#add-asset-manufacturer').dropdown({
            values: manufacturersDropdown
        });

        $('#add-asset-model').dropdown({
              values: modelsDropdown
        });

        $('#add-asset-manufacturer').dropdown('setting', 'onChange', function(value) {
            var filteredModels = filterModelsByManufacturer(value);
            $('#add-asset-model').dropdown('change values', filteredModels);
        });

        $('#add-asset-model').dropdown('setting', 'onChange', function(value) {
            var manufacturerId = getModelManufacturer(value);
            if (manufacturerId) {
                $('#add-asset-manufacturer').dropdown('set selected', manufacturerId);
            }
        });

        $('#add-asset-team').dropdown({
              values: teamsDropdown
        });
        $('#add-asset-type').dropdown({
              values: typesDropdown,
              onChange: function (value) {
                  var rate = getRate(value);
                  setRate(rate);
              }
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

      //Get row we're on
      var tr = $(this);
      var row = table.row(this);

      //Sanity check to ensure we're clicking the "edit button". Delete later
      if(e.target.id == 'edit-asset-button') {
        console.log("edit click");
      }

      //Get current values in row.
      //Replace inputs with these after editing if nothing was changed.
      //--STILL NEED-- Update field if the value changed.
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
      var location = table.cell(row,13).data();
      var purchase_date = table.cell(row,14).data();
      var notes = table.cell(row,15).data();
      var last_modified_time = table.cell(row,16).data();




/****************IF Detail Row is EXPANDED before clicking*********************/
      if (row.child.isShown() ) {

        /**********************If row is in edit mode************************/
        if($(this).hasClass('edit-mode')) {
          /**********If the save button is clicked**********/
          if(e.target.id == 'edit-asset-button') {

            //leave edit mode
            $(this).removeClass('edit-mode');

            //Make delete trash-icon visible and usable.
            $(this).find('#delete-asset-button').attr('data-target','#delete-asset');
            $(this).find('#delete-asset-button').css('display','block');

            //Remove Save button, and replace with Edit Button
            $(this).find('#edit-asset-button').replaceWith('<button class="table-icon" id="edit-asset-button" data-toggle="modal" data-target="#edit-asset" data-type="POST" data-tableid="asset-manager" data-id = "' + row.id + '" data-url="AssetManager/edit/' + row.id + '"><img class="mini-icon" id="edit-asset-button" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button>');

            //Push changes to Database


              /**If edit was clicked, save changes**/
            //  var serial_number = table.cell(row,10).data();
              //var serial_number = table.cell(row,10).data();
            //  var serial_number = table.cell(row,10).data();

            $(this).find('.asset_manager_model').html(model);
            $(this).find('.asset_manager_manufacturer').html(manufacturer);
            $(this).find('.asset_manager_owner').html(owner);
            $(this).find('.asset_manager_type').html(type);
            $(this).find('.asset_manager_asset_tag').html(asset_tag);
            $(this).find('.asset_manager_team').html(team);
            $(this).find('.asset_manager_rate').html(rate);
            row.child().find("p.asset_manager_serial_number").html(serial_number);
            row.child().find("p.asset_manager_purchase_price").html(purchase_price);
            row.child().find("p.asset_manager_job_number").html(job_number);
            row.child().find("p.asset_manager_location").html(location);
            row.child().find("p.asset_manager_purchase_date").html(purchase_date);
            row.child().find("p.asset_manager_notes").html(notes);
            row.child().find("p.asset_manager_last_modified_time").html(last_modified_time);

          }
          /**********If the save button is not clicked**********/
          else {
              ;//do nothing.
          }
        }
        /**********************If row is NOT in edit mode**********************/
        else {
          /**********If the edit button is clicked**********/
          if(e.target.id == 'edit-asset-button') {
            //Enter edit mode
            $(this).addClass('edit-mode');

            //dropdown Variables
            var manufacturer_id = table.cell(row,17).data();
            var model_id = table.cell(row,18).data();
            var type_id = table.cell(row,19).data();
            var team_id = table.cell(row,20).data();

            //Hide delete Trash-icon
            $(this).find('#delete-asset-button').attr('data-target','');
            $(this).find('#delete-asset-button').css('display','none');

            //Replace edit button with save button
            $(this).find('img#edit-asset-button.mini-icon').remove();
            $(this).find('button#edit-asset-button.table-icon').replaceWith('<button id="edit-asset-button" type="button" class="btn btn-primary">Save</button>');

            /**If edit was clicked, open input fields and ensure details are expanded.**/
            ////Parent row fields

            //Model
            $(this).find('.asset_manager_model').html('<select id="model-dropdown" type="text" name="model" class="ui search dropdown in-row-edit-dropdown"></select>');
            $(this).find('#model-dropdown').dropdown({
                    values: modelsDropdown
            });
            $(this).find('#model-dropdown').dropdown('set selected', model_id);
            //Manufacturer
            $(this).find('.asset_manager_manufacturer').html('<select id="manufacturer-dropdown" type="text" name="manufacturer" class="ui search dropdown in-row-edit-dropdown"></select>');
            $(this).find('#manufacturer-dropdown').dropdown({
                  values: manufacturersDropdown
            });
            $(this).find('#manufacturer-dropdown').dropdown('set selected', manufacturer_id);
            //Owner
            $(this).find('.asset_manager_owner').html('<input type="text" class="in-row-edit"></input>');
            $(this).find('.asset_manager_owner .in-row-edit').attr('value', owner)
            //Type
            $(this).find('.asset_manager_type').html('<select id="type-dropdown" type="text" name="type" class="ui search dropdown in-row-edit-dropdown"></select>');
            $(this).find('#type-dropdown').dropdown({
                  values: typesDropdown
            });
            $(this).find('#type-dropdown').dropdown('set selected', type_id);
            //Asset Tag
            $(this).find('.asset_manager_asset_tag').html('<input type="text" class="in-row-edit"></input>');
            $(this).find('.asset_manager_asset_tag .in-row-edit').attr('value', asset_tag)
            //Team
            $(this).find('.asset_manager_team').html('<select id="team-dropdown" type="text" name="team" class="ui search dropdown in-row-edit-dropdown"></select>');
            $(this).find('#team-dropdown').dropdown({
                  values: teamsDropdown
            });
            $(this).find('#team-dropdown').dropdown('set selected', team_id);
            //Rate
            $(this).find('.asset_manager_rate').html('<input type="text" class="in-row-edit"></input>');
            $(this).find('.asset_manager_rate .in-row-edit').attr('value', rate)

            ////Child row fields

            //Serial Number
            row.child().find('.asset_manager_serial_number').html('<input type="text" class="in-row-edit"></input>');
            //Purchase Price
            row.child().find('.asset_manager_purchase_price').html('<input type="text" class="in-row-edit"></input>');
            //Job Number
            row.child().find('.asset_manager_job_number').html('<input type="text" class="in-row-edit"></input>');
            //Location
            row.child().find('.asset_manager_location').html('<input type="text" class="in-row-edit"></input>');
            //Purchase Date
            row.child().find('.asset_manager_purchase_date').html('<input type="text" class="in-row-edit"></input>');
            //Notes
            row.child().find('.asset_manager_notes').html('<input type="text" class="in-row-edit" value="notes would go here"></input>');

            //Correct the height of the dropdowns.
          //  $(this).find('.in-row-edit-dropdown input').css({'padding-top': '0','horizontal-align': 'center'});
          //  $(this).find('.in-row-edit-dropdown input').css({'padding-bottom': '0','horizontal-align': 'center'});

            $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
          }
          /**********If the delete button is clicked**********/
          else if (e.target.id == 'delete-asset-button') {
            ;//Do Nothing *here*. Modal will catch event.
          }
          /**********If Anywhere else on the row is clicked**********/
          else {
            //Remove light-grey focus styled when detail row is closed
            $(tr).css({"background-color":"#303030", "box-shadow":"none"});
            //  $(tr).children().css();
            row.child().find('div').css({"background-color":"#303030", "box-shadow":"none"});
            //Close detail row
            $('div.slider', row.child()).slideUp( 300,function () {
                row.child.hide();
                tr.removeClass('shown');
            } );
          }
        }
      }
/*********END EXPANDED ROW IF***********/

/****************IF Detail Row is CLOSED before clicking*********************/
      else { //If child row is NOT shown

        /**********If the edit button is  clicked**********/
        if(e.target.id == 'edit-asset-button') {

          //Enter edit mode
          $(this).addClass('edit-mode');

          //dropdown Variables
          var manufacturer_id = table.cell(row,17).data();
          var model_id = table.cell(row,18).data();
          var type_id = table.cell(row,19).data();
          var team_id = table.cell(row,20).data();

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
          //Add light-grey focus styling when detail row is opening
          $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
          $(tr).css("background-color","#3B3B3B");
          $(tr).css("box-shadow","inset 0px 2px 2px black");

          /**If edit was clicked, open input fields and ensure details are expanded.**/
          //Parent row fields

          //Model
          $(this).find('.asset_manager_model').html('<select id="model-dropdown" type="text" name="model" class="ui search dropdown in-row-edit-dropdown"></select>');
          $(this).find('#model-dropdown').dropdown({
                values: modelsDropdown
          });
          $(this).find('#model-dropdown').dropdown('set selected', model_id);
          //Manufacturer
          $(this).find('.asset_manager_manufacturer').html('<select id="manufacturer-dropdown" type="text" name="manufacturer" class="ui search dropdown in-row-edit-dropdown"></select>');
          $(this).find('#manufacturer-dropdown').dropdown({
                values: manufacturersDropdown
          });
          $(this).find('#manufacturer-dropdown').dropdown('set selected', manufacturer_id);
          //Owner
          $(this).find('.asset_manager_owner').html('<input type="text" class="in-row-edit"></input>');
          $(this).find('.asset_manager_owner .in-row-edit').attr('value', owner)
          //Type
          $(this).find('.asset_manager_type').html('<select id="type-dropdown" type="text" name="type" class="ui search dropdown in-row-edit-dropdown"></select>');
          $(this).find('#type-dropdown').dropdown({
                values: typesDropdown
          });
          $(this).find('#type-dropdown').dropdown('set selected', type_id);
          //Asset Tag
          $(this).find('.asset_manager_asset_tag').html('<input type="text" class="in-row-edit"></input>');
          $(this).find('.asset_manager_asset_tag .in-row-edit').attr('value', asset_tag)
          //Team
          $(this).find('.asset_manager_team').html('<select id="team-dropdown" type="text" name="team" class="ui search dropdown in-row-edit-dropdown"></select>');
          $(this).find('#team-dropdown').dropdown({
                values: teamsDropdown
          });
          $(this).find('#team-dropdown').dropdown('set selected', team_id);
          //Rate
          $(this).find('.asset_manager_rate').html('<input type="text" class="in-row-edit"></input>');
          $(this).find('.asset_manager_rate .in-row-edit').attr('value', rate)
          //Child row fields
          //Serial Number
          row.child().find('.asset_manager_serial_number').html('<input type="text" class="in-row-edit"></input>');
          //Purchase Price
          row.child().find('.asset_manager_purchase_price').html('<input type="text" class="in-row-edit"></input>');
          //Job Number
          row.child().find('.asset_manager_job_number').html('<input type="text" class="in-row-edit"></input>');
          //Location
          row.child().find('.asset_manager_location').html('<input type="text" class="in-row-edit"></input>');
          //Purchase Date
          row.child().find('.asset_manager_purchase_date').html('<input type="text" class="in-row-edit"></input>');
          //Notes
          row.child().find('.asset_manager_notes').html('<input type="text" class="in-row-edit" value="notes would go here"></input>');

          //Correct the height of the dropdowns.
        //  $(this).find('.in-row-edit-dropdown input').css({'padding-top':'0','horizontal-align': 'center'});
        //  $(this).find('.in-row-edit-dropdown input').css({'padding-bottom': '0','horizontal-align': 'center'});

          $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();

        }
        /**********If the delete button is  clicked**********/
        else if (e.target.id == 'delete-asset-button') {//If delete button is clicked
          ;//Do Nothing *here*. Modal will catch event.
        }
        /**********If Anywhere else on the row is clicked**********/
        else {
          //Highlight icons
          //Slide detail row down
          tr.addClass('shown');
          //Get child row structure
          row.child( formatRow(row.data()), 'slider' ).show();
          //Fill child row fields
          row.child().find("p.asset_manager_serial_number").html(serial_number);
          row.child().find("p.asset_manager_purchase_price").html(purchase_price);
          row.child().find("p.asset_manager_job_number").html(job_number);
          row.child().find("p.asset_manager_location").html(location);
          row.child().find("p.asset_manager_purchase_date").html(purchase_date);
          row.child().find("p.asset_manager_notes").html(notes);
          row.child().find("p.asset_manager_last_modified_time").html(last_modified_time);
          $('div.slider', row.child()).slideDown(300);
          //Add light-grey focus styling when detail row is opening
          $('div.slider').css({"background-color":"#3B3B3B", "box-shadow":"inset 0px -1px 2px black"});
          $(tr).css("background-color","#3B3B3B");
          $(tr).css("box-shadow","inset 0px 2px 2px black");
        }
      }
/***************END CLOSED ROW IF***************/
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

    addPurchasePriceField = $("#add-asset-form #add-asset-purchase-price");
    addPurchasePriceError = $("#add-asset-form #add-asset-purchase-price-error");

    addPurchaseDateField = $("#add-asset-form #add-asset-purchase-date");
    addPurchaseDateError = $("#add-asset-form #add-asset-purchase-date-error");

    addJobNumberField = $("#add-asset-form #add-asset-job-number");
    addJobNumberError = $("#add-asset-form #add-asset-job-number-error");

    addLocationField = $("#add-asset-form #add-asset-location");
    addLocationError = $("#add-asset-form #add-asset-location-error");

    $('#add-asset-form').on("submit", function (e) {
      e.preventDefault();

      var manufacturer = $('#add-asset-manufacturer').siblings('.menu').children('.item.active.selected').data('value');
      var model = $('#add-asset-model').siblings('.menu').children('.item.active.selected').data('value');
      var type = $('#add-asset-type').siblings('.menu').children('.item.active.selected').data('value');
      var team = $('#add-asset-team').siblings('.menu').children('.item.active.selected').data('value');
      if (!manufacturer) { var manufacturer = ""; }
      if (!model) { var model = ""; }
      if (!type) { var type = ""; }
      if (!team) { var team = ""; }

      $.ajax({
          type: 'POST',
          url: addAssetUrl,
          dataType: 'json',
          data: $(this).serialize() + "&manufacturer_id=" + manufacturer + "&model_id=" + model + "&type_id=" + type + "&team_id=" + team, // get data from the form
          success: function(result) {
              if (result == "success") {
                  $("#add-asset").modal('hide'); // if the submission was successful without any validation erros, we can hide the modal
                  $("#asset-manager").DataTable().ajax.reload(); // also need to reload the datatable since we successfully add an asset type
              } else {
                  console.log(result);
                  if (! result["manufacturer_id"] == "") {
                      if (! result["manufacturer_id"] == addManufacturerIdError.val()) {
                          addManufacturerIdError.empty(); // empty error messages, if there were any
                          addManufacturerIdError.append(result["manufacturer_id"]); // display the error messages
                      }
                      if (! addManufacturerIdField.parent().hasClass('is-invalid-dropdown')) {
                          addManufacturerIdField.parent().addClass('is-invalid-dropdown');
                          addManufacturerIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                          addManufacturerIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
                      }
                  }
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
                  if (! result["type_id"] == "") {
                      if (! result["type_id"] == addTypeIdError.val()) {
                          addTypeIdError.empty(); // empty error messages, if there were any
                          addTypeIdError.append(result["type_id"]); // display the error messages
                      }
                      if (! addTypeIdField.parent().hasClass('is-invalid-dropdown')) {
                          addTypeIdField.parent().addClass('is-invalid-dropdown');
                          addTypeIdField.siblings('.dropdown.icon').css('margin-right', '0.5em');
                          addTypeIdField.parent().parent('.form-group').attr('style', 'margin-bottom: 0px !important');
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
                  if (! result["location"] == "") {
                      if (! result["location"] == addLocationError.val()) {
                          addLocationError.empty(); // empty error messages, if there were any
                          addLocationError.append(result["location"]); // display the error messages
                      }
                      if (! addLocationField.hasClass('is-invalid')) {
                          addLocationField.addClass('is-invalid');
                          addLocationField.parent('.form-group').attr('style', 'margin-bottom: 0px !important');
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
      '<div>  <label>Purchase Price</label> </div>' +
      '<div>  <p class="asset_manager_purchase_price">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Job Number</label> </div>' +
      '<div>  <p class="asset_manager_job_number">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col" rowspan="2">' +
      '<div>  <label>Notes</label> </div>' +
      '<div>  <p class="asset_manager_notes">*error*</p></div>' +
    '</td>' +
  '</tr><tr class="edit-row">' +
  '<td class="edit-col">' +
      '<div>  <label>Location</label> </div>'+
      '<div>  <p class="asset_manager_location">*error*</p></div>' +
    '</td>' +
  '<td class="edit-col">' +
      '<div>  <label>Purchase Date</label> </div>' +
      '<div>  <p class="asset_manager_purchase_date">*error*</p></div>' +
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









//
// '<div class="slider">' +
// '<table class="edit-table row">' +
// '<tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Serial Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-serial-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Price</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-price" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Job Number</label> </div>' +
//     '<div>  <input id="asset-manager-edit-job-number" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col" rowspan="2">' +
//     '<div>  <label>Notes</label> </div>' +
//     '<div>  <textarea rows="6" class="asset-manager-edit-notes asset-manager-edit-field"></textarea> </div>' +
//   '</td>' +
// '</tr><tr class="edit-row">' +
// '<td class="edit-col">' +
//     '<div>  <label>Location</label> </div>'+
//     '<div>  <input id="asset-manager-edit-location" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Purchase Date</label> </div>' +
//     '<div>  <input id="asset-manager-edit-purchase-date" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '<td class="edit-col">' +
//     '<div>  <label>Last Updated</label> </div>' +
//     '<div>  <input id="asset-manager-edit-last-updated" class="asset-manager-edit-field form-control"></input> </div>' +
//   '</td>' +
// '</tr></table>' +
// '</div>';


// $(tr).find('.asset_manager_model').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_manufacturer').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_owner').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_type').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_asset_tag').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_team').html('<input class="in-row-edit form-control"></input>');
// $(tr).find('.asset_manager_rate').html('<input class="in-row-edit form-control"></input>');


// $(tr).find('.asset_manager_model').html('');
// $(tr).find('.asset_manager_manufacturer').html('');
// $(tr).find('.asset_manager_owner').html('');
// $(tr).find('.asset_manager_type').html('');
// $(tr).find('.asset_manager_asset_tag').html('');
// $(tr).find('.asset_manager_team').html('');
// $(tr).find('.asset_manager_rate').html('');

/* *** **************** *** */

/* *** Prepare Add Manufacturer Dropdown *** */

function getModelManufacturer(modelId) {
    if (modelId !== "" || modelId !== "undefined" || modelId !== null) {
        Object.keys(modelsDropdown).forEach(function(i) {
            if (modelsDropdown[i].value == modelId) {
                return modelsDropdown[i].manufacturerId;
            }
        });
    } else {
        return false;
    }
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

function getRate(typeId) {
    var returnValue;
    if (typeId !== "" || typeId !== "undefined" || typeId !== null) {
        Object.keys(typesDropdown).forEach(function(i) {
            if (typesDropdown[i].value == typeId) {
                returnValue = typesDropdown[i].rate;
            }
        });
    } else {
        returnValue = false;
    }

    return returnValue;
}

function setRate(rate) {
    if (rate) {
        $('#add-asset-rate').attr("placeholder", '$' + rate.toFixed(2));
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
                        manufacturerId: parseInt(result[i].manufacturer_id)
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
                        rate: parseFloat(result[i].rate)
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
