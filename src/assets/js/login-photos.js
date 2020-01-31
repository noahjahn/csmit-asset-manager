$(document).ready(function() {

    var addLoginPhotoUrl = baseUrl + "LoginPhotos/add";
    var deleteLoginPhotoUrl = baseUrl + "LoginPhotos/delete/";
    var getActiveLoginPhotosUrl = baseUrl + "LoginPhotos/get_active";

    $(document).on('click', '.login-photo-delete-link', function (e) {
        id = $(this).data('id');
        $.ajax({
            type: "DELETE",
            url: deleteLoginPhotoUrl + id,
            success: function(result) {
                refreshLoginPhotos();
            },
            error: function(result) {
                var today = new Date();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log("AJAX error, check server logs near local time: " + time);
            }
        });
    });

    $.ajax({
        type: 'GET',
        url: getActiveLoginPhotosUrl,
        dataType: 'json',
        success: function(result) {
            var loginPhotos = $('#login-photos .row');
            Object.keys(result).forEach(function(i) {
                imageUrl = baseUrl + 'uploads/login_photos/' + result[i].name;
                loginPhotos.append('<div class="login-photo-parent"><img src="' + imageUrl + '" class="settings-login-photo"><a class="login-photo-delete-link" data-id=' + result[i].id + ' href="#"><img class="login-photo-delete" src=\'' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg\' /></a></div>')
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });

    var loginPhotosDropzone = new Dropzone("#add-login-photo-form", {
            url: addLoginPhotoUrl,
            acceptedFiles: 'image/*',
            clickable: true,
            createImageThumbnails: false,
            success: function (file, response) {
               this.removeFile(file);
               alert("Upload complete!");
               refreshLoginPhotos();
            }
        }
    );
});

function refreshLoginPhotos() {
    var loginPhotos = $('#login-photos .row');
    loginPhotos.empty();
    $.ajax({
        type: 'GET',
        url: "LoginPhotos/get_active",
        dataType: 'json',
        success: function(result) {
            var loginPhotos = $('#login-photos .row');
            Object.keys(result).forEach(function(i) {
                imageUrl = baseUrl + 'uploads/login_photos/' + result[i].name;
                loginPhotos.append('<div class="login-photo-parent"><img src="' + imageUrl + '" class="settings-login-photo"><a class="login-photo-delete-link" data-id=' + result[i].id + ' href="#"><img class="login-photo-delete" src=\'' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg\' /></a></div>')
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });
}
