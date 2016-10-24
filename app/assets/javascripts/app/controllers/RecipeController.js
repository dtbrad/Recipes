RecipeController.$inject = ["$state", "$stateParams", "recipe"];
function RecipeController($state, $stateParams, recipe) {
  var ctrl = this
  ctrl.recipe = recipe.data

  debugger;

  ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){
    return {content: d, id: "step" + (ctrl.recipe.directions.indexOf(d)+1)}
  });

  debugger;

}

angular
  .module('app')
  .controller('RecipeController', RecipeController);
