<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal fade" id="delete-manufacturer" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-delete-manufacturer">Delete Manufacturer</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-delete-manufacturer">
                Are you sure you want to delete this Manufacturer?
            </div>
            <div class="modal-footer">
                <button id="modal-cancel-delete-manufacturer" type="button" class="btn btn-secondary" data-dismiss="modal">Cancel</button>
                <button id="modal-confirm-delete-manufacturer" type="button" class="btn btn-primary" data-dismiss="modal">Delete</button>
            </div>
        </div>
    </div>
</div>
