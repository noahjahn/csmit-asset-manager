<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal fade" id="add-edit-asset-type" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-add-edit-asset-type">Asset Type</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-edit-asset-type">
                <?php echo form_open(current_url(), array( 'id' => 'asset-type-add-edit-form', 'name' => 'asset-type-add-edit-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input type="name" class="form-control" id="name">
                        <div class="text-danger"><?php echo form_error("name"); ?></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <input type="number" class="form-control" id="rate">
                        <div class="text-danger"><?php echo form_error("rate"); ?></div>
                    </div>
                    <!-- <button id="modal-confirm-add-edit-asset-type" form="asset-type-add-edit-form" name="asset-type-add-edit-submit" type="submit" class="btn btn-primary">Save</button> -->
                    <input type="submit" id="modal-confirm-add-edit-asset-type" form="asset-type-add-edit-form" name="asset-type-add-edit-submit" class="btn btn-primary">

                <?php echo form_close(); ?>
            </div>
            <div class="modal-footer">
                <button id="modal-cancel-add-edit-asset-type" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
            </div>
        </div>
    </div>
</div>
