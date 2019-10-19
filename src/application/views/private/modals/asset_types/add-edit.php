<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>

<div class="modal fade" id="add-asset-type" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-add-asset-type">Asset Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-asset-type">
                <?php echo form_open(current_url(), array( 'id' => 'add-asset-type-form', 'name' => 'add-asset-type-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input name="name" type="name" class="form-control" id="name" value="<?php set_value('name'); ?>">
                        <div class="text-danger" id="name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <input name="rate" type="number" step=".01" class="form-control" id="rate" value="<?php set_value('rate'); ?>">
                        <div class="text-danger"id="rate-error"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-asset-type" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="asset-type-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="edit-asset-type" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-edit-asset-type">Asset Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-edit-asset-type">
                <?php echo form_open(current_url(), array( 'id' => 'edit-asset-type-form', 'name' => 'edit-asset-type-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input name="name" type="name" class="form-control" id="name" value="<?php set_value('name'); ?>">
                        <div class="text-danger" id="name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <input name="rate" type="number" step=".01" class="form-control" id="rate" value="<?php set_value('rate'); ?>">
                        <div class="text-danger"id="rate-error"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-asset-type" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="asset-type-edit-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
