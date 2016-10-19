function addIngredient () {
  return {
    bindToController: {ing: "=", recipeIngredients: "=", ingredients: "="},
    templateUrl: 'app/views/directive_templates/addIngredient.html',
    controllerAs: 'ingCtrl',
    controller: function(){
      ingCtrl = this;
    },
    link: function (scope, element, attrs, ctrl) {
      var sel = element[0].querySelector('select');
      sel.addEventListener('change', function(){
        if (ingCtrl.selectedIngredient)
        { ingCtrl.ing.name = ingCtrl.selectedIngredient.name }
        else {
          ingCtrl.ing.name = ""
        }
        scope.$apply();
      });
    }
  }
}

angular
  .module('app')
  .directive('addIngredient', addIngredient);
