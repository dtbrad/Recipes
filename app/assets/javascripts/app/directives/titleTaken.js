titleTaken.$inject = ["DataService"];

function titleTaken(DataService) {
return {
  restrict: 'A',
  require: 'ngModel',
  link: function (scope, element, attrs, ctrl) {
      { element[0].setAttribute('data', scope.ctrl.recipe.title) }

    element[0].addEventListener('change', function(){
      value = element[0].value
      name = element[0].name

      DataService.getRecipes()
      .then(function(result){
        if ( (result.data.filter(function(x){return x.title === value })).length > 0   )

        { ctrl.$setValidity('titleTaken', false)}

        else { ctrl.$setValidity('titleTaken', true) }
      });
    });

    }
  }
}

angular
.module('app')
.directive('titleTaken', titleTaken);
