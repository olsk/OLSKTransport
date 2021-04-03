const mod = {

	OLSKControllerRoutes  () {
		return [{
			OLSKRoutePath: '/',
			OLSKRouteMethod: 'get',
			OLSKRouteSignature: 'OLSKTransferStubRoute',
			OLSKRouteFunction(req, res, next) {
				return res.render(require('path').join(__dirname, 'stub-view'));
			},
		}];
	},


};

Object.assign(exports, mod);
