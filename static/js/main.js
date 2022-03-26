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
        $('form').append(`<textarea name="body" name="body" placeholder=" Give it some text"></textarea><br>`)
    })

    $('#createPDF').one('click', (e) => {
        e.preventDefault();
        if($('input[type="text"]').val() == 0 ){
            $('input[type="text"], textarea').addClass('error')
        } else {
            $('input[type="text"], textarea').removeClass('error')
            var form = $('#container form')
            $.ajax({
                type: 'POST',
                url: '/',
                data: JSON.stringify(form.serializeArray()),
                contentType: 'application/json',
                dataType: 'json'
            })
            $('#container form').trigger('reset')
            $('#createPDF').css({'background' : '#941e1a'})
            var password = $('#password').attr('value')
            $('#container form').prepend(`<br><p class="result">The password for your PDF is <span>${password}</span></p><br>`)
            $('#container').append('<footer><p>Please refresh the page if you would like to generate another pdf</p></footer>')
        }
    })



})

