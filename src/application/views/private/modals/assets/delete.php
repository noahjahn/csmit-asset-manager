<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Delete Asset</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Are you sure you want to delete this Asset?</p>
      </div>
      <div class="modal-footer">
        <button id="modal-delete-asset" type="button" class="btn btn-primary">Delete</button>
        <button id="modal-nevermind" type="button" class="btn btn-secondary" data-dismiss="modal">Nevermind</button>
      </div>
    </div>
  </div>
</div>
