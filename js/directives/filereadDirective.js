angular.module('mailPants')

.directive('fileread', function (imagesService) {
    return {
        scope: {
            fileread: "=",
            images: '='
        },
        link: function (scope, elem, attrs) {
            elem.bind("change", function (changeEvent) {
                
                var reader = new FileReader();

                reader.onload = function (loadEvent) {
                    scope.$apply(function () {
                        var fileread = loadEvent.target.result;

                        var tempArray = elem['context'].value.split('\\');
                        var fileName = tempArray[tempArray.length - 1];

                        imagesService.storeImage(fileread, fileName)
                        .then(function (result) {
                            scope.images.push(result);
                        })
                        .catch(function (err) {
                            throw new Error(err);
                        });
                    });
                }

                reader.readAsDataURL(changeEvent.target.files[0]);
            });
        }
    }
});