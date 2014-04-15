//Notes


var majorScaleOne = [0, 2, 4, 5, 7, 9, 11, 12, 14];
var majorScaleTwo = [0, 1, 3, 5, 7, 8, 10, 12, 13, 15];
var majorScaleThree = [1, 3, 4, 6, 8, 9, 11, 13, 15];

var minorScaleOne = [0, 2, 3, 5, 7, 8, 10, 12, 14, 15];
var minorScaleTwo = [1, 3, 4, 6, 8, 10, 11, 13, 15];
var minorScaleThree = [0, 2, 4, 6, 7, 9, 11, 12, 14];

var majorScales = 
	{
		one: majorScaleOne,
		two: majorScaleTwo,
		three: majorScaleThree,
	};

var minorScales = 
	{
		one: minorScaleOne,
		two: minorScaleTwo,
		three: minorScaleThree,
	};
var scaleName = ["Major", "Minor"];
var scaleTypeIndex = 0
var scaleLength = 9;
var scaleType = scaleTypeIndex
var scale = majorScales.one;
var GREEN_LEDS = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30];
var RED_LEDS = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31];
var scaleRoot = (scaleIndex % 3) * 4;
var scaleIndex = 9;
var rootOffset = 60;
var roots = ["C", "C#/Db", "D", "D#/Eb", "E","F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"];

function scaleScroll(){
	if (scaleTypeIndex == 0)
	{
		if (scaleIndex % 3 == 0)
		{
			scale = majorScales.one
		}else if(scaleIndex % 3 == 1)
		{
			scale = majorScales.two
		}else if(scaleIndex % 3 == 2)
		{
			scale = majorScales.three
		}
		scaleLength = scale.length
	}else if (scaleTypeIndex == 1)
	{
		if (scaleIndex % 3 == 0)
		{
			scale = minorScales.one
		}else if(scaleIndex % 3 == 1)
		{
			scale = minorScales.two
		}else if(scaleIndex % 3 == 2)
		{
			scale = minorScales.three
		}
		scaleLength = scale.length
	}	
}


function padLED ()
	{
		for (var i = 0; i < 32; i ++)
					{
						sendMidi(144, i, 0);

					};
					scaleScroll();

					for (var i = 0 ; i < scale.length ; i++)
					{
						sendMidi(144 , GREEN_LEDS[scale[i]], 127)
						if (scaleIndex % 3 == 0)
							{
								if ( i % 7 == 0)
								{
									sendMidi(144 , (RED_LEDS[scale[i]]), 80)
								}
							}else if (scaleIndex %3 == 1)
							{
								if (scaleTypeIndex == 0)
									{sendMidi(144 , (RED_LEDS[scale[5]]), 80)
									}else if (scaleTypeIndex == 1)
									{sendMidi(144 , (RED_LEDS[scale[4]]), 80)}
							}else if (scaleIndex % 3 == 2)
							{
								sendMidi(144 , (RED_LEDS[scale[2]]), 80)
							}
					}
	}

function scaleIndexScroll(data1, data2)
	{
		if (data1 == 25 && data2 == 127)
				{
					if (scaleIndex == 32){
						scaleIndex == 32
					}else{
						scaleIndex ++;
					}
					padLED();
					updateTranslationTable();

				}

				if (data1 == 26 && data2 == 127)
				{
					if (scaleIndex == 0){
						scaleIndex == 0
					}else{
						scaleIndex --;
					}
					padLED();
					updateTranslationTable();
					
				}
	}

function scaleNotifications (){
		if (scaleTypeIndex == 0)
		{
			host.showPopupNotification("Major")
		}else if (scaleTypeIndex == 1)
		{
			host.showPopupNotification("Minor")
		}
	}

function scaleTypeScroll(data1, data2)
	{
		if (data1 == 27 && data2 == 127)
				{
					if (scaleTypeIndex == 1)
						{scaleTypeIndex = 1
					}else
					{
						scaleTypeIndex ++;
					}
					
					padLED();
					scaleNotifications();
				}

				if (data1 == 28 && data2 ==127)
				{
					if (scaleTypeIndex == 0)
						{scaleTypeIndex = 0
					}else
					{
						scaleTypeIndex --;
					}
					
					padLED();
					scaleNotifications();
				}
	}


function updateTranslationTable ()
	{
		for (var i = 0; i < 127; i ++)å
		{
			var offset = (i + scaleIndex * 4) + (rootOffset % 12);
			if (offset >= 127)
			{
				offset = 127
			}

			translationTable[i] = offset;

			

		}
		noteIn.setKeyTranslationTable(translationTable);
		println(translationTable[0]);
	}



function rootOffsetIndex(data1, data2)
{
	if (data1 == 22 && data2 == 127)
		{ 	
			rootOffset ++ ; 
			host.showPopupNotification("Root = " + roots[rootOffset % 12])
			updateTranslationTable();

		}else if (data1 == 21 && data2 == 127)
		{
			rootOffset -- ; 
			host.showPopupNotification("Root = " + roots[rootOffset % 12])
			updateTranslationTable();
		}
}




