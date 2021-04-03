const mod = {

	OLSKTransportExportBasename (debug = {}) {
		return (debug.window || window).location.hostname + '-' + (debug.Date || Date).now();
	},

	OLSKTransportExportJSONFilename (debug = {}) {
		return this.OLSKTransportExportBasename(debug) + '.json';
	},

	OLSKTransportLauncherFakeItemProxy () {
		return {
			LCHRecipeName: 'OLSKTransportLauncherFakeItemProxy',
			LCHRecipeCallback () {},
		};
	},

	_AlertIfNotValid (text, params) {
		if (!text.trim()) {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransportLauncherItemImportJSONErrorNotFilledAlertText'));
		}

		if (!text.startsWith('{') || !text.endsWith('}')) {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransportLauncherItemImportJSONErrorNotValidAlertText'));
		}

		try {
			return params.OLSKTransportDispatchImportJSON(JSON.parse(text));
		} catch {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransportLauncherItemImportJSONErrorNotValidAlertText'));
		}
	},

	OLSKTransportLauncherItemImportJSON (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransportDispatchImportJSON !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKTransportLauncherItemImportJSON',
			LCHRecipeName: params.OLSKLocalized('OLSKTransportLauncherItemImportJSONText'),
			async LCHRecipeCallback () {
				const text = await this.api.LCHReadTextFile({
					accept: '.json',
				});

				return mod._AlertIfNotValid(text, params);
			},
		};
	},

	OLSKTransportLauncherItemExportJSON (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransportDispatchExportInput !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKTransportLauncherItemExportJSON',
			LCHRecipeName: params.OLSKLocalized('OLSKTransportLauncherItemExportJSONText'),
			async LCHRecipeCallback (inputData) {
				return this.api.LCHSaveFile(JSON.stringify(inputData || await params.OLSKTransportDispatchExportInput()), mod.OLSKTransportExportJSONFilename({
					window: params.ParamWindow || window,
				}));
			},
		};
	},

	OLSKTransportLauncherFakeItemImportSerialized (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransportDispatchImportJSON !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeName: 'OLSKTransportLauncherFakeItemImportSerialized',
			LCHRecipeCallback () {
				return mod._AlertIfNotValid(params.ParamWindow.prompt(), params);
			},
		};
	},

	OLSKTransportLauncherFakeItemExportSerialized (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransportDispatchExportInput !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeSignature: 'OLSKTransportLauncherFakeItemExportSerialized',
			LCHRecipeName: 'OLSKTransportLauncherFakeItemExportSerialized',
			async LCHRecipeCallback (inputData) {
				return params.ParamWindow.alert(JSON.stringify({
					OLSKDownloadName: mod.OLSKTransportExportJSONFilename({
						window: params.ParamWindow,
					}),
					OLSKDownloadData: JSON.stringify(inputData || await params.OLSKTransportDispatchExportInput()),
				}));
			},
		};
	},

	OLSKTransportRecipes (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamSpecUI !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return [
			mod.OLSKTransportLauncherFakeItemProxy(),
			mod.OLSKTransportLauncherItemImportJSON(params),
			mod.OLSKTransportLauncherItemExportJSON(params),
			mod.OLSKTransportLauncherFakeItemImportSerialized(params),
			mod.OLSKTransportLauncherFakeItemExportSerialized(params),
		].filter(function (e) {
			if (params.ParamSpecUI) {
				return true;
			}

			return !(e.LCHRecipeSignature || e.LCHRecipeName).match(/Fake/);
		});
	},

};

Object.assign(exports, mod);
