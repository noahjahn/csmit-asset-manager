<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal" id="add-asset" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Adding New Asset</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="md-form container">
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-manufacturer">Manufacturer</label>
              <select id="add-asset-form-manufacturer" class="form-control validate"></select>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-model">Model</label>
              <select id="add-asset-form-model" class="form-control validate"></select>
            </div>
            <div class="col-sm">
              <label for="add-asset-form-owner">Owner</label>
              <select id="add-asset-form-owner" class="form-control validate"></select>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-serialnum">Serial Number</label>
              <input type="text" id="add-asset-form-serialnum" class="form-control validate">
            </div>
            <div class="col-sm">
              <label for="add-asset-form-type">Type</label>
              <input type="text" id="add-asset-form-type" class="form-control validate">
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-assettag">Asset Tag</label>
              <input type="text" id="add-asset-form-assettag" class="form-control validate">
            </div>
            <div class="col-sm">
              <label for="add-asset-form-purchaseprice">Purchase Price</label>
              <input type="text" id="add-asset-form-purchaseprice" class="form-control validate">
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-purchasedate">Purchase Date</label>
              <input type="date" id="add-asset-form-purchasedate" class="form-control validate">
            </div>
            <div class="col-sm">
              <label for="add-asset-form-location">Location</label>
              <input type="text" id="add-asset-form-location" class="form-control validate">
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <label for="add-asset-form-team">Team</label>
              <input type="text" id="add-asset-form-team" class="form-control validate">
            </div>
            <div class="col-sm">
              <label for="add-asset-form-jobnum">Job Number</label>
              <input type="text" id="add-asset-form-jobnum" class="form-control validate">
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button id="modal-add-asset" type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
