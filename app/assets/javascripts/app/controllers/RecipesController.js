RecipesController.$inject = ["recipes", "$state", "$stateParams"];

function RecipesController(recipes, $state, $stateParams) {

  var ctrl = this
  ctrl.recipes = recipes.data


}

angular
  .module('app')
  .controller('RecipesController', RecipesController);
