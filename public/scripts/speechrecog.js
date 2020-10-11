
			/* JS comes here */
		    function runSpeechRecognition() {
		        // get output div reference
		        var output = document.getElementById("search");
		        // get action element reference
		        var action = document.getElementById("mic");
                // new speech recognition object
                var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
                var recognition = new SpeechRecognition();
            
                // This runs when the speech recognition service starts
                recognition.onstart = function() {
                    //output.classList.remove("fa-microphone");
                    action.className = "fa";
                    action.className += " fa-stop";
                };
                
                recognition.onspeechend = function() {
                    action.className = "fa";
                    action.className += " fa-microphone";
                    recognition.stop();
                }
              
                // This runs when the speech recognition service returns result
                recognition.onresult = function(event) {
                    var transcript = event.results[0][0].transcript;
                    output.value=transcript;
                };
              
                 // start recognition
                 recognition.start();
	        }