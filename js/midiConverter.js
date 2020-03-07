WebMidi.enable(function () {

    // Retrieve an input by name, id or index
    //var input = WebMidi.inputs[0];
    var input = WebMidi.getInputByName("Network MacBook");
    //var output = WebMidi.outputs[1];
    var ouput = WebMidi.getOutputByName("USB Uno MIDI Interface");
	
	  // Listen for a 'note on' message on channel 2
	  input.addListener('noteon', 2,
	    function (e) {
	    	noteNumber = e.note.number;
	    	noteName = e.note.name + e.note.octave;
	      bank = 0;
	      
	      if(noteNumber <= 128) {
					bank = 0;
	      }
	      else if(noteNumber > 128 && noteNumber <= 256) {
	      	bank = 1;
	      }
	      else if(noteNumber > 256 && noteNumber <= 384) {
	      	bank = 2;
	      }
	      else if(noteNumber > 384 && noteNumber <= 500) {
					bank = 3;
	      }
	      
	      if(noteNumber > 0 && noteNumber <= 500) {
		      // Select Bank
		      output.sendControlChange(0, bank);
		      
		      // Recall Scene
		      output.sendProgramChange((noteNumber-1) % 128)
		      
		      // Show results
		      console.log("Note Number: " + noteNumber + "  Note Name: " + noteName + "  Bank: " + bank + "  Scence Recall(hex): " + ((noteNumber-1) % 128).toString(16));
	    	}
	    }
	  );

});
