RecipeController.$inject = ["$state", "$stateParams", "recipe"];
function RecipeController($state, $stateParams, recipe) {
  ctrl = this
  ctrl.recipe = recipe.data
  ctrl.recipe.steps = JSON.parse(recipe.data.directions)
}

angular
  .module('app')
  .controller('RecipeController', RecipeController);
