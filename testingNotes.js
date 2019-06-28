$('button(data-panel=panel1)')

DRY(do not repeat yourself)

$(funcdtionl() {}
$('.panel-button').on('click', function () {
    var panelID = $(this).attr('data-panelLid');
    $('#' + panelID).toggle();$('#'+panelID+'.panel-body').html(content)

});

})