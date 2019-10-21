<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css" />

<div class="modal" id="add-asset" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Adding New Asset</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <div class="md-form mb-4">
          <input type="text" id="input1" class="form-control validate">
          <label data-success="right" data-error="wrong" for="input1">Input 1</label>
        </div>
        <div class="mb-4">
          <input id="input2" type="text" class="form-control validate">
          <label data-success="right" data-error="wrong" for="input2">Input 2</label>
        </div>
        <div class="mb-4">
          <input id="input3" type="text" class="form-control validate">
          <label data-success="right" data-error="wrong" for="input3">Input 3</label>
        </div>
        <div class="mb-4">
          <input id="input4" type="text" class="form-control validate">
          <label data-success="right" data-error="wrong" for="input4">Input 4</label>
        </div>
        <div class="mb-4">
          <input id="input5" type="text" class="form-control validate">
          <label data-success="right" data-error="wrong" for="input5">Input 5</label>
        </div>
      </div>
      <div class="modal-footer">
        <button id="modal-add-asset" type="button" class="btn btn-primary">Add</button>
      </div>
    </div>
  </div>
</div>
