(function() {
	const mod = {

		// INTERFACE

		InterfaceLauncherButtonDidClick () {
			window.Launchlet.LCHSingletonCreate({
				LCHOptionRecipes: exports.OLSKTransportRecipes({
					OLSKLocalized: window.OLSKLocalized,
					OLSKTransportDispatchImportJSON: (function () {}),
					OLSKTransportDispatchExportInput: (function () {
						return Math.random().toString();
					}),
					ParamSpecUI: true,
				}),
			});
		},

	};

	window.OLSKTransportBehaviour = mod;
})();
