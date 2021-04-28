const kDefaultRoute = require('./controller.js').OLSKControllerRoutes().shift();

kDefaultRoute.OLSKRouteLanguageCodes.forEach(function (OLSKRoutingLanguage) {

	const uLocalized = function (inputData) {
		return OLSKTestingLocalized(inputData, OLSKRoutingLanguage);
	};

	describe('OLSKTransport_Localize-' + OLSKRoutingLanguage, function () {

		before(function () {
			return browser.OLSKVisit(kDefaultRoute, {
				OLSKRoutingLanguage,
			});
		});

		it('localizes OLSKTransportLauncherItemImportJSON', function () {
			return browser.assert.OLSKLauncherItemText('OLSKTransportLauncherItemImportJSON', uLocalized('OLSKTransportLauncherItemImportJSONText'));
		});

		it('localizes OLSKTransportLauncherItemExportJSON', function () {
			return browser.assert.OLSKLauncherItemText('OLSKTransportLauncherItemExportJSON', uLocalized('OLSKTransportLauncherItemExportJSONText'));
		});

		describe('OLSKTransportLauncherItemImportJSON', function test_OLSKTransportLauncherItemImportJSON() {

			context('not filled', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemImportSerialized');
				});

				it('localizes OLSKTransportLauncherItemImportJSONErrorNotFilledAlert', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							return Object.assign(dialog, {
								response: ' ',
							});
						});
					}, uLocalized('OLSKTransportLauncherItemImportJSONErrorNotFilledAlertText'));
				});
			
			});

			context('not valid', function () {
				
				before(function () {
					return browser.pressButton('.OLSKAppToolbarLauncherButton');
				});

				before(async function () {
					return browser.fill('.LCHLauncherFilterInput', 'OLSKTransportLauncherFakeItemImportSerialized');
				});

				it('localizes OLSKTransportLauncherItemImportJSONErrorNotValidAlert', function () {
					return browser.assert.OLSKAlertTextAsync(function () {
						return browser.OLSKPrompt(function () {
							return browser.click('.LCHLauncherPipeItem');
						}, function (dialog) {
							return Object.assign(dialog, {
								response: JSON.stringify([]),
							});
						});
					}, uLocalized('OLSKTransportLauncherItemImportJSONErrorNotValidAlertText'));
				});
			
			});
			
		});

	});

});
