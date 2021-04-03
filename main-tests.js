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

const uLocalized = function (inputData) {
	return inputData + 'LOCALIZED';
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

describe('OLSKTransferLauncherItemImportJSON', function test_OLSKTransferLauncherItemImportJSON() {

	const _OLSKTransferLauncherItemImportJSON = function (inputData = {}) {
		return mod.OLSKTransferLauncherItemImportJSON(Object.assign({
			OLSKLocalized: uLocalized,
			OLSKTransferDispatchImportJSON: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransferLauncherItemImportJSON(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKTransferLauncherItemImportJSON({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransferDispatchImportJSON not function', function () {
		throws(function () {
			_OLSKTransferLauncherItemImportJSON({
				OLSKTransferDispatchImportJSON: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransferLauncherItemImportJSON();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKTransferLauncherItemImportJSON',
			LCHRecipeName: uLocalized('OLSKTransferLauncherItemImportJSONText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls LCHReadTextFile', function () {
			deepEqual(uCapture(function (LCHReadTextFile) {
				_OLSKTransferLauncherItemImportJSON({
					OLSKTransferDispatchImportJSON: (function () {
						return [...arguments];
					}),
				}).LCHRecipeCallback.apply({
					api: {
						LCHReadTextFile,
					},
				})
			}), [{
				accept: '.json',
			}]);
		});

		it('calls OLSKTransferDispatchImportJSON', async function () {
			const item = Math.random().toString();

			deepEqual(await _OLSKTransferLauncherItemImportJSON({
				OLSKTransferDispatchImportJSON: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback.apply({
				api: {
					LCHReadTextFile: (function () {
						return item
					}),
				},
			}), [item]);
		});

	});

});

describe('OLSKTransferLauncherItemExportJSON', function test_OLSKTransferLauncherItemExportJSON() {

	const _OLSKTransferLauncherItemExportJSON = function (inputData = {}) {
		return mod.OLSKTransferLauncherItemExportJSON(Object.assign({
			OLSKLocalized: uLocalized,
			OLSKTransferDispatchExportInput: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransferLauncherItemExportJSON(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKTransferLauncherItemExportJSON({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransferDispatchExportInput not function', function () {
		throws(function () {
			_OLSKTransferLauncherItemExportJSON({
				OLSKTransferDispatchExportInput: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransferLauncherItemExportJSON();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKTransferLauncherItemExportJSON',
			LCHRecipeName: uLocalized('OLSKTransferLauncherItemExportJSONText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls LCHSaveFile', async function () {
			const OLSKTransferDispatchExportInput = Math.random().toString();
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransferLauncherItemExportJSON({
				OLSKTransferDispatchExportInput: (function () {
					return OLSKTransferDispatchExportInput;
				}),
				ParamWindow,
			}).LCHRecipeCallback.apply({
				api: {
					LCHSaveFile: (function () {
						return [...arguments]
					}),
				},
			}), [OLSKTransferDispatchExportInput, mod.OLSKTransferExportJSONFilename({
				window: ParamWindow,
			})]);
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
			OLSKLocalized: uLocalized,
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
