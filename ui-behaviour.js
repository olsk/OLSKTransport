(function() {
	const mod = {

		// INTERFACE

		InterfaceLauncherButtonDidClick () {
			window.Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: exports.OLSKTransferRecipes({
					ParamWindow: window,
					OLSKLocalized: window.OLSKLocalized,
					OLSKTransferDispatchImportJSON: (function () {}),
					OLSKTransferDispatchExportInput: (function () {
						return Math.random().toString();
					}),
					ParamSpecUI: true,
				}),
			});
		},

	};

	window.OLSKTransferBehaviour = mod;
})();
