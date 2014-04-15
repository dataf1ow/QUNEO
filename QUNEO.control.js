loadAPI(1);

host.defineController("Keith McMillen Instruments", "QUNEO", "1.0", "9BE40A60-B53E-11E3-A5E2-0800200C9A66");
host.defineMidiPorts(1,1);
host.addDeviceNameBasedDiscoveryPair(["QUNEO"], ["QUNEO"]);


load("QUNEO_functions.js")
load("QUNEO_pages.js")
load("QUNEO_parameterPage.js")
load("QUNEO_notes.js")



var on = true
var paramPage = 1;
var pageNames = [8];
var isMacroMapping = [];
var paramValues =  initArray(0, 8);
var macroValues =  initArray(0, 8);
var trackName = "tracks";
var activePage = parameterPage;
var translationTable = initArray(60, 128);
var noteIn = new Object();
var translate = new Object();
var pageIndex = pageNames.length



function init()
{
	host.getMidiInPort(0).setMidiCallback(onMidi);
	noteIn = host.getMidiInPort(0).createNoteInput("QUNEO", "80????", "90????")
	noteIn.setShouldConsumeEvents(false);
	updateTranslationTable();
	noteIn.setKeyTranslationTable(translationTable);
	println("These ARE the pads you're looking....guy")
	sendMidi(144, 36, 127);
	sendMidi(144, 37, 127);
	sendMidi(144, 38, 127);
	sendMidi(144, 39, 127);
	sendMidi(144, 42, 127);
	sendMidi(144, 43, 127);
	padLED();
    
	////////Views

	transport = host.createTransport();
	application = host.createApplication();
	trackBank = host.createTrackBank(8, 1, 0);
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
		host.showPopupNotification("Track = " + trackName);	
		
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
					host.showPopupNotification("Parameter Page = " + pageNames[paramPage]);
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
	}

	
	
	devicePage.updateIndications();

	host.showPopupNotification("These ARE the pads you're looking....guy");
	
}

function makeIndexedFunction(index, f)
{ 
	return function(value)
	{
		f(index, value);
	};
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
		parameter.setIndication(true );///Tells BitWig to associate the color with the parameters. 
		macro.setIndication(true);
		track.getVolume().setIndication(false);
		track.getPan().setIndication(false);
	}
}


function onMidi(status, data1, data2)
	{
		//println(status + " " + data1 + " " + data2)
		
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

				
			}
		
	}





function exit()
	{

	}
