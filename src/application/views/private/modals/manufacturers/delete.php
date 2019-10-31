<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div id="delete-manufacturer" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-delete-manufacturer" class="modal-title">Delete Manufacturer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-delete-manufacturer" class="modal-body">
                Are you sure you want to delete this Manufacturer?
                <div id="id-error" class="invalid-feedback"></div>
            </div>
            <div class="modal-footer">
                <button id="modal-cancel-delete-manufacturer" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button id="modal-submit-delete-manufacturer" type="button" class="btn btn-primary">Delete</button>
            </div>
        </div>
    </div>
</div>
