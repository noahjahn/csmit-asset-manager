$(function(){
    $('.side-color').hover(function() {
        $(this).addClass('vert-nav-item-hover');
        $(this).children('.nav-item').removeClass('vert-nav-item');
        $(this).children('.nav-item').addClass('vert-nav-item-active-format');
    }, function() {
        $(this).removeClass('vert-nav-item-hover');
        if (! $(this).hasClass('vert-nav-item-active')) {
            $(this).children('.nav-item').addClass('vert-nav-item');
            $(this).children('.nav-item').removeClass('vert-nav-item-active-format');
        }
    });
});

$(function(){
    $('#nav-collapse').click(function() {
        $(this).addClass('d-none')
        $('#nav-view-handler').each(function() {
            $(this).css('padding-bottom', '169.4px');
        });
        $('#nav-expand').each(function() {
            $(this).removeClass('d-none');
        });
        $('.nav-title').each(function() {
            $(this).addClass('d-none');
        });
        $('#usr-profile').each(function() {
            $(this).addClass('d-none');
        });
        $('#navigation').each(function() {
            $(this).removeClass('container-fluid');
        });
    });
});

$(function(){
    $('#nav-expand').click(function() {
        $(this).addClass('d-none')
        $('#nav-view-handler').each(function() {
            $(this).css('padding-bottom', '');
        });
        $('#nav-collapse').each(function() {
            $(this).removeClass('d-none');
        });
        $('.nav-title').each(function() {
            $(this).removeClass('d-none');
        });
        $('#usr-profile').each(function() {
            $(this).removeClass('d-none');
        });
        $('#navigation').each(function() {
            $(this).addClass('container-fluid');
        });
    });
});
