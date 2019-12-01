var loadDataTable = $("#users-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveUsersUrl = baseUrl + "Users/get_active";
    /* *** **************** *** */

    /* Prepare Users table */
    if (loadDataTable) {
        $('#users').DataTable( {
            responsive: true,
            ajax: {
                url: getActiveUsersUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "first_name" },
                { "data": "last_name" },
                { "data": "email" },
                { "data": "role" },
                { "data": "last_login", "render": function (data, type, row) {
                        var ret;
                        if (row.last_login == null) {
                            ret = "Never!";
                        } else {
                            var date = new Date(row.last_login);
                            ret = date.toLocaleString('en-US', { hour12: true });
                        }
                        return ret;
                    }
                }
            ],
            scrollY:        '56vh',
            paging:         false,
            fixedHeader:    true,
            info:           false,
            columnDefs: [
                { visible: false, targets: 0 }
            ],
            dom:
                "<'row'<'col-md'>f>" +
    			"<'row'<'col-md'tr>>",
            language: {
                search: "",
                searchPlaceholder: "Search..."
            }
        });
        $("div.table-title-users").html('<h5 class="pt-3">Users</h5>');
        $("#users_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
