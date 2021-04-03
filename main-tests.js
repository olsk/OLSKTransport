const { throws, rejects, deepEqual } = require('assert');

const mod = require('./main.js');

const uWindow = function (inputData = {}) {
	const hostname = Math.random().toString();
	return Object.assign({
		prompt: (function () {}),
		alert: (function () {}),
		location: Object.assign({
			reload: (function () {}),
			hostname,
		}, inputData),
	}, inputData);
};

describe('OLSKTransferExportBasename', function test_OLSKTransferExportBasename() {

	it('returns string', function () {
		const hostname = Math.random().toString();
		const now = Math.random().toString();
		deepEqual(mod.OLSKTransferExportBasename({
			window: uWindow({
				hostname,
			}),
			Date: {
				now: (function () {
					return now;
				}),
			},
		}), hostname + '-' + now);
	});

});

describe('OLSKTransferExportJSONFilename', function test_OLSKTransferExportJSONFilename() {

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(Object.assign(Object.assign({}, mod), {
			OLSKTransferExportBasename: (function () {
				return item;
			}),
		}).OLSKTransferExportJSONFilename(), item + '.json');
	});

});

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

describe('OLSKTransferLauncherFakeItemExportSerialized', function test_OLSKTransferLauncherFakeItemExportSerialized() {

	const _OLSKTransferLauncherFakeItemExportSerialized = function (inputData = {}) {
		return mod.OLSKTransferLauncherFakeItemExportSerialized(Object.assign({
			ParamWindow: uWindow(),
			OLSKTransferDispatchExportInput: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransferLauncherFakeItemExportSerialized(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKTransferLauncherFakeItemExportSerialized({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransferDispatchExportInput not function', function () {
		throws(function () {
			_OLSKTransferLauncherFakeItemExportSerialized({
				OLSKTransferDispatchExportInput: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransferLauncherFakeItemExportSerialized();

		deepEqual(item, {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemExportSerialized',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls OLSKTransferDispatchExportInput', async function () {
			const OLSKTransferDispatchExportInput = Math.random().toString();
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransferLauncherFakeItemExportSerialized({
				OLSKTransferDispatchExportInput: (async function () {
					return OLSKTransferDispatchExportInput;
				}),
				ParamWindow,
			}).LCHRecipeCallback(), [JSON.stringify({
				OLSKDownloadName: mod.OLSKTransferExportJSONFilename({
					window: ParamWindow,
				}),
				OLSKDownloadData: OLSKTransferDispatchExportInput,
			})]);
		});

	});

});

describe('OLSKTransferRecipes', function test_OLSKTransferRecipes() {

	const _OLSKTransferRecipes = function (inputData = {}) {
		return mod.OLSKTransferRecipes(Object.assign({
			ParamWindow: uWindow(),
			OLSKTransferDispatchImportJSON: (function () {}),
			OLSKTransferDispatchExportInput: (function () {}),
			ParamSpecUI: false,
		}, inputData))
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransferRecipes(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamSpecUI not boolean', function () {
		throws(function () {
			_OLSKTransferRecipes({
				ParamSpecUI: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('includes production recipes', function () {
		deepEqual(_OLSKTransferRecipes().map(function (e) {
			return e.LCHRecipeSignature || e.LCHRecipeName;
		}), Object.keys(mod).filter(function (e) {
			return e.match(/Launcher/) && !e.match(/Fake/);
		}));
	});

	context('ParamSpecUI', function () {

		it('includes all recipes', function () {
			deepEqual(_OLSKTransferRecipes({
				ParamSpecUI: true,
			}).map(function (e) {
				return e.LCHRecipeSignature || e.LCHRecipeName;
			}), Object.keys(mod).filter(function (e) {
				return e.match(/Launcher/);
			}));
		});
	
	});

});
