<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>

<div id="add-manufacturer" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-manufacturer" class="modal-title">Add Manufacturer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-manufacturer">
                <?php echo form_open(current_url(), array( 'id' => 'add-manufacturer-form', 'name' => 'add-manufacturer-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-manufacturer" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="manufacturer-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div id="edit-manufacturer" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-manufacturer" class="modal-title">Edit Manufacturer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-edit-manufacturer" class="modal-body">
                <?php echo form_open(current_url(), array( 'id' => 'edit-manufacturer-form', 'name' => 'edit-manufacturer-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-manufacturer" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input id="modal-submit-edit-manufacturer" type="submit" name="manufacturer-edit-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
