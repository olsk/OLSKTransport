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
			DebugWindow: uWindow({
				hostname,
			}),
			DebugDate: {
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

describe('OLSKTransportExportTXTFilename', function test_OLSKTransportExportTXTFilename() {

	it('returns string', function () {
		const item = Math.random().toString();
		deepEqual(Object.assign(Object.assign({}, mod), {
			OLSKTransportExportBasename: (function () {
				return item;
			}),
		}).OLSKTransportExportTXTFilename(), item + '.txt');
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
			OLSKTransportDispatchImportJSON: (function () {}),
		}, inputData), {
			DebugWindow: inputData.DebugWindow,
		});
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
				DebugWindow: uWindow({
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
				DebugWindow: uWindow({
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
				DebugWindow: uWindow({
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
		}, inputData), {
			DebugWindow: inputData.DebugWindow || uWindow(),
		})
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
			const DebugWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherItemExportJSON({
				OLSKTransportDispatchExportInput: (function () {
					return OLSKTransportDispatchExportInput;
				}),
				DebugWindow,
			}).LCHRecipeCallback.apply({
				api: {
					LCHSaveFile: (function () {
						return [...arguments]
					}),
				},
			}), [JSON.stringify(OLSKTransportDispatchExportInput), mod.OLSKTransportExportJSONFilename({
				DebugWindow,
			})]);
		});

		it('skips OLSKTransportDispatchExportInput if inputData', async function () {
			const inputData = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const DebugWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherItemExportJSON({
				DebugWindow,
			}).LCHRecipeCallback.apply({
				api: {
					LCHSaveFile: (function () {
						return [...arguments]
					}),
				},
			}, [inputData]), [JSON.stringify(inputData), mod.OLSKTransportExportJSONFilename({
				DebugWindow,
			})]);
		});

	});

});

describe('OLSKTransportLauncherFakeItemImportSerialized', function test_OLSKTransportLauncherFakeItemImportSerialized() {

	const _OLSKTransportLauncherFakeItemImportSerialized = function (inputData = {}) {
		return mod.OLSKTransportLauncherFakeItemImportSerialized(Object.assign({
			OLSKTransportDispatchImportJSON: (function () {}),
		}, inputData), {
			DebugWindow: inputData.DebugWindow || uWindow(),
		});
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherFakeItemImportSerialized(null);
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
				OLSKTransportDispatchImportJSON: (function () {
					return [...arguments];
				}),
				DebugWindow: uWindow({
					prompt: (function () {
						return prompt;
					}),
				}),
			}).LCHRecipeCallback(), [JSON.parse(prompt)]);
		});

	});

});

describe('OLSKTransportLauncherFakeItemExportSerialized', function test_OLSKTransportLauncherFakeItemExportSerialized() {

	const _OLSKTransportLauncherFakeItemExportSerialized = function (inputData = {}) {
		return mod.OLSKTransportLauncherFakeItemExportSerialized(Object.assign({
			OLSKTransportDispatchExportInput: (function () {}),
		}, inputData), {
			DebugWindow: inputData.DebugWindow || uWindow(),
		});
	}

	it('throws if not object', function () {
		throws(function () {
			mod.OLSKTransportLauncherFakeItemExportSerialized(null);
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
			LCHRecipeSignature: 'OLSKTransportLauncherFakeItemExportSerialized',
			LCHRecipeName: 'OLSKTransportLauncherFakeItemExportSerialized',
			LCHRecipeCallback: item.LCHRecipeCallback,
		});
	});

	context('LCHRecipeCallback', function () {

		it('calls OLSKTransportDispatchExportInput', async function () {
			const OLSKTransportDispatchExportInput = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const DebugWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherFakeItemExportSerialized({
				OLSKTransportDispatchExportInput: (async function () {
					return OLSKTransportDispatchExportInput;
				}),
				DebugWindow,
			}).LCHRecipeCallback(), [JSON.stringify({
				OLSKDownloadName: mod.OLSKTransportExportJSONFilename({
					DebugWindow
				}),
				OLSKDownloadData: JSON.stringify(OLSKTransportDispatchExportInput),
			})]);
		});

		it('skips OLSKTransportDispatchExportInput in inputData', async function () {
			const inputData = {
				[Math.random().toString()]: Math.random().toString(),
			};
			const DebugWindow = uWindow({
				alert: (function () {
					return [...arguments];
				}),
			});

			deepEqual(await _OLSKTransportLauncherFakeItemExportSerialized({
				DebugWindow,
			}).LCHRecipeCallback(inputData), [JSON.stringify({
				OLSKDownloadName: mod.OLSKTransportExportJSONFilename({
					DebugWindow,
				}),
				OLSKDownloadData: JSON.stringify(inputData),
			})]);
		});

	});

});

describe('OLSKTransportFakeExportPlaintext', function test_OLSKTransportFakeExportPlaintext() {

	it('throws if not string', function () {
		throws(function () {
			mod.OLSKTransportFakeExportPlaintext(null);
		}, /OLSKErrorInputNotValid/);
	});

	it('calls window.alert', async function () {
		const OLSKDownloadData = Math.random().toString();
		const DebugWindow = uWindow({
			alert: (function () {
				return [...arguments];
			}),
		});

		deepEqual(await mod.OLSKTransportFakeExportPlaintext(OLSKDownloadData, {
			DebugWindow,
		}), [JSON.stringify({
			OLSKDownloadName: mod.OLSKTransportExportTXTFilename({
				DebugWindow,
			}),
			OLSKDownloadData,
		})]);
	});

});

describe('OLSKTransportRecipes', function test_OLSKTransportRecipes() {

	const _OLSKTransportRecipes = function (inputData = {}) {
		return mod.OLSKTransportRecipes(Object.assign({
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
