<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/custom-modal.css"/>

<div id="add-role" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-add-role" class="modal-title">Add Role</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modal-body-add-role">
                <?php echo form_open(current_url(), array( 'id' => 'add-role-form', 'name' => 'add-role-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="add-role-name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="add-role-name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Dashboard<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-dashboard-read" name="dashboard" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-dashboard-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-dashboard-write" name="dashboard" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-dashboard-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-dashboard-none" name="dashboard" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-dashboard-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-dashboard-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Asset Manager<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-manager-read" name="asset_manager" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-asset-manager-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-manager-write" name="asset_manager" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-asset-manager-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-manager-none" name="asset_manager" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-asset-manager-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-asset-manager-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Reports<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-reports-read" name="reports" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-reports-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-reports-write" name="reports" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-reports-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-reports-none" name="reports" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-reports-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-reports-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Asset Groups<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-groups-read" name="asset_groups" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-asset-groups-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-groups-write" name="asset_groups" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-asset-groups-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-asset-groups-none" name="asset_groups" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-asset-groups-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-asset-groups-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Users<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-users-read" name="users" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-users-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-users-write" name="users" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-users-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-users-none" name="users" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-users-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-users-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Roles<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-roles-read" name="roles" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-roles-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-roles-write" name="roles" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-roles-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-roles-none" name="roles" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-roles-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-roles-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Login Photos<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-login-photos-read" name="login_photos" value="4" class="custom-control-input" checked="">
                                <label class="custom-control-label" for="add-role-login-photos-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-login-photos-write" name="login_photos" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-login-photos-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="add-role-login-photos-none" name="login_photos" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="add-role-login-photos-none">None</label>
                            </div>
                        </div>
                        <div id="add-role-login-photos-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-add-role" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="role-add-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>

<div id="edit-role" class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 id="modal-title-edit-role" class="modal-title">Edit Role</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="modal-body-edit-role" class="modal-body">
                <?php echo form_open(current_url(), array( 'id' => 'edit-role-form', 'name' => 'edit-role-form')); ?>
                    <div class="form-group">
                        <label>Name<span class="required"> *</span></label>
                        <input id="edit-role-name" name="name" class="form-control" value="<?php set_value('name'); ?>">
                        <div id="edit-role-name-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Dashboard<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-dashboard-read" name="dashboard" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-dashboard-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-dashboard-write" name="dashboard" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-dashboard-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-dashboard-none" name="dashboard" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-dashboard-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-dashboard-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Asset Manager<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-manager-read" name="asset_manager" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-manager-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-manager-write" name="asset_manager" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-manager-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-manager-none" name="asset_manager" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-manager-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-asset-manager-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Reports<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-reports-read" name="reports" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-reports-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-reports-write" name="reports" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-reports-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-reports-none" name="reports" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-reports-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-reports-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Asset Groups<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-groups-read" name="asset_groups" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-groups-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-groups-write" name="asset_groups" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-groups-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-asset-groups-none" name="asset_groups" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-asset-groups-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-asset-groups-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Users<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-users-read" name="users" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-users-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-users-write" name="users" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-users-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-users-none" name="users" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-users-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-users-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Roles<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-roles-read" name="roles" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-roles-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-roles-write" name="roles" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-roles-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-roles-none" name="roles" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-roles-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-roles-error" class="invalid-feedback"></div>
                    </div>
                    <div class="form-group">
                        <label>Login Photos<span class="required"> *</span></label>
                        <div class="row mr-0 ml-0">
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-login-photos-read" name="login_photos" value="4" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-login-photos-read">Read</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-login-photos-write" name="login_photos" value="6" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-login-photos-write">Read/Write</label>
                            </div>
                            <div class="custom-control custom-radio col">
                                <input type="radio" id="edit-role-login-photos-none" name="login_photos" value="0" class="custom-control-input">
                                <label class="custom-control-label" for="edit-role-login-photos-none">None</label>
                            </div>
                        </div>
                        <div id="edit-role-login-photos-error" class="invalid-feedback"></div>
                    </div>
                    <div>
                        <div class="modal-body-footer">
                            <button id="modal-cancel-edit-role" type="button" class="btn btn-danger" data-dismiss="modal">Cancel</button>
                            <input type="submit" name="role-edit-edit-submit" value="Save" class="btn btn-primary">
                        </div>
                    </div>
                <?php echo form_close(); ?>
            </div>
        </div>
    </div>
</div>
