$(document).ready(function() {
    var assetTypeLabels = [];
    assetTypeLabels = get_asset_type_labels();
    var data = [];

    assetTypeLabels.forEach(function(assetType) {
        data.push(getCountByAssetType(assetType));
    });

    console.log(assetTypeLabels);
    console.log(data);


    var ctx = document.getElementById('asset-types');
    var myDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: assetTypeLabels,
            datasets: [{
                backgroundColor: ["#3e95cd", "#8e5ea2","#3cba9f","#e8c3b9","#c45850"],
                data: data
            }]
        },
        options: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: 'Asset types'
            }
        }
    });

    $('#month-forecast').text("$" + getMonthForecast());
});

function getMonthForecast() {
    var getMonthForecastUrl = baseUrl + "Dashboard/get_month_forecast";
    var forecast;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            forecast = result;
        }
    };
    xmlhttp.open("GET", getMonthForecastUrl, false);
    xmlhttp.send();

    return forecast;
}

function getCountByAssetType(assetType) {
    var getCountByAssetTypeUrl = baseUrl + "Dashboard/get_count_by_asset_type/";
    getCountByAssetTypeUrl = getCountByAssetTypeUrl + assetType;
    var count;

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = this.responseText;
            count = result;
        }
    };
    xmlhttp.open("GET", getCountByAssetTypeUrl, false);
    xmlhttp.send();

    return count;
}

function get_asset_type_labels() {
    var getAssetTypeUrl = baseUrl + "AssetTypes/get_active";
    var assetTypeLabels = [];

    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var result = JSON.parse(this.responseText);
            Object.keys(result).forEach(function(i) {
                assetTypeLabels.push(
                    result[i].name
                );
            });
        }
    };
    xmlhttp.open("GET", getAssetTypeUrl, false);
    xmlhttp.send();

    return assetTypeLabels;

    // function myFunction(arr) {
    //     var out = "";
    //     var i;
    //     for(i = 0; i < arr.length; i++) {
    //         out += '<a href="' + arr[i].url + '">' +
    //         arr[i].display + '</a><br>';
    // }
    // document.getElementById("id01").innerHTML = out;

}
    // return $.ajax({
    //     type: 'GET',
    //     url: getAssetTypeUrl,
    //     dataType: 'json',
    //     data: $(this).serialize(), // get data from the form
    //     headers: {"X-HTTP-Method-Override": "PUT"},
    //     async: true,
    //     success: function(result) {
    //         // console.log(result);
    //
    //         Object.keys(result).forEach(function(i){
    //             assetTypeLabels.push(
    //                 result[i].name
    //             );
    //         });
    //         return assetTypeLabels;
    //         // console.log(assetTypeLabels);
    //
    //         // if (result == "success") {
    //         //     addNameError.empty();
    //         //     addNameField.removeClass('is-invalid');
    //         //     addNameField.addClass('is-valid');
    //         // } else {
    //         //     addNameField.removeClass('is-valid');
    //         //     if (! result["name"] == "") {
    //         //         if (! result["name"] == addNameError.val()) {
    //         //             addNameError.empty(); // empty error messages, if there were any
    //         //             addNameError.append(result["name"]); // display the error messages
    //         //         }
    //         //         if (! addNameField.hasClass('is-invalid')) {
    //         //             addNameField.addClass('is-invalid');
    //         //         }
    //         //     }
    //         // }
    //     },
    //     error: function(result) {
    //         var today = new Date();
    //         var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //         console.log("AJAX error, check server logs near local time: " + time);
    //     }
    // });
