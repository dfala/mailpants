angular.module('mailPants')

.directive('createCsv', function () {
	return {
		restrict: 'A',
		scope: {
			list: '='
		},
		link: function (scope, elem, attrs) {
			
			elem.click(function () {
				console.log(scope.list);
				var emails = scope.list.emails;

		    	// prepare CSV data
		    	emails.unshift("ACTIVE EMAILS");
		    	emails.push("");
		    	emails.push("UNSUBSCRIBED");
		    	emails = emails.concat(scope.list.unsubs);

			    // download stuff
			    var fileName = scope.list.listName + "_emails.csv";
			    var buffer = emails.join("\n");
			    var blob = new Blob([buffer], {
			        "type": "text/csv;charset=utf8;"
			    });
			    var link = document.createElement("a");

			    if (link.download !== undefined) { // feature detection
			        // Browsers that support HTML5 download attribute
			        link.setAttribute("href", window.URL.createObjectURL(blob));
			        link.setAttribute("download", fileName);
			        link.click();
			    } else {
			        alert('CSV export only works in Chrome, Firefox, and Opera.');
			    }
			});
		}
	}
})