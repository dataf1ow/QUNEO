function transportControl(status, data1, data2){
	if (data1 == 29 && data2 == 127){
		transport.record();
	}else if (data1 == 30 && data2 == 127){
		transport.stop();
	}else if (data1 == 31 && data2 == 127){
		transport.play();
	}
};

function playObserver(on)
	{
		isPlay = on;
		if (on == true){
			sendMidi(144, 35, 127);
			sendMidi(144, 34, 0);
		}else{
			sendMidi(144, 35, 0);
			sendMidi(144, 34, 127)
		}
	};

function recObserver(on)
	{
		isRec = on;
 		if (on == true){
 			sendMidi(144, 33, 127);
 		}else{
 			sendMidi(144, 33, 0);
 		}
 	};

function trackSelect(data1, data2)
	{
		if(data1 == 19 && data2 != 0)
		{
		
			cursorTrack.selectPrevious();
			
		if (trackName == "Master")
			{
				sendMidi(144, 37, 0)
			}else{
				sendMidi(144,37,127)
			}
			
		} else if(data1 == 20 && data2 != 0)
			{

				cursorTrack.selectNext();
				
		if (trackName == "Master")
			{
				sendMidi(144, 37, 0)
			}else{
				sendMidi(144,37,127)
			}
				
			}	
	}






 function parameterSelect(data1, data2)
 	{
 		if (activePage == parameterPage){
 			if(data1 == 18 && data2 != 0) 
				{
					primaryDevice.nextParameterPage();
					devicePage.updateIndications();
					
				}else if(data1 == 17 && data2 != 0)
				{
					primaryDevice.previousParameterPage();
					devicePage.updateIndications();
					
				}
			}
 	};

 function paramControl(data1, data2)
 	{
		primaryDevice.getParameter(data1 - 1).set(data2,128);
 	}; 

function macroControl(data1, data2)
 	{
		primaryDevice.getMacro(data1 - 1).getAmount().set(data2,128);
 	}; 

function paramLED(index, value)
{
	if(activePage == parameterPage)
	{
		if (index == 0)
			{ sendMidi(176, 1, value)

			}else if (index == 1)
			{
				sendMidi(176, 2, value)

			}else if (index == 2)
			{
				sendMidi(176, 3, value)

			}else if (index == 3)
			{
				sendMidi(176, 4, value)

			}else if (index == 4)
			{
				sendMidi(176, 8, value)

			}else if (index == 5)
			{
				sendMidi(176, 9, value)

			}else if (index == 6)
			{
				sendMidi(176, 10, value)

			}else if (index == 7)
			{
				sendMidi(176,11, value)
			}
	}		
}

function macroLED(index, value)
{
	if (activePage == macroPage)
	{
		if (index == 0)
			{ sendMidi(176, 1, value)

			}else if (index == 1)
			{
				sendMidi(176, 2, value)

			}else if (index == 2)
			{
				sendMidi(176, 3, value)

			}else if (index == 3)
			{
				sendMidi(176, 4, value)

			}else if (index == 4)
			{
				sendMidi(176, 8, value)

			}else if (index == 5)
			{
				sendMidi(176, 9, value)

			}else if (index == 6)
			{
				sendMidi(176, 10, value)

			}else if (index == 7)
			{
				sendMidi(176,11, value)
			}
	}
}

function pageSelect(data1, data2)
	{
		if (data1 == 23)
		{
			activePage = parameterPage
			for (var p = 1; p < 5; p ++)
			for (var p = 8; p < 12; p ++)
			{
				sendMidi(176, p, 0)
			}
			restoreParameters();
			host.showPopupNotification("Parameter Page");
			
			
				sendMidi(144, 40, 127)
				sendMidi(144, 41, 0)
				sendMidi(144, 42, 127)
				sendMidi(144, 43, 127)
			


		}else if (data1 == 24)
			{
				activePage = macroPage
				for (var p = 1; p < 5; p ++)
				for (var p = 8; p < 12; p ++)
			{
				sendMidi(176, p, 0)
			}
				restoreMacros();
				host.showPopupNotification("Macro Page");
				sendMidi(144, 40, 0)
				sendMidi(144, 41, 127)
				sendMidi(144, 42, 0)
				sendMidi(144, 43, 0)
			}




	};

function restoreParameters()
	{
		sendMidi(176, 1, paramValues[0]);
		sendMidi(176, 2, paramValues[1]);
		sendMidi(176, 3, paramValues[2]);
		sendMidi(176, 4, paramValues[3]);
		sendMidi(176, 8, paramValues[4]);
		sendMidi(176, 9, paramValues[5]);
		sendMidi(176, 10, paramValues[6]);
		sendMidi(176, 11, paramValues[7]);
	}

function restoreMacros()
	{
		sendMidi(176, 1, macroValues[0]);
		sendMidi(176, 2, macroValues[1]);
		sendMidi(176, 3, macroValues[2]);
		sendMidi(176, 4, macroValues[3]);
		sendMidi(176, 8, macroValues[4]);
		sendMidi(176, 9, macroValues[5]);
		sendMidi(176, 10, macroValues[6]);
		sendMidi(176, 11, macroValues[7]);
	}