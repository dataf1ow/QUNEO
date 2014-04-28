//Clip Launching Mode

function clipLED()
{
	for (var i = 0; i < 32; i ++)
	{
		sendMidi(144, i, 0); //clear all Pads
	}
	contentLED();
	playingLED();
	
		
}

function contentLED()
{
	if (hasContent[0] >1){
			sendMidi(144, 24, 10)
			sendMidi(144, 25, 10)
		}

		if (hasContent[1] == true){
			sendMidi(144, 26, 10)
			sendMidi(144, 27, 10)
		}

		if (hasContent[2] == true){
			sendMidi(144, 28, 10)
			sendMidi(144, 29, 10)
		}

		if (hasContent[3] == true){
			sendMidi(144, 30, 10)
			sendMidi(144, 31, 10)
		}

		if (hasContent[4] == true){
			sendMidi(144, 16, 10)
			sendMidi(144, 17, 10)
		}

		if (hasContent[5] == true){
			sendMidi(144, 18, 10)
			sendMidi(144, 19, 10)
		}

		if (hasContent[6] == true){
			sendMidi(144, 20, 10)
			sendMidi(144, 21, 10)
		}

		if (hasContent[7] == true){
			sendMidi(144, 22, 10)
			sendMidi(144, 23, 10)
		}

		if (hasContent[8] == true){
			sendMidi(144, 8, 10)
			sendMidi(144, 9, 10)
		}

		if (hasContent[9] == true){
			sendMidi(144, 10, 10)
			sendMidi(144, 11, 10)
		}

		if (hasContent[10] == true){
			sendMidi(144, 12, 10)
			sendMidi(144, 13, 10)
		}

		if (hasContent[11] == true){
			sendMidi(144, 14, 10)
			sendMidi(144, 15, 10)
		}
		if (hasContent[12] == true){
			sendMidi(144, 0, 10)
			sendMidi(144, 1, 10)
		}

		if (hasContent[13] == true){
			sendMidi(144, 2, 10)
			sendMidi(144, 3, 10)
		}

		if (hasContent[14] == true){
			sendMidi(144, 4, 10)
			sendMidi(144, 5, 10)
		}

		if (hasContent[15] == true){
			sendMidi(144, 6, 10)
			sendMidi(144, 7, 10)
		}
}

function playingLED()
{
	if (isPlaying[0] == true){
			sendMidi(144, 24, 127)
			sendMidi(144, 25, 10)
		}

		if (isPlaying[1] == true){
			sendMidi(144, 26, 127)
			sendMidi(144, 27, 10)
		}

		if (isPlaying[2] == true){
			sendMidi(144, 28, 127)
			sendMidi(144, 29, 10)
		}

		if (isPlaying[3] == true){
			sendMidi(144, 30, 127)
			sendMidi(144, 31, 10)
		}

		if (isPlaying[4] == true){
			sendMidi(144, 16, 127)
			sendMidi(144, 17, 10)
		}

		if (isPlaying[5] == true){
			sendMidi(144, 18, 127)
			sendMidi(144, 19, 10)
		}

		if (isPlaying[6] == true){
			sendMidi(144, 20, 127)
			sendMidi(144, 21, 10)
		}

		if (isPlaying[7] == true){
			sendMidi(144, 22, 127)
			sendMidi(144, 23, 10)
		}

		if (isPlaying[8] == true){
			sendMidi(144, 8, 127)
			sendMidi(144, 9, 10)
		}

		if (isPlaying[9] == true){
			sendMidi(144, 10, 127)
			sendMidi(144, 11, 10)
		}

		if (isPlaying[10] == true){
			sendMidi(144, 12, 127)
			sendMidi(144, 13, 10)
		}

		if (isPlaying[11] == true){
			sendMidi(144, 14, 127)
			sendMidi(144, 15, 10)
		}
		if (isPlaying[12] == true){
			sendMidi(144, 0, 127)
			sendMidi(144, 1, 10)
		}

		if (isPlaying[13] == true){
			sendMidi(144, 2, 127)
			sendMidi(144, 3, 10)
		}

		if (isPlaying[14] == true){
			sendMidi(144, 4, 127)
			sendMidi(144, 5, 10)
		}

		if (isPlaying[15] == true){
			sendMidi(144, 6, 127)
			sendMidi(144, 7, 10)
		}
}