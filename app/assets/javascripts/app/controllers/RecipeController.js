RecipeController.$inject = ["$state", "$stateParams", "recipe"];
function RecipeController($state, $stateParams, recipe) {
  var ctrl = this
  ctrl.recipe = recipe.data
}

angular
  .module('app')
  .controller('RecipeController', RecipeController);
