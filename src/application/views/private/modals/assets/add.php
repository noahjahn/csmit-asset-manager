<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal" id="add-asset-modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Adding New Asset</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <?php echo form_open(current_url(), array( 'id' => 'add-asset-form', 'name' => 'add-asset-form')); ?>
        <div class="modal-body">
            <div class="row">
              <div class="col-sm add-asset-field-manufacturer">
                <label for="add-asset-form-manufacturer">Manufacturer</label>
                <select id="add-asset-form-manufacturer" name="manufacturer" class="form-control ui search dropdown validate"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-sm add-asset-field-model">
                <label for="add-asset-form-model">Model</label>
                <select id="add-asset-form-model" name="model" class="form-control ui search dropdown validate"></select>
              </div>
              <div class="col-sm">
                <label for="add-asset-form-owner">Owner</label>
                <input id="add-asset-form-owner" name="owner" class="form-control validate">
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label for="add-asset-form-serialnum">Serial Number</label>
                <input type="text" id="add-asset-form-serialnum" name="serial_number" class="form-control validate">
              </div>
              <div class="col-sm add-asset-field-type">
                <label for="add-asset-form-type">Type</label>
                <select type="text" id="add-asset-form-type" name="type" class="form-control ui search dropdown validate"></select>
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label for="add-asset-form-assettag">Asset Tag</label>
                <input type="text" id="add-asset-form-assettag" name="asset_tag" class="form-control validate">
              </div>
              <div class="col-sm">
                <label for="add-asset-form-purchaseprice">Purchase Price</label>
                <input type="text" id="add-asset-form-purchaseprice" name="purchase_price" class="form-control validate">
              </div>
            </div>
            <div class="row">
              <div class="col-sm">
                <label for="add-asset-form-purchasedate">Purchase Date</label>
                <input type="date" id="add-asset-form-purchasedate" name="purchase_date" class="form-control validate">
              </div>
              <div class="col-sm">
                <label for="add-asset-form-location">Location</label>
                <input type="text" id="add-asset-form-location" name="location" class="form-control validate">
              </div>
            </div>
            <div class="row">
              <div class="col-sm add-asset-field-team">
                <label for="add-asset-form-team">Team</label>
                <select type="text" id="add-asset-form-team" name="team" class="form-control ui search dropdown validate"></select>
              </div>
              <div class="col-sm">
                <label for="add-asset-form-jobnum">Job Number</label>
                <input type="text" id="add-asset-form-jobnum" name="job_number" class="form-control validate">
              </div>
            </div>
          </div>
        <div class="modal-footer">
          <button id="add-asset-form-close" type="button" class="btn btn-secondary" data-dismiss="modal" aria-label="Close">Close</button>
          <input id="add-asset-form-submit" type="submit" name="add-asset-submit" value="Save" class="btn btn-primary">
        </div>
      <?php echo form_close(); ?>
    </div>
  </div>
</div>
