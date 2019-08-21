/* *** Handle initial tab loading *** */
$(document).ready(function() {
        $('#asset_manager').DataTable({
            responsive: true,
        scrollY:        "70vh",
        paging:         false,
        fixedHeader:    true,
        info:           false,
        columns: [
            null,
            null,
            null,
            null,
            null,
            null,
            null,
            {
                width: "16px"
            },
            {
                width: "10px"
            },
        ],
        columnDefs: [
            {
                orderable: false,
                targets: [
                    7,
                    8
                ]
            }
        ],
        dom:
            "<'row'<'col-sm'>fB>" +
            "<'row'<'col-sm'tr>>",
        buttons: [
            {
                text: "Add Asset",
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
});
