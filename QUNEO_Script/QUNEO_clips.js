//Clip Launching Mode

function GREEN(pad){
	sendMidi(144, pad * 2, 127)
	sendMidi(144, pad * 2 + 1, 0)
}

function RED(pad){
	sendMidi(144, pad * 2, 0)
	sendMidi(144, pad * 2 + 1, 127)
}

function YELLOW1(pad){
	sendMidi(144, pad * 2, 50)
	sendMidi(144, pad * 2 + 1, 5)
}

function OFF(pad){
	sendMidi(144, pad * 2, 0)
	sendMidi(144, pad * 2 + 1, 0)
}

function clipLED()
{
	contentLED();
	playingLED();
	recordingLED();
	clipUpdate();

}


function clipScroll(data1, data2)
{
	if (padPage == clipPage){
		if(data1 == 25 && data2 == 127){
			trackBank.scrollScenesUp()
			println("hey")
		}else if(data1 == 26 && data2 == 127){
			trackBank.scrollScenesDown()

		}else if(data1 == 27 && data2 == 127){
			trackBank.scrollTracksDown()

		} else if(data1 == 28 && data2 == 127){
			trackBank.scrollTracksUp()

		} 
	}





}




function clipLaunching(data1, data2)
{
	if (padPage == clipPage && modeSelect == false){
		if((data1 % 4 == 0) && (data2 > 0)){
			trackBank.getTrack(0).getClipLauncher().launch(3 - (data1/4))
		}else if ((data1 % 4 == 1) && (data2 > 0)){
			trackBank.getTrack(1).getClipLauncher().launch(3 - ((data1 - 1)/4))
		}else if ((data1 % 4 == 2) && (data2 > 0)){
			trackBank.getTrack(2).getClipLauncher().launch(3 - ((data1 - 2)/4))
		}else if ((data1 % 4 == 3) && (data2 > 0)){
			trackBank.getTrack(3).getClipLauncher().launch(3 - ((data1 - 3)/4))
		}



	} 


}

function contentLED()
{
	for(i = 0; i < 16; i++){
		if (hasContent[i] == true){
			pendingLEDs[i] = 1
		}else if (hasContent[i] == false){
			pendingLEDs[i] = 0
		}
	}

}


function playingLED()
{
	for(i = 0; i < 16; i++){
		if (isPlaying[i] == true){
			pendingLEDs[i] = 2
		}
	}
}

function recordingLED()
{
	for (i = 0 ; i <16; i ++){
		if (isRecording[i] == true){
			pendingLEDs[i] = 3
		}
	}

}


function clipUpdate()
{
	for(i = 0; i < 16; i ++){
		if (pendingLEDs[i] != currentLEDs[i]){
			currentLEDs[i] = pendingLEDs[i]
			sendClipLEDs(i)

		}



	}

}

function sendClipLEDs(index){
	switch(index){
		case 0:
			if(currentLEDs[index] == 0){
				OFF(12)

			}else if (currentLEDs[index] == 1){
				YELLOW1(12)

			}else if (currentLEDs[index] == 2){
				GREEN(12)
			}else if (currentLEDs[index] == 3){
				RED(12)
			}
			break;
		case 1:
			if(currentLEDs[index] == 0){
				OFF(13)

			}else if (currentLEDs[index] == 1){
				YELLOW1(13)

			}else if (currentLEDs[index] == 2){
				GREEN(13)
			}else if (currentLEDs[index] == 3){
				RED(13)
			}
			break;
		case 2:
			if(currentLEDs[index] == 0){
				OFF(14)

			}else if (currentLEDs[index] == 1){
				YELLOW1(14)

			}else if (currentLEDs[index] == 2){
				GREEN(14)
			}else if (currentLEDs[index] == 3){
				RED(14)
			}
			break;
		case 3:
			if(currentLEDs[index] == 0){
				OFF(15)

			}else if (currentLEDs[index] == 1){
				YELLOW1(15)

			}else if (currentLEDs[index] == 2){
				GREEN(15)

			}else if (currentLEDs[index] == 3){
				RED(15)
			}
			break;
		case 4:
			if(currentLEDs[index] == 0){
				OFF(8)

			}else if (currentLEDs[index] == 1){
				YELLOW1(8)

			}else if (currentLEDs[index] == 2){
				GREEN(8)

			}else if (currentLEDs[index] == 3){
				RED(8)
			}
			break;
		case 5:
			if(currentLEDs[index] == 0){
				OFF(9)

			}else if (currentLEDs[index] == 1){
				YELLOW1(9)

			}else if (currentLEDs[index] == 2){
				GREEN(9)

			}else if (currentLEDs[index] == 3){
				RED(9)
			}
			break;
		case 6:
			if(currentLEDs[index] == 0){
				OFF(10)

			}else if (currentLEDs[index] == 1){
				YELLOW1(10)

			}else if (currentLEDs[index] == 2){
				GREEN(10)

			}else if (currentLEDs[index] == 3){
				RED(10)
			}
			break;
		case 7:
			if(currentLEDs[index] == 0){
				OFF(11)

			}else if (currentLEDs[index] == 1){
				YELLOW1(11)

			}else if (currentLEDs[index] == 2){
				GREEN(11)

			}else if (currentLEDs[index] == 3){
				RED(11)
			}
			break;
		case 8:
			if(currentLEDs[index] == 0){
				OFF(4)

			}else if (currentLEDs[index] == 1){
				YELLOW1(4)

			}else if (currentLEDs[index] == 2){
				GREEN(4)

			}else if (currentLEDs[index] == 3){
				RED(4)
			}
			break;
		case 9:
			if(currentLEDs[index] == 0){
				OFF(5)

			}else if (currentLEDs[index] == 1){
				YELLOW1(5)

			}else if (currentLEDs[index] == 2){
				GREEN(5)

			}else if (currentLEDs[index] == 3){
				RED(5)
			}
			break;
		case 10:
			if(currentLEDs[index] == 0){
				OFF(6)

			}else if (currentLEDs[index] == 1){
				YELLOW1(6)

			}else if (currentLEDs[index] == 2){
				GREEN(6)

			}else if (currentLEDs[index] == 3){
				RED(6)
			}
			break;
		case 11:
			if(currentLEDs[index] == 0){
				OFF(7)

			}else if (currentLEDs[index] == 1){
				YELLOW1(7)

			}else if (currentLEDs[index] == 2){
				GREEN(7)

			}else if (currentLEDs[index] == 3){
				RED(7)
			}
			break;
		case 12:
			if(currentLEDs[index] == 0){
				OFF(0)

			}else if (currentLEDs[index] == 1){
				YELLOW1(0)

			}else if (currentLEDs[index] == 2){
				GREEN(0)

			}else if (currentLEDs[index] == 3){
				RED(0)
			}
			break;
		case 13:
			if(currentLEDs[index] == 0){
				OFF(1)

			}else if (currentLEDs[index] == 1){
				YELLOW1(1)

			}else if (currentLEDs[index] == 2){
				GREEN(1)

			}else if (currentLEDs[index] == 3){
				RED(1)
			}
			break;
		case 14:
			if(currentLEDs[index] == 0){
				OFF(2)

			}else if (currentLEDs[index] == 1){
				YELLOW1(2)

			}else if (currentLEDs[index] == 2){
				GREEN(2)

			}else if (currentLEDs[index] == 3){
				RED(2)
			}
			break;
		case 15:
			if(currentLEDs[index] == 0){
				OFF(3)

			}else if (currentLEDs[index] == 1){
				YELLOW1(3)

			}else if (currentLEDs[index] == 2){
				GREEN(3)

			}else if (currentLEDs[index] == 3){
				RED(3)
			}
			break;	
	}




}
















