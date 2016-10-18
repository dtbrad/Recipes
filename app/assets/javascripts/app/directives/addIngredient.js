function addIngredient () {
  return {
    bindToController: {ing: "=", recipeIngredients: "=", ingredients: "="},
    templateUrl: 'app/views/directive_templates/addIngredient.html',
    controllerAs: 'ingCtrl',
    controller: [function(){
      ingCtrl = this;
    }]
  }
}

angular
  .module('app')
  .directive('addIngredient', addIngredient);
