const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe(`OLSKTransfer_Localize-${ OLSKRoutingLanguage }`, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes OLSKTransferLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('OLSKTransferLauncherItemImportJSON', uLocalized('OLSKTransferLauncherItemImportJSONText'));
		});

		it('localizes OLSKTransferLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('OLSKTransferLauncherItemExportJSON', uLocalized('OLSKTransferLauncherItemExportJSONText'));
		});

		describe('OLSKTransferLauncherItemImportJSON', function test_OLSKTransferLauncherItemImportJSON() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKTransferLauncherFakeItemImportSerialized');
				});

				it('localizes OLSKTransferLauncherItemImportJSONErrorNotFilledAlert', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							return Object.assign(dialog, {
								response: ' ',
							});
						});
					}, uLocalized('OLSKTransferLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKTransferLauncherFakeItemImportSerialized');
				});

				it('localizes OLSKTransferLauncherItemImportJSONErrorNotValidAlert', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							return Object.assign(dialog, {
								response: JSON.stringify([]),
							});
						});
					}, uLocalized('OLSKTransferLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
		});

	});

});
