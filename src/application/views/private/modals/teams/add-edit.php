<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>

<div id="add-team" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-team" class="modal-title">Add Team</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-team">
                <?php echo form_open(current_url(), array( 'id' => 'add-team-form', 'name' => 'add-team-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input id="name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-team" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="team-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div id="edit-team" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-team" class="modal-title">Edit Team</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-edit-team" class="modal-body">
                <?php echo form_open(current_url(), array( 'id' => 'edit-team-form', 'name' => 'edit-team-form')); ?>
                    <div class="form-group">
                        <label>Name</label>
                        <input id="name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="name-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-team" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input id="modal-submit-edit-team" type="submit" name="team-edit-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
