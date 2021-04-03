const mod = {

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


};

Object.assign(exports, mod);
