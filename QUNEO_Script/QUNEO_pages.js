function Page()
{
	
}

var parameterPage = new Page();
var macroPage = new Page();
var userPage = new Page();
var notePage = new Page();
var clipPage = new Page();
var pageIndex = 0

function standardVelocity ()
{
	for (var i = 0 ; i < 128; i ++)
	{
		velocityTable[i] = i
		noteIn.setVelocityTranslationTable(velocityTable);
	}
}

function zeroVeloicty ()
{
	for (var i = 0; i < 128; i ++)
	{
		velocityTable[i] = 0
		noteIn.setVelocityTranslationTable(velocityTable);
	}
}