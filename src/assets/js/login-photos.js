$(document).ready(function() {

    var getActiveLoginPhotosUrl = baseUrl + "LoginPhotos/get_active";

    $.ajax({
        type: 'GET',
        url: getActiveLoginPhotosUrl,
        dataType: 'json',
        success: function(result) {
            console.log(result);
            var loginPhotos = $('#login-photos');

            console.log(loginPhotos);
            Object.keys(result).forEach(function(i) {
                console.log(result[i].name);
                if (i+1 % 3 == 0) {
                    loginPhotos.append('</div><div class="row"><img src="' + baseUrl + "uploads/login_photos/" + result[i].name + '" class="settings-login-photo"></img>')
                } else {
                    loginPhotos.append('<img src="' + baseUrl + "uploads/login_photos/" + result[i].name + '" class="settings-login-photo"></img>')
                }
                // manufacturers.push({name: result[i].name, value: result[i].id});
            });
        },
        error: function(result) {
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.log("AJAX error, check server logs near local time: " + time);
        }
    });

});
