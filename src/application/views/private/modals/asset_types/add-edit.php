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
                        <input name="name" type="name" class="form-control" id="name" value="<?php set_value('name'); ?>">
                        <div class="text-danger" id="name-error"></div>
                    </div>
                    <div class="form-group">
                        <label for="rate">Rate</label>
                        <input name="rate" type="number" class="form-control" id="rate" value="<?php set_value('rate'); ?>">
                        <div class="text-danger"id="rate-error"></div>
                    </div>
                    <!-- <button id="modal-confirm-add-edit-asset-type" form="asset-type-add-edit-form" name="asset-type-add-edit-submit" type="submit" class="btn btn-primary">Save</button> -->
                    <!-- <input type="submit" id="modal-confirm-add-edit-asset-type" form="asset-type-add-edit-form" name="asset-type-add-edit-submit" class="btn btn-primary"> -->
                    <div class="">
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-edit-asset-type" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="asset-type-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>

        </div>
    </div>
</div>
