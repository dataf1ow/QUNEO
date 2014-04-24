//Clip Launching Mode

function clipLED()
{
	for (var i = 0; i < 32; i ++)
	{
		sendMidi(144, i, 0); //clear all Pads
	}

	for (var i = 0; i < 16; i ++)
	{
		if (i < 4)
		{
			sendMidi(144, (i * 2) + 24, 127)
		}
	}
}