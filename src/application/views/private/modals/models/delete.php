<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal fade" id="delete-model" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modal-title-delete-model">Delete Model</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-delete-model">
                Are you sure you want to delete this Model?
            </div>
            <div class="modal-footer">
                <button id="modal-cancel-delete-model" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button id="modal-confirm-delete-model" type="button" class="btn btn-primary" data-dismiss="modal">Delete</button>
            </div>
        </div>
    </div>
</div>
