// $(document).ready(function() {
//     $('#login_form').validate({
//         rules: {
//             login_email : {
//                 required: true,
//                 email : true
//             },
//                 password : {
//                     required: true
//             }
//         },
//         messages: {
//             email: {
//                 required: "Please provide an email address",
//                 email: "Please enter a valid email address",
//             },
//             password: {
//                 required: "Please provide a password",
//             }
//         }
//     });
// });



//     })('submit', function(e) {
//         e.preventDefault();
//
//         var form = $(this);
//         console.log(form.attr('action'));
//         $.ajax({
//             type: "POST",
//             url: form.attr('action'),
//             data: form.serialize(),
//             success: function(response) {
//                 console.log(response);
//             }
//         });
//     });
// });
