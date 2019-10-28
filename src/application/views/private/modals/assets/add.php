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
              <input type="text" id="add-asset-form-name" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-name">Name</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-manufacturer" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-manufacturer">Manufacturer</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input type="text" id="add-asset-form-model" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-">Model</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-owner" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-owner">Owner</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input type="text" id="add-asset-form-serialnum" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-serialnum">Serial Number</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-type" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-type">Type</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input type="text" id="add-asset-form-assettag" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-assettag">Asset Tag</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-purchaseprice" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-purchaseprice">Purchase Price</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input type="text" id="add-asset-form-purchasedate" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-purchasedate">Purchase Date</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-location" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-location">Location</label>
            </div>
          </div>
          <div class="row">
            <div class="col-sm">
              <input type="text" id="add-asset-form-team" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-team">Team</label>
            </div>
            <div class="col-sm">
              <input type="text" id="add-asset-form-jobnum" class="form-control validate">
              <label data-success="right" data-error="wrong" for="add-asset-form-jobnum">Job Number</label>
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
