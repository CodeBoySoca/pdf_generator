$(() => {

    var csrftoken = $('meta[name=csrf-token]').attr('content')
    $.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken)
        }
        }
    })

    var random_number = Math.floor(Math.random() * 9999)


    $('#dark-icon').hide()

    $('#light-icon, #dark-icon').on('click', (e) => {
        if($('link[id="switch-stylesheet"]').attr('href') === 'static/css/dark.css') {
            $('link[id="switch-stylesheet"]').attr('href', 'static/css/light.css')
        } else  {
            $('link[id="switch-stylesheet"]').attr('href', 'static/css/dark.css')
        }
        $('#light-icon, #dark-icon').toggle()
    })

    $('#addButton').on('click', (e) => {
        $('form').append('<textarea name="body" name="body[]" placeholder=" Give it some text"></textarea><br>')
    })

    $('#createPDF').on('click', (e) => {
        e.preventDefault();
        var form = $('#container form')
        $.ajax({
            type: 'POST',
            url: '/',
            data: JSON.stringify(form.serializeArray()),
            contentType: 'application/json',
            dataType: 'json'
        })
         $('#container form').trigger('reset')
    })

})

