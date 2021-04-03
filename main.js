const mod = {

	OLSKTransferExportBasename (debug = {}) {
		return (debug.window || window).location.hostname + '-' + (debug.Date || Date).now();
	},

	OLSKTransferExportJSONFilename (debug = {}) {
		return this.OLSKTransferExportBasename(debug) + '.json';
	},

	OLSKTransferLauncherFakeItemProxy () {
		return {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemProxy',
			LCHRecipeCallback () {},
		};
	},

	_AlertIfNotValid (text, params) {
		if (!text.trim()) {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransferLauncherItemImportJSONErrorNotFilledAlertText'));
		}

		if (!text.startsWith('{') || !text.endsWith('}')) {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransferLauncherItemImportJSONErrorNotValidAlertText'));
		}

		try {
			return params.OLSKTransferDispatchImportJSON(JSON.parse(text));
		} catch {
			return params.ParamWindow.alert(params.OLSKLocalized('OLSKTransferLauncherItemImportJSONErrorNotValidAlertText'));
		}
	},

	OLSKTransferLauncherItemImportJSON (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransferDispatchImportJSON !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKTransferLauncherItemImportJSON',
			LCHRecipeName: params.OLSKLocalized('OLSKTransferLauncherItemImportJSONText'),
			async LCHRecipeCallback () {
				const text = await this.api.LCHReadTextFile({
					accept: '.json',
				});

				return mod._AlertIfNotValid(text, params);
			},
		};
	},

	OLSKTransferLauncherItemExportJSON (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKLocalized !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransferDispatchExportInput !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return {
			LCHRecipeSignature: 'OLSKTransferLauncherItemExportJSON',
			LCHRecipeName: params.OLSKLocalized('OLSKTransferLauncherItemExportJSONText'),
			async LCHRecipeCallback () {
				return this.api.LCHSaveFile(await params.OLSKTransferDispatchExportInput(), mod.OLSKTransferExportJSONFilename({
					window: params.ParamWindow || window,
				}));
			},
		};
	},

	OLSKTransferLauncherFakeItemImportSerialized (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransferDispatchImportJSON !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemImportSerialized',
			LCHRecipeCallback () {
				return mod._AlertIfNotValid(params.ParamWindow.prompt(), params);
			},
		};
	},

	OLSKTransferLauncherFakeItemExportSerialized (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (!params.ParamWindow.location) {
			throw new Error('OLSKErrorInputNotValid');
		}
		
		if (typeof params.OLSKTransferDispatchExportInput !== 'function') {
			throw new Error('OLSKErrorInputNotValid');
		}

		const _this = this;

		return {
			LCHRecipeName: 'OLSKTransferLauncherFakeItemExportSerialized',
			async LCHRecipeCallback () {
				return params.ParamWindow.alert(JSON.stringify({
					OLSKDownloadName: mod.OLSKTransferExportJSONFilename({
						window: params.ParamWindow,
					}),
					OLSKDownloadData: await params.OLSKTransferDispatchExportInput(),
				}));
			},
		};
	},

	OLSKTransferRecipes (params) {
		if (typeof params !== 'object' || params === null) {
			throw new Error('OLSKErrorInputNotValid');
		}

		if (typeof params.ParamSpecUI !== 'boolean') {
			throw new Error('OLSKErrorInputNotValid');
		}

		return [
			mod.OLSKTransferLauncherFakeItemProxy(),
			mod.OLSKTransferLauncherItemImportJSON(params),
			mod.OLSKTransferLauncherItemExportJSON(params),
			mod.OLSKTransferLauncherFakeItemImportSerialized(params),
			mod.OLSKTransferLauncherFakeItemExportSerialized(params),
		].filter(function (e) {
			if (params.ParamSpecUI) {
				return true;
			}

			return !(e.LCHRecipeSignature || e.LCHRecipeName).match(/Fake/);
		});
	},

};

Object.assign(exports, mod);
