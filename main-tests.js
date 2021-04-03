const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const uWindow = function (inputData = {}) {
	return Object.assign({
		prompt: (function () {}),
		location: {
			reload: (function () {}),
		},
	}, inputData);
};


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

describe('OLSKTransferLauncherFakeItemImportSerialized', function test_OLSKTransferLauncherFakeItemImportSerialized() {

	const _OLSKTransferLauncherFakeItemImportSerialized = function (inputData = {}) {
		return mod.OLSKTransferLauncherFakeItemImportSerialized(Object.assign({
			ParamWindow: uWindow(),
			OLSKTransferDispatchImportJSON: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransferLauncherFakeItemImportSerialized(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKTransferLauncherFakeItemImportSerialized({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransferDispatchImportJSON not function', function () {
		throws(function () {
			_OLSKTransferLauncherFakeItemImportSerialized({
				OLSKTransferDispatchImportJSON: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransferLauncherFakeItemImportSerialized();

		deepEqual(item, {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemImportSerialized',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls ParamWindow.prompt', function () {
			deepEqual(uCapture(function (prompt) {
				_OLSKTransferLauncherFakeItemImportSerialized({
					ParamWindow: uWindow({
						 prompt,
					}),
				}).LCHRecipeCallback();
			}), []);
		});

		it('calls OLSKTransferDispatchImportJSON', function () {
			const prompt = Math.random().toString();

			deepEqual(_OLSKTransferLauncherFakeItemImportSerialized({
				ParamWindow: uWindow({
					prompt: (function () {
						return prompt;
					}),
				}),
				OLSKTransferDispatchImportJSON: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback(), [prompt]);
		});

	});

});

