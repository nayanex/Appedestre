(function () {
    var Message;
    Message = function (arg) {
        this.text = arg.text, this.message_side = arg.message_side;
        this.draw = function (_this) {
            return function () {
                var $message;
                $message = $($('.message_template').clone().html());
                $message.addClass(_this.message_side).find('.text').html(_this.text);
                $('.messages').append($message);
                return setTimeout(function () {
                    return $message.addClass('appeared');
                }, 0);
            };
        }(this);
        return this;
    };
    $(function () {
        var getMessageText, message_side, sendMessage;
        message_side = 'right';
        getMessageText = function () {
            var $message_input;
            $message_input = $('.message_input');
            return $message_input.val();
        };
        sendMessage = function (text, callback) {
            var $messages, message;
            if (text.trim() === '') {
                return;
            }
            $('.message_input').val('');
            $messages = $('.messages');
            message_side = message_side === 'left' ? 'right' : 'left';
            message = new Message({
                text: text,
                message_side: message_side
            });


            message.draw();

            return $messages.animate({ 
                scrollTop: $messages.prop('scrollHeight') 
            }, 300, callback);
        };
        $('.send_message').click(function (e) {
            return sendMessage(getMessageText());
        });
        $('.message_input').keyup(function (e) {
            if (e.which === 13) {
                return sendMessage(getMessageText());
            }
        });

        function showButtons() {
            $('.report-buttons').addClass('active');
        }

        function hideOptions() {
            $('.messages .options').removeClass('active');
        }

        function showCarousel() {
            $('.messages .issues').addClass('active');
        }

        sendMessage('Olá, sou seu assistente Virtual da prefeitura de São Paulo, o que pretende relatar?', showButtons);

        $('.report-buttons button').click(function() {
            sendMessage($(this).text(), function () {
                hideOptions();
                showCarousel();
                
            });

        });

        $('.issues .carousel-cell').click(function() {
            console.log($(this).text())
            sendMessage($(this).text(), function () {
                hideOptions();

            });

        });

        $('.send_message').click(function() {
            console.log($(this).text())
            $(".chat_window").hide();
            $("#map").show();
            initMap();
        });





        
        /*setTimeout(function () {
            return sendMessage('Hi Sandy! How are you?');
        }, 1000);
        return setTimeout(function () {
            return sendMessage('I\'m fine, thank you!');
        }, 2000);*/
    });
}.call(this));