/* *** Handle initial tab loading *** */
$(document).ready(function() {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    makeAssetManagerActive();
});

$(window).resize(function () {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
});
/* *** ************************** *** */

$(function(){
    $('.nav-tabs .nav-item .nav-link').hover(function() {
        $(this).addClass('nav-link-hover');
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            $(this).addClass('active.temp');
        }
    }, function() {
        $(this).removeClass('nav-link-hover');
        if ($(this).hasClass('active.temp')) {
            $(this).removeClass('active.temp');
            $(this).addClass('active');
        }
    });
});

/* *** Handle tab switching *** */
function makeAssetManagerActive(obj) {
    $(obj).addClass('active');
    $('#users-link').each(function() {
        $(this).removeClass('active');
    });
    $('#roles-link').each(function() {
        $(this).removeClass('active');
    });
    $('#login-photos-link').each(function() {
        $(this).removeClass('active');
    });
    $('#asset-manager-content').each(function() {
        $(this).addClass('show');
        $(this).addClass('active');
    });
    $('#users-content').each(function() {
        $(this).removeClass('show');
        $(this).removeClass('active');
    });
    $('#roles-content').each(function() {
        $(this).removeClass('show');
        $(this).removeClass('active');
    });
    $('#login-photos-content').each(function() {
        $(this).removeClass('show');
        $(this).removeClass('active');
    });
}

$(function() {
    $('#asset-manager-link').click(function(e) {
        // e.preventDefault();
        makeAssetManagerActive(this);
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    });
});

$(function() {
    $('#users-link').click(function() {
        $(this).addClass('active');
        $('#asset-manager-link').each(function() {
            $(this).removeClass('active');
        });
        $('#roles-link').each(function() {
            $(this).removeClass('active');
        });
        $('#login-photos-link').each(function() {
            $(this).removeClass('active');
        });
        $('#users-content').each(function() {
            $(this).addClass('show');
            $(this).addClass('active');
        });
        $('#asset-manager-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#roles-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#login-photos-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    });
});

$(function() {
    $('#roles-link').click(function() {
        $(this).addClass('active');
        $('#users-link').each(function() {
            $(this).removeClass('active');
        });
        $('#asset-manager-link').each(function() {
            $(this).removeClass('active');
        });
        $('#login-photos-link').each(function() {
            $(this).removeClass('active');
        });
        $('#roles-content').each(function() {
            $(this).addClass('show');
            $(this).addClass('active');
        });
        $('#users-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#asset-manager-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#login-photos-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    });
});

$(function() {
    $('#login-photos-link').click(function() {
        $(this).addClass('active');
        $('#users-link').each(function() {
            $(this).removeClass('active');
        });
        $('#roles-link').each(function() {
            $(this).removeClass('active');
        });
        $('#asset-manager-link').each(function() {
            $(this).removeClass('active');
        });
        $('#login-photos-content').each(function() {
            $(this).addClass('show');
            $(this).addClass('active');
        });
        $('#users-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#roles-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#asset-manager-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    });
});
/* *** ************************** *** */
