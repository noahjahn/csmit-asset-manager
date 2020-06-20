<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/transition.css"/>
<link rel="stylesheet" href="<?php echo base_url(); ?>assets/libraries/semantic/custom.css"/>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/dropdown.js"></script>
<script src="<?php echo base_url(); ?>assets/libraries/semantic/transition.js"></script>

<div id="add-model" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-model" class="modal-title">Add Model</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-model">
                <?php echo form_open(current_url(), array( 'id' => 'add-model-form', 'name' => 'add-model-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="add-model-name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="add-model-name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Manufacturer<span class="required"> *</span></label>
                        <select id="add-model-manufacturer" type="text" name="manufacturer" class="form-control ui search dropdown" value="<?php set_value('manufacturer'); ?>"></select>
                        <div id="add-model-manufacturer-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Type<span class="required"> *</span></label>
                        <select id="add-model-type" type="text" name="type" class="form-control ui search dropdown" value="<?php set_value('type'); ?>"></select>
                        <div id="add-model-type-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate<span class="required"> *</span></label>
                        <input id="add-asset-type-rate" name="rate" type="number" step=".01" class="form-control" value="<?php set_value('rate'); ?>">
                        <div id="add-asset-type-rate-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-model" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="model-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div id="edit-model" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-model" class="modal-title">Edit Model</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-edit-model" class="modal-body">
                <?php echo form_open(current_url(), array( 'id' => 'edit-model-form', 'name' => 'edit-model-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="edit-model-name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Manufacturer<span class="required"> *</span></label>
                        <select id="edit-model-manufacturer" type="text" name="manufacturer" class="form-control ui search dropdown" value="<?php set_value('manufacturer'); ?>"></select>
                        <div id="edit-model-manufacturer-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Type<span class="required"> *</span></label>
                        <select id="edit-model-type" type="text" name="type" class="form-control ui search dropdown" value="<?php set_value('type'); ?>"></select>
                        <div id="edit-model-type-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate<span class="required"> *</span></label>
                        <input id="edit-asset-type-rate" name="rate" type="number" step=".01" class="form-control" value="<?php set_value('rate'); ?>">
                        <div id="edit-asset-type-rate-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-model" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input id="modal-submit-edit-model" type="submit" name="model-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
