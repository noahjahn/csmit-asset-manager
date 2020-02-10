<!-- <link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-semantic.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/transition.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/custom.css"/>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.js"></script>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/transition.js"></script>

<div class="modal" id="edit-asset" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-asset" class="modal-title">Edit Asset</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-edit-asset">
                <?php echo form_open(current_url(), array('id' => 'edit-asset-form', 'name' => 'edit-asset-form')); ?>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Model<span class="required"> *</span></label>
                            <select id="edit-asset-model" name="model_id" class="form-control ui search dropdown" value="<?php set_value('model_id'); ?>"></select>
                            <div id="edit-asset-model-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Manufacturer<span class="required"> *</span></label>
                            <input type="text" id="edit-asset-manufacturer" name="manufacturer_id" class="form-control" placeholder="Select model first..." disabled>
                            <div id="edit-asset-manufacturer-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Type<span class="required"> *</span></label>
                            <input type="text" id="edit-asset-type" name="type_id" class="form-control" placeholder="Select model first..." disabled>
                            <div id="edit-asset-type-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Rate<span class="required"> *</span></label>
                            <input type="text" id="edit-asset-rate" name="rate" class="form-control" placeholder="$0.00" disabled>
                            <div id="edit-asset-rate-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Asset Tag<span class="required"> *</span></label>
                            <input type="text" id="edit-asset-asset-tag" name="asset_tag" class="form-control" value="<?php set_value('asset_tag'); ?>">
                            <div id="edit-asset-asset-tag-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Serial Number</label>
                            <input type="text" id="edit-asset-serial-number" name="serial_number" class="form-control" value="<?php set_value('serial_number'); ?>">
                            <div id="edit-asset-serial-number-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Team<span class="required"> *</span></label>
                            <select type="text" id="edit-asset-team" name="team_id" class="form-control ui search dropdown" value="<?php set_value('team_id'); ?>"></select>
                            <div id="edit-asset-team-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Owner<span class="required"> *</span></label>
                            <input id="edit-asset-owner" name="owner" class="form-control" value="<?php set_value('owner'); ?>">
                            <div id="edit-asset-owner-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Location</label>
                            <input type="text" id="edit-asset-location" name="location" class="form-control" value="<?php set_value('location'); ?>">
                            <div id="edit-asset-location-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label>Job Number</label>
                            <input type="text" id="edit-asset-job-number" name="job_number" class="form-control" value="<?php set_value('job_number'); ?>">
                            <div id="edit-asset-job-number-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group">
                            <label>Purchase Date</label>
                            <input type="date" id="edit-asset-purchase-date" name="purchase_date" class="form-control" value="<?php set_value('purchase_date'); ?>">
                            <div id="edit-asset-purchase-date-error" class="invalid-feedback"></div>
                        </div>
                        <div class="col-md form-group">
                            <label for="edit-asset-purchase-price">Purchase Price</label>
                            <input type="text" id="edit-asset-purchase-price" name="purchase_price" class="form-control" value="<?php set_value('purchase_price'); ?>">
                            <div id="edit-asset-purchase-price-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md form-group no-width">
                            <label for="edit-asset-notes">Notes</label>
                            <textarea class="form-control textarea" id="edit-asset-notes" name="notes" rows="2" value="<?php set_value('notes'); ?>"></textarea>
                            <div id="edit-asset-notes-error" class="invalid-feedback"></div>
                        </div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-asset" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="asset-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div> -->
