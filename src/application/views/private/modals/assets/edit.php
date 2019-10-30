<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal" id="delete-asset" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Editing Asset {Asset Tag}</h5> <!--Or should it be {manufacturer} {model}?? -->
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Edit Asset Body goes here</p>
      </div>
      <div class="modal-footer">
        <button id="modal-delete-asset" type="button" class="btn btn-primary">Delete</button>
        <button id="modal-nevermind" type="button" class="btn btn-secondary" data-dismiss="modal">Nevermind</button>
      </div>
    </div>
  </div>
</div>
