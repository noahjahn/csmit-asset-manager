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
function prepareDataTable(tableId, tableTitle, buttonName, numColumns, ajaxUrl) {
    switch (numColumns) {
        case 3:
            var targets = [2, 3];
            break;
        case 4:
            var targets = [3, 4];
            break;
        default:
            var targets = [2, 3];
    }
    $('#' + tableId).DataTable( {
        ajax: {
            url: baseUrl + ajaxUrl,
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "name" },
            { "data": "rate" },
            { "render": function ( row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add_edit_asset_type_modal"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-asset-type" data-url="AssetTypes/delete/' + row.id + '" data-title="Asset Type" data-target="#delete-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        scrollY:        200,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columnDefs: [
            { "orderable": false, "targets": [3,4] },
            { "visible": false, "targets": 0 }
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
    prepareDataTable("asset_types", "Asset Types", "Add Asset Type", 4, "AssetTypes/get_all_json");
    // prepareDataTable("teams", "Teams", "Add Team", 3);
    // prepareDataTable("manufacturers", "Manufacturers", "Add Manufacturer", 3);
    // prepareDataTable("models", "Models", "Add Model", 4);
});


/* *** ************************** *** */

$(document).on("click", ".table-icon", function () {
    var url = $(this).data('url');
    var title = $(this).data('title');
    var id = $(this).data('id');

    var originalTitle = appendModalContent("#modal-title" + "-" + id, title);
    var originalBody = appendModalContent("#modal-body" + "-" + id, title + "?");

    console.log(url + " " + title)

    $("#modal-confirm" + "-" + id).click(async function(e) {
        $.ajax({
            type: "DELETE",
            url: baseUrl + url,
            success: function(result) {
            },
            error: function(result) {
            }
        });
        console.log(baseUrl + url);
        var table = $("#asset_types").DataTable();
        table.ajax.reload();
    });

    $("#" + id).on('hidden.bs.modal', async function () {
        await sleep(100);
        $("#modal-title" + "-" + id).text(originalTitle);
        $("#modal-body" + "-" + id).text(originalBody);
    });
});
