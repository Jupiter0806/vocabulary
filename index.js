var currentWord = '';

var index = 0;

        var wordList = [
                'hello',
                'world',
                'you',
                'pretty'
            ];

        function getNextWord() {
            // var index = Math.floor(Math.random() * wordList.length) + 1;
            return wordList[index++];
        }

        function goToNextWord() {
            currentWord = getNextWord();
            $('#word').text(currentWord).hide();
        }

        $(document).ready(function(){
            goToNextWord();

            $('#speak').on('click', function() {
                if (currentWord) {
                    responsiveVoice.speak("" + currentWord +"");
                }
            });

            $('#check').on('click', function() {
                var inputWord = $('input[name="wordinput"]').val();
                if (inputWord === currentWord) {
                    alert("true");

                }
                alert();
            });

            $('#show').on('click', function() {
                $('#word').toggle();
            });
            
            $('#next').on('click', function(){
                goToNextWord();
            });

            $('#gspeech').on('click', function(){
                var text = $('input[name="text"]').val();
                responsiveVoice.speak("" + text +"");
                // http://responsivevoice.org/
            });

        });