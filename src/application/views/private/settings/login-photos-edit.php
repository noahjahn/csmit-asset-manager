<script id="login-photos-script" src="<?php echo base_url(); ?>assets/js/login-photos.js"></script>
<script src="<?php echo base_url(); ?>assets/libraries/dropzone.js"></script>

<div class="container-fluid container-style">
    <div id="login-photos">
        <div class="row login-photos">
        </div>
    </div>
    <?php echo form_open_multipart('LoginPhotos/add', array('id' => 'add-login-photo-form', 'name' => 'add-login-photo-form')); ?>
        <div class="drop-zone dz-message">
            <div class="image-upload">
                <div>
                    <img class="drop-zone-upload-icon" src="<?php echo base_url(); ?>assets/img/icons/upload-svgrepo-com.svg"/>
                </div>
                <div>
                    <label>Drag and drop or click to choose an image to upload</label>
                </div>
            </div>
        </div>
    </form>
</div>
