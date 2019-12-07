<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div id="delete-role" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-delete-role" class="modal-title">Delete Role</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-delete-role" class="modal-body">
                Are you sure you want to delete this Role?
            </div>
            <div class="modal-footer">
                <button id="modal-cancel-delete-role" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                <button id="modal-submit-delete-role" type="button" class="btn btn-primary" data-dismiss="modal">Delete</button>
            </div>
        </div>
    </div>
</div>
