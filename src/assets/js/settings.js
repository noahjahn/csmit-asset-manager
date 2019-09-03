/* *** Handle initial tab loading *** */
$(document).ready(function() {
//     $('a[data-toggle="tab"]').on( 'shown.bs.tab', function (e) {
//     // var target = $(e.target).attr("href"); // activated tab
//     // alert (target);
//     // $($.fn.dataTable.tables( true ) ).css('width', '100%');
//     // $($.fn.dataTable.tables( true ) ).DataTable().columns.adjust().draw();
// } );
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    makeAssetManagerActive();
});
/* *** ************************** *** */



/* *** Handle tab switching *** */
function makeAssetManagerActive() {
    $(this).addClass('active')
    $('#users-link').each(function() {
        $(this).removeClass('active');
    });
    $('#permissions-link').each(function() {
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
    $('#permissions-content').each(function() {
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
        e.preventDefault();
        makeAssetManagerActive();
    });
});

$(function() {
    $('#users-link').click(function() {
        $(this).addClass('active')
        $('#asset-manager-link').each(function() {
            $(this).removeClass('active');
        });
        $('#permissions-link').each(function() {
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
        $('#permissions-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#login-photos-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
    });
});

$(function() {
    $('#permissions-link').click(function() {
        $(this).addClass('active')
        $('#users-link').each(function() {
            $(this).removeClass('active');
        });
        $('#asset-manager-link').each(function() {
            $(this).removeClass('active');
        });
        $('#login-photos-link').each(function() {
            $(this).removeClass('active');
        });
        $('#permissions-content').each(function() {
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
    });
});

$(function() {
    $('#login-photos-link').click(function() {
        $(this).addClass('active')
        $('#users-link').each(function() {
            $(this).removeClass('active');
        });
        $('#permissions-link').each(function() {
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
        $('#permissions-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
        $('#asset-manager-content').each(function() {
            $(this).removeClass('show');
            $(this).removeClass('active');
        });
    });
});
/* *** ************************** *** */

/* ******** Models Data table ******* */
function prepareDataTable(tableId, tableTitle, buttonName, numColumns) {
    switch (numColumns) {
        case 3:
            var targets = [1, 2];
            break;
        case 4:
            var targets = [2, 3];
            break;
        default:
            var targets = [1, 2];
    }
    $('#' + tableId).DataTable( {
        scrollY:        200,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columnDefs: [
            {
                orderable: false,
                targets: targets
            }
        ],
        dom:
            "<'row'<'col-sm'<'table-title-" + tableId + "'>>fB>" +
			"<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: buttonName,
                action: function (e, dt, node, config) {
                    alert( 'Button activated' );
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                },
                className: 'btn-primary'
            }
        ],
        language: {
            search: "",
            searchPlaceholder: "Search..."
        }
    });
    $("div.table-title-" + tableId).html('<h5 class="pt-3">' + tableTitle + '</h5>');
    $("#" + tableId + "_wrapper").addClass("mb-4", "pt-2");
}

$(document).ready( function () {
    prepareDataTable("asset_types", "Asset Types", "Add Asset Type", 4);
    prepareDataTable("teams", "Teams", "Add Team", 3);
    prepareDataTable("manufacturers", "Manufacturers", "Add Manufacturer", 3);
    prepareDataTable("models", "Models", "Add Model", 4);
});


/* *** ************************** *** */

$(document).on("click", ".table-icon", function () {
    var url = $(this).data('url');
    var title = $(this).data('title');
    $(".modal-title").text(title);
    $(".modal-body").text(function(i, originalText){
        return originalText + " " + title + "?";
    });

    $("#modal-confirm").click(function(e) {
        $.ajax({
            type: "DELETE",
            url: baseUrl + url,
            // data: {
            // },
            success: function(result) {
            },
            error: function(result) {
            }
        });

    });
});

// $(document).on("click", )
