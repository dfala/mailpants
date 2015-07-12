angular.module('mailPants')

.factory('emailWrapper', function () {
	var service = {};

	var topWrapper = '<style type="text/css">img{ max-width: 100% !important; }</style>'
					+ '<div style="max-width: 100% !important; background-color: #eee; padding: 20px; overflow: auto;">'
					+ '<div style="max-width: 800px; margin: 20px auto; border-radius: 2px; padding: 25px; background-color: #fff; border: 1px solid #C2C2C2;">';

	service.topWrapper = function () {
		return topWrapper;
	}

	service.bottomWrapper = function (listId) {
		var uri = "http://localhost:3000/#/unsubscribe/" + listId + "/*|EMAIL|*";

		var bottomWrapper = '</div><p style="font-size: 10px; float: right;"><a href="' + uri + '" target="_blank">unsubscribe</a></p>'
						+ '</div>';

		return bottomWrapper;
	}

	service.forgotPassword = function (userInfo) {
		var password = encodeURIComponent(userInfo.password);
		var unsubLink = 'http://localhost:3000/#/reset/' + password + '/' + userInfo.email;

		var emailBody = '<style type="text/css">img{ max-width: 100% !important; }</style>'
		+ '<div style="max-width: 100% !important; background-color: #eee; padding: 20px; overflow: auto;">'
		+ '<div style="max-width: 800px; margin: 20px auto; border-radius: 2px; padding: 25px; background-color: #fff; border: 1px solid #C2C2C2;">'
		+ '<p>We received a notice on our website that you forgot your password. If you did not perform this action yourself, don\'t worry, your password is unchanged and your account has not been accessed. If you need to reset your password please follow the link below:</p>'
		+ '<p><br/></p><p>'
		+ unsubLink
		+ '<br/></p><p><br/></p><p>This link will expire soon. If this link does not work you\'ll need to generate a new link.<br/></p><p><br/></p><p>May the pants be with you.</p><p>-MailPants.com</p></div>'
		+ '</div>';

		return emailBody;
	}

	return service;
})
