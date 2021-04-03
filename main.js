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
				return params.OLSKTransferDispatchImportJSON(params.ParamWindow.prompt());
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


};

Object.assign(exports, mod);
