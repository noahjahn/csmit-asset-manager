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

$(document).ready( function () {
    /* Prepare Asset Types table */
    $('#asset_types').DataTable( {
        ajax: {
            url: baseUrl + "AssetTypes/get_all_json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "name" },
            { "data": "rate", "render": function (data, type, row) {
                    return "$" + row.rate;
            }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-asset-type" data-type="POST" data-tableid="asset_types" data-url="AssetTypes/edit/' + row.id + '" data-target="#add-edit-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-asset-type" data-type="DELETE" data-tableid="asset_types" data-url="AssetTypes/delete/' + row.id + '" data-target="#delete-asset-type"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
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
            "<'row'<'col-sm'<'table-title-asset_types'>>fB>" +
			"<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Asset Type",
                action: function (e, dt, node, config) {
                    // addAssetTypeModal();
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
    $("div.table-title-asset_types").html('<h5 class="pt-3">Asset Types</h5>');
    $("#asset_types_wrapper").addClass("mb-4", "pt-2");

    /* Prepare Teams table */
    $('#teams').DataTable( {
        ajax: {
            url: baseUrl + "Teams/get_all_json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "name" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-team" data-type="POST" data-tableid="teams" data-url="Teams/edit/' + row.id + '" data-target="#add-edit-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-team" data-type="DELETE" data-tableid="teams" data-url="Teams/delete/' + row.id + '"  data-target="#delete-team"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        scrollY:        200,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columnDefs: [
            { "orderable": false, "targets": [2,3] },
            { "visible": false, "targets": 0 }
        ],
        dom:
            "<'row'<'col-sm'<'table-title-teams'>>fB>" +
			"<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Team",
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
    $("div.table-title-teams").html('<h5 class="pt-3">Teams</h5>');
    $("#teams_wrapper").addClass("mb-4", "pt-2");

    /* Prepare Manufacturers table */
    $('#manufacturers').DataTable( {
        ajax: {
            url: baseUrl + "Manufacturers/get_all_json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "name" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-manufacturer" data-type="POST" data-tableid="manufacturers" data-url="Manufacturers/edit/' + row.id + '" data-target="#add-edit-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-manufacturer" data-type="DELETE" data-tableid="manufacturers" data-url="Manufacturers/delete/' + row.id + '" data-target="#delete-manufacturer"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        scrollY:        200,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columnDefs: [
            { "orderable": false, "targets": [2,3] },
            { "visible": false, "targets": 0 }
        ],
        dom:
            "<'row'<'col-sm'<'table-title-manufacturers'>>fB>" +
			"<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Manufacturer",
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
    $("div.table-title-manufacturers").html('<h5 class="pt-3">Manufacturers</h5>');
    $("#manufacturers_wrapper").addClass("mb-4", "pt-2");

    /* Prepare Models table */
    $('#models').DataTable( {
        ajax: {
            url: baseUrl + "Models/get_all_json",
            dataSrc: ''
        },
        columns: [
            { "data": "id" },
            { "data": "name" },
            { "data": "manufacturer" },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-target="#add-edit-model" data-type="POST" data-tableid="models" data-url="Models/edit/' + row.id + '" data-target="#add-edit-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/edit-svgrepo-com-white.svg"></button></td>';
                }
            },
            { "render": function ( data, type, row ) {
                    return '<button class="table-icon" data-toggle="modal" data-id="delete-model" data-type="DELETE" data-tableid="models" data-url="Models/delete/' + row.id + '" data-target="#delete-model"><img class="mini-icon" src="' + baseUrl + 'assets/img/icons/trash-can-with-cover-svgrepo-com-white.svg"></button></td>';
                }
            }
        ],
        "order": [[ 1, "asc" ]],
        scrollY:        200,
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columnDefs: [
            { "orderable": false, "targets": [3,4] },
            { "visible": false, "targets": 0 }
        ],
        dom:
            "<'row'<'col-sm'<'table-title-models'>>fB>" +
			"<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Model",
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
    $("div.table-title-models").html('<h5 class="pt-3">Models</h5>');
    $("#models_wrapper").addClass("mb-4", "pt-2");
});


/* *** ************************** *** */

$(document).on("click", ".table-icon", function () {
    var url = $(this).data('url');
    var id = $(this).data('id');
    var type = $(this).data('type');
    var tableId = $(this).data('tableid');

    // var originalTitle = appendModalContent("#modal-title" + "-" + id, title);
    // var originalBody = appendModalContent("#modal-body" + "-" + id, title + "?");
    console.log("#" + tableId);
    $("#modal-confirm" + "-" + id).click(async function(e) {
        $.ajax({
            type: type,
            url: baseUrl + url,
            success: function(result) {
            },
            error: function(result) {
                alert('ajax failure');
            }
        });
        $("#" + tableId).DataTable().ajax.reload();
    });

    // $("#" + id).on('hidden.bs.modal', async function () {
    //     await sleep(100);
    //     $("#modal-title" + "-" + id).text(originalTitle);
    //     $("#modal-body" + "-" + id).text(originalBody);
    // });
});
