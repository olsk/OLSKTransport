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

describe('OLSKTransportExportBasename', function test_OLSKTransportExportBasename() {

	it('returns string', function () {
		const hostname = Math.random().toString();
		const now = Math.random().toString();
		deepEqual(mod.OLSKTransportExportBasename({
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

describe('OLSKTransportExportJSONFilename', function test_OLSKTransportExportJSONFilename() {

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(Object.assign(Object.assign({}, mod), {
			OLSKTransportExportBasename: (function () {
				return item;
			}),
		}).OLSKTransportExportJSONFilename(), item + '.json');
	});

});

describe('OLSKTransportLauncherFakeItemProxy', function test_OLSKTransportLauncherFakeItemProxy() {

	it('returns object', function () {
		const item = mod.OLSKTransportLauncherFakeItemProxy();
		deepEqual(item, {
			LCHRecipeName: 'OLSKTransportLauncherFakeItemProxy',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {
		
		it('returns undefined', function () {
			deepEqual(mod.OLSKTransportLauncherFakeItemProxy().LCHRecipeCallback(), undefined);
		});

	});

});

describe('OLSKTransportLauncherItemImportJSON', function test_OLSKTransportLauncherItemImportJSON() {

	const _OLSKTransportLauncherItemImportJSON = function (inputData = {}) {
		return mod.OLSKTransportLauncherItemImportJSON(Object.assign({
			OLSKLocalized: uLocalized,
			ParamWindow: uWindow(),
			OLSKTransportDispatchImportJSON: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherItemImportJSON(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKTransportLauncherItemImportJSON({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKTransportLauncherItemImportJSON({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransportDispatchImportJSON not function', function () {
		throws(function () {
			_OLSKTransportLauncherItemImportJSON({
				OLSKTransportDispatchImportJSON: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransportLauncherItemImportJSON();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKTransportLauncherItemImportJSON',
			LCHRecipeName: uLocalized('OLSKTransportLauncherItemImportJSONText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls LCHReadTextFile', function () {
			deepEqual(uCapture(function (LCHReadTextFile) {
				_OLSKTransportLauncherItemImportJSON({
					OLSKTransportDispatchImportJSON: (function () {
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

		it('calls alert if empty', async function () {
			deepEqual(await _OLSKTransportLauncherItemImportJSON({
				ParamWindow: uWindow({
					alert: (function () {
						return [...arguments];
					}),
				}),
			}).LCHRecipeCallback.apply({
				api: {
					LCHReadTextFile: (async function () {
						return ' ';
					}),
				},
			}), [uLocalized('OLSKTransportLauncherItemImportJSONErrorNotFilledAlertText')]);
		});

		it('calls alert if parse error', async function () {
			deepEqual(await _OLSKTransportLauncherItemImportJSON({
				ParamWindow: uWindow({
					alert: (function () {
						return [...arguments];
					}),
				}),
			}).LCHRecipeCallback.apply({
				api: {
					LCHReadTextFile: (async function () {
						return 'alfa';
					}),
				},
			}), [uLocalized('OLSKTransportLauncherItemImportJSONErrorNotValidAlertText')]);
		});

		it('calls alert if not object error', async function () {
			deepEqual(await _OLSKTransportLauncherItemImportJSON({
				ParamWindow: uWindow({
					alert: (function () {
						return [...arguments];
					}),
				}),
			}).LCHRecipeCallback.apply({
				api: {
					LCHReadTextFile: (async function () {
						return '[]';
					}),
				},
			}), [uLocalized('OLSKTransportLauncherItemImportJSONErrorNotValidAlertText')]);
		});

		it('calls OLSKTransportDispatchImportJSON', async function () {
			const item = JSON.stringify({
				[Math.random().toString()]: Math.random().toString(),
			});

			deepEqual(await _OLSKTransportLauncherItemImportJSON({
				OLSKTransportDispatchImportJSON: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback.apply({
				api: {
					LCHReadTextFile: (function () {
						return item;
					}),
				},
			}), [JSON.parse(item)]);
		});

	});

});

describe('OLSKTransportLauncherItemExportJSON', function test_OLSKTransportLauncherItemExportJSON() {

	const _OLSKTransportLauncherItemExportJSON = function (inputData = {}) {
		return mod.OLSKTransportLauncherItemExportJSON(Object.assign({
			OLSKLocalized: uLocalized,
			OLSKTransportDispatchExportInput: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherItemExportJSON(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKLocalized not function', function () {
		throws(function () {
			_OLSKTransportLauncherItemExportJSON({
				OLSKLocalized: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransportDispatchExportInput not function', function () {
		throws(function () {
			_OLSKTransportLauncherItemExportJSON({
				OLSKTransportDispatchExportInput: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransportLauncherItemExportJSON();

		deepEqual(item, {
			LCHRecipeSignature: 'OLSKTransportLauncherItemExportJSON',
			LCHRecipeName: uLocalized('OLSKTransportLauncherItemExportJSONText'),
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls LCHSaveFile', async function () {
			const OLSKTransportDispatchExportInput = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherItemExportJSON({
				OLSKTransportDispatchExportInput: (function () {
					return OLSKTransportDispatchExportInput;
				}),
				ParamWindow,
			}).LCHRecipeCallback.apply({
				api: {
					LCHSaveFile: (function () {
						return [...arguments]
					}),
				},
			}), [JSON.stringify(OLSKTransportDispatchExportInput), mod.OLSKTransportExportJSONFilename({
				window: ParamWindow,
			})]);
		});

		it('skips OLSKTransportDispatchExportInput if inputData', async function () {
			const inputData = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherItemExportJSON({
				ParamWindow,
			}).LCHRecipeCallback.apply({
				api: {
					LCHSaveFile: (function () {
						return [...arguments]
					}),
				},
			}, [inputData]), [JSON.stringify(inputData), mod.OLSKTransportExportJSONFilename({
				window: ParamWindow,
			})]);
		});

	});

});

describe('OLSKTransportLauncherFakeItemImportSerialized', function test_OLSKTransportLauncherFakeItemImportSerialized() {

	const _OLSKTransportLauncherFakeItemImportSerialized = function (inputData = {}) {
		return mod.OLSKTransportLauncherFakeItemImportSerialized(Object.assign({
			ParamWindow: uWindow(),
			OLSKTransportDispatchImportJSON: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherFakeItemImportSerialized(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKTransportLauncherFakeItemImportSerialized({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransportDispatchImportJSON not function', function () {
		throws(function () {
			_OLSKTransportLauncherFakeItemImportSerialized({
				OLSKTransportDispatchImportJSON: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransportLauncherFakeItemImportSerialized();

		deepEqual(item, {
			LCHRecipeName: 'OLSKTransportLauncherFakeItemImportSerialized',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls OLSKTransportDispatchImportJSON', function () {
			const prompt = JSON.stringify({});

			deepEqual(_OLSKTransportLauncherFakeItemImportSerialized({
				ParamWindow: uWindow({
					prompt: (function () {
						return prompt;
					}),
				}),
				OLSKTransportDispatchImportJSON: (function () {
					return [...arguments];
				}),
			}).LCHRecipeCallback(), [JSON.parse(prompt)]);
		});

	});

});

describe('OLSKTransportLauncherFakeItemExportSerialized', function test_OLSKTransportLauncherFakeItemExportSerialized() {

	const _OLSKTransportLauncherFakeItemExportSerialized = function (inputData = {}) {
		return mod.OLSKTransportLauncherFakeItemExportSerialized(Object.assign({
			ParamWindow: uWindow(),
			OLSKTransportDispatchExportInput: (function () {}),
		}, inputData))
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherFakeItemExportSerialized(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamWindow not window', function () {
		throws(function () {
			_OLSKTransportLauncherFakeItemExportSerialized({
				ParamWindow: {},
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if OLSKTransportDispatchExportInput not function', function () {
		throws(function () {
			_OLSKTransportLauncherFakeItemExportSerialized({
				OLSKTransportDispatchExportInput: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('returns object', function () {
		const item = _OLSKTransportLauncherFakeItemExportSerialized();

		deepEqual(item, {
			LCHRecipeName: 'OLSKTransportLauncherFakeItemExportSerialized',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls OLSKTransportDispatchExportInput', async function () {
			const OLSKTransportDispatchExportInput = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherFakeItemExportSerialized({
				OLSKTransportDispatchExportInput: (async function () {
					return OLSKTransportDispatchExportInput;
				}),
				ParamWindow,
			}).LCHRecipeCallback(), [JSON.stringify({
				OLSKDownloadName: mod.OLSKTransportExportJSONFilename({
					window: ParamWindow,
				}),
				OLSKDownloadData: JSON.stringify(OLSKTransportDispatchExportInput),
			})]);
		});

		it('skips OLSKTransportDispatchExportInput in inputData', async function () {
			const inputData = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const ParamWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherFakeItemExportSerialized({
				ParamWindow,
			}).LCHRecipeCallback(inputData), [JSON.stringify({
				OLSKDownloadName: mod.OLSKTransportExportJSONFilename({
					window: ParamWindow,
				}),
				OLSKDownloadData: JSON.stringify(inputData),
			})]);
		});

	});

});

describe('OLSKTransportRecipes', function test_OLSKTransportRecipes() {

	const _OLSKTransportRecipes = function (inputData = {}) {
		return mod.OLSKTransportRecipes(Object.assign({
			ParamWindow: uWindow(),
			OLSKLocalized: uLocalized,
			OLSKTransportDispatchImportJSON: (function () {}),
			OLSKTransportDispatchExportInput: (function () {}),
			ParamSpecUI: false,
		}, inputData))
	};

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportRecipes(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('throws if ParamSpecUI not boolean', function () {
		throws(function () {
			_OLSKTransportRecipes({
				ParamSpecUI: null,
			});
		}, /OLSKErrorInputNotValid/);
	});

	it('includes production recipes', function () {
		deepEqual(_OLSKTransportRecipes().map(function (e) {
			return e.LCHRecipeSignature || e.LCHRecipeName;
		}), Object.keys(mod).filter(function (e) {
			return e.match(/Launcher/) && !e.match(/Fake/);
		}));
	});

	context('ParamSpecUI', function () {

		it('includes all recipes', function () {
			deepEqual(_OLSKTransportRecipes({
				ParamSpecUI: true,
			}).map(function (e) {
				return e.LCHRecipeSignature || e.LCHRecipeName;
			}), Object.keys(mod).filter(function (e) {
				return e.match(/Launcher/);
			}));
		});
	
	});

});
