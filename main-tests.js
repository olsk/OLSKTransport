const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');


describe('OLSKTransferLauncherFakeItemProxy', function test_OLSKTransferLauncherFakeItemProxy() {

	it('returns object', function () {
		const item = mod.OLSKTransferLauncherFakeItemProxy();
		deepEqual(item, {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemProxy',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('returns undefined', function () {
			deepEqual(mod.OLSKTransferLauncherFakeItemProxy().LCHRecipeCallback(), undefined);
		});

	});

});

