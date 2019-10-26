/* *** Handle initial tab loading *** */
$(document).ready(function() {
    $($.fn.dataTable.tables(true)).DataTable().responsive.recalc().columns.adjust();
    makeAssetManagerActive();
    // loadManufacturers();
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
        // e.preventDefault();
        makeAssetManagerActive(this);
    });
});

$(function() {
    $('#users-link').click(function() {
        $(this).addClass('active');
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
        $(this).addClass('active');
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
    /* Prepare Models table */
    $('#models').DataTable( {
        ajax: {
            url: baseUrl + "Models/get_active",
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
        scrollY:        212,
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
                    // loadManufacturers("model-manufacturer");
                },
                init: function (api, node, config) {
                    $(node).removeClass('btn-secondary');
                    $(node).addClass("add-edit-button");
                    $(node).attr("data-toggle", "modal");
                    $(node).attr("data-url", "Models/add");
                    $(node).attr("data-id", "add-edit-model");
                    $(node).attr("data-type", "POST");
                    $(node).attr("data-tableid", "models");
                    $(node).attr("data-target", "#add-edit-model");
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


// function loadManufacturers(selectId) {
//     $.ajax({
//         type: "GET",
//         url: baseUrl + "Manufacturers/get_active",
//         data: "{ name: name, id: id }",
//         contentType: "application/json;",
//         dataType: "json",
//         success: function(data)
//                 {
//                     $.each(data, function () {
//                         $("#model-manufacturer").append("<option value=" + this.id + ">" + this.name + "</option>");
//                     });
//                 },
//         failure: function () {
//             alert("Failed to load manufacturer");
//         }
//     });
// }
