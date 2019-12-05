/* *** Handle initial tab loading *** */
$(document).ready(function() {
    loadTabContent();
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    makeAssetManagerActive();
    // loadManufacturers();
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

// function loadTabContent() {
//     var navTabs = $('#nav-tabs-test');
//     var tabContent = $('#nav-tab-content');
//
//     var assetGroupsAccess = getAssetGroupsAccess();
//     console.log(assetGroupsAccess);
//     if (assetGroupsAccess == 6) {
//         console.log(assetGroupsAccess);
//         navTabs.append(
//             "<li class=\"nav-item\">" +
//             "<a id=\"asset-manager-link\" class=\"nav-link active\" href=\"#asset_manager\">Asset Manager</a>" +
//             "</li>"
//         );
//     } else if (assetGroupsAccess == 4) {
//         // load view-only ciew
//     } else {
//
//     }
// }
//
// function getAssetGroupsAccess() {
//     console.log($.ajax({
//         type: 'GET',
//         url: baseUrl + 'Settings/get_asset_groups_access',
//         dataType: 'json',
//         success: function(result) {
//
//         },
//         error: function(result) {
//             var today = new Date();
//             var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
//             console.log("AJAX error, check server logs near local time: " + time);
//         }
//     }));
// }
