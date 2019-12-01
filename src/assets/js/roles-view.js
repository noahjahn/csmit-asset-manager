var loadDataTable = $("#roles-script").attr('data-load-datatable');

$(document).ready(function() {
    /* *** Static Variables *** */
    var getActiveRolesUrl = baseUrl + "Roles/get_active";
    /* *** **************** *** */

    /* Prepare Roles table */
    if (loadDataTable) {
        $('#roles').DataTable( {
            responsive: true,
            ajax: {
                url: getActiveRolesUrl,
                dataSrc: ''
            },
            columns: [
                { "data": "id" },
                { "data": "name" },
                { "data": "dashboard", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "asset_manager", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "reports", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "asset_groups", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "users", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "roles", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
                    }
                },
                { "data": "login_photos", "render": function (data, type, row) {
                        if (row.dashboard == 2) {
                            return 'W';
                        } else if (row.dashboard == 4) {
                            return 'R';
                        } else if (row.dashboard == 6) {
                            return 'RW';
                        } else {
                            return '';
                        }
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
        $("div.table-title-roles").html('<h5 class="pt-3">Roles</h5>');
        $("#roles_wrapper").addClass("mb-4", "pt-2");
    }
    /* *** **** *** ** ** * */

});
