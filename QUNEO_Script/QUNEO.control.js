/*

Copyright 2014 Evan Bogunia_____evanbeta@keithmcmillen.com


*/



//Load the bitwig API, obviously.
loadAPI(1);

//Define/set our controller properties [ company, device, version, uuid ]
host.defineController("Keith McMillen Instruments", "QUNEO", "1.0", "A323D780-5AF5-11E4-8ED6-0800200C9A66");
host.defineMidiPorts(1, 1);

//Define/set input/output port names (both i/o are the same)
var portNames 	= 	["QUNEO"];
host.addDeviceNameBasedDiscoveryPair(portNames, portNames);
//host.addDeviceNameBasedDiscoveryPair(["QUNEO MIDI 1"], ["QUNEO MIDI 1"]);

/////Loading external Files
load("QUNEO_functions.js")
load("QUNEO_pages.js")
load("QUNEO_parameterPage.js")
load("QUNEO_notes.js")
load("QUNEO_clips.js")

////Defining Variables

var on = true;
var initialize = 0;
var paramPage = 1;
var pageNames = [8];
var isMacroMapping = [];
var paramValues =  initArray(0, 8);
var macroValues =  initArray(0, 8);
var trackName = "tracks";
var activePage = parameterPage;
var translationTable = initArray(60, 128);
var noteOffTable = initArray(-1, 128);
var selectionTable = initArray(60,128)
var translate = new Object();
var padPage = notePage;
var pageIndex = pageNames.length
var modeSelect = false;
var trackHasChanged = 0;
var parameterHasChanged = 0;
var hasContent = initArray(0, 16);
var isPlaying = initArray(0, 16);
var isRecording = initArray(0, 16);
var isQueued = initArray(0, 16);
var pendingLEDs = initArray(0, 15);
var currentLEDs = initArray(0,15);



function init()
{
	host.getMidiInPort(0).setMidiCallback(onMidi);
	noteIn = host.getMidiInPort(0).createNoteInput("QUNEO", "82????", "92????")
	noteIn.setShouldConsumeEvents(false);
	println("These ARE the pads you're looking....guy")
	sendMidi(144, 36, 127);
	sendMidi(144, 37, 127);
	sendMidi(144, 38, 127);
	sendMidi(144, 39, 127);
	sendMidi(144, 42, 127);
	sendMidi(144, 43, 127);
	
	updateTranslationTable();
	noteIn.setKeyTranslationTable(translationTable);
	noteIn.setShouldConsumeEvents(false);

	//standardVelocity();
    
	////////Views

	transport = host.createTransport();
	application = host.createApplication();
	trackBank = host.createTrackBank(4, 2, 4);
	cursorTrack = host.createCursorTrack(2, 0);
	cursorDevice = host.createCursorDeviceSection(8);
	primaryDevice = cursorTrack.getPrimaryDevice();
	primaryInstrument = cursorTrack.getPrimaryInstrument();
	arranger = host.createArranger(0);
	master = host.createMasterTrack(8);

	//Observers

	master.addVuMeterObserver(127 , -1, false, function(value)
	{
		sendMidi(176, 5, value); 
	})
	
	var string = "trackName"
	cursorTrack.addNameObserver(128, string ,function(name)
	{
		trackName = name;

		if (trackHasChanged == 1){
		host.showPopupNotification("Track = " + trackName);	
		trackHasChanged = 0;
		}
	})


	cursorTrack.getSend(0).addValueObserver(128 ,function(value)
	{
		sendMidi(176, 6, value);
	})
	
	cursorTrack.getSend(1).addValueObserver(128 ,function(value)
	{
		sendMidi(176, 7, value);
	})

	transport.addIsPlayingObserver(function(on)
	{
		playObserver(on);
	})

	transport.addIsRecordingObserver(function(on)
	{
      recObserver(on);
	});
	
	primaryDevice.addPageNamesObserver(function(names)
   {
      pageNames = arguments;

   });

	primaryDevice.addSelectedPageObserver(8, function(page)
	{	
		
		paramPage = page;
		if (parameterHasChanged == 1){
			if (pageNames[paramPage] != undefined){
			host.showPopupNotification("Parameter Page = " + pageNames[paramPage]);
		}
		parameterHasChanged = 0;
		}
	})



	//Parameters
	for ( var p = 0; p < 8; p++)
	{
		
		var parameter = primaryDevice.getParameter(p);
		parameter.addValueObserver(128, makeIndexedFunction(p, function(index, value)
		{
			paramValues[index] = value;
			if (activePage == parameterPage)
				{
					paramLED(index, value);
					
				}
			
		}));
		// parameter.setLabel("P" + (p + 1));
	}

	for (var p = 0; p < 8; p++)
	{

		var macro = primaryDevice.getMacro(p).getAmount();
		macro.addValueObserver(128, makeIndexedFunction(p, function(index, value)
			{

				macroValues[index] = value;
				if (activePage == macroPage)
				{
					macroLED(index, value);
				}
			}));

	for (var t = 0; t < 4; t++)
		{
			var track = trackBank.getTrack(t); 
			var clipLauncher = track.getClipLauncher();
			clipLauncher.setIndication(true);
			
			clipLauncher.addHasContentObserver(getGridObserverFunc(t, hasContent));
      		clipLauncher.addIsPlayingObserver(getGridObserverFunc(t, isPlaying));
      		clipLauncher.addIsRecordingObserver(getGridObserverFunc(t, isRecording));
      		clipLauncher.addIsQueuedObserver(getGridObserverFunc(t, isQueued));
			{
				
			};

			
			
		}
	


	}

	
	
	devicePage.updateIndications();

	host.showPopupNotification("These ARE the pads you're looking....guy");

		if (initialize == 0){
			padLED();
			initialize = 1
		}
	padPage = notePage
}

function makeIndexedFunction(index, f)
{ 
	return function(value)
	{
		f[index] = value;
	};
}

function getGridObserverFunc(track, varToStore)
{
   return function(scene, value)
   {
      varToStore[scene*4 + track] = value;
      if (padPage == clipPage){
      clipLED();
  		}
   }
}

var devicePage = new Object{};

devicePage.updateIndications = function()
{
	for ( var p = 0; p < 8; p++)
	{
		macro = primaryInstrument.getMacro(p).getAmount();
		parameter = primaryDevice.getParameter(p);
		track = trackBank.getTrack(p);
		parameter.setIndication(false);///Tells Bitwig to delete previous color association. 
		parameter.setIndication(true);///Tells BitWig to associate the color with the parameters. 
		macro.setIndication(true);
		//track.getVolume().setIndication(false);
		//track.getPan().setIndication(false);
	}
}


function onMidi(status, data1, data2)
	{
		
		//printMidi(status, data1, data2)
		
			if (isChannelController(status))
			{   
				if (data1 <= 8)
					{
						if (activePage == parameterPage)
						{
							paramControl(data1, data2)
						}
						if (activePage == macroPage)
						{
							macroControl(data1,data2)
						}
					}else if (data1 > 8 && data1 < 11)
						{ if (data1 == 9)
							{
								cursorTrack.getSend(0).set(data2,128);
						}else
							{
								cursorTrack.getSend(1).set(data2, 128);
							}	
					}

			}else{
				
				rootOffsetIndex(data1, data2)
				scaleTypeScroll(data1, data2);
				scaleIndexScroll(data1, data2);
				transportControl(status, data1, data2);
				parameterSelect(data1, data2);
				trackSelect(data1, data2);
				pageSelect(data1, data2);
				clipLaunching(data1, data2)
				clipScroll(data1, data2)
			
							if (modeSelect == true && data1 < 8)
							{	
							
								padPage = notePage
								
							}else if (modeSelect == true && data1 > 7 && data1 < 16 )
							{
								padPage = clipPage
								
							}
						
				
				if (data1 == 32 && data2 == 127)
				{
					println(padPage)		
					noteIn.setKeyTranslationTable(noteOffTable)
					for (var i = 0; i < 32; i ++)
					{
						sendMidi(144, i, 0); //clear all Pads
					}
					for (var i = 0; i < 16; i +=2 )
					{
						sendMidi(144, i, 127)
					}
					for (var i = 17; i < 32; i +=2 )
					{
						sendMidi(144, i, 127)
					}
					
					modeSelect = true;
					
					
					//println(modeSelect)
				}	
					

				if (data1 == 32 && data2 == 0)
					{
						for (var i = 0; i < 32; i ++)
							{
								sendMidi(144, i, 0); //clear all Pads
							}
						modeSelect = false
						if (padPage == notePage)
						{
							padLED();
							noteIn.setKeyTranslationTable(translationTable);
						}else if(padPage == clipPage)
						{

							clipLED();
							for (i = 0; i <16 ;i ++){
									sendClipLEDs(i) 
								}
							noteIn.setKeyTranslationTable(noteOffTable);
						}
						
					}
				
			}
		
	}





function exit()
	{
		for (var i = 0; i < 32; i ++)
					{
						sendMidi(144, i, 0); //clear all Pads
					}

	}

