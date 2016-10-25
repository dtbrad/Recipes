RecipesController.$inject = ["recipes", "$state", "$stateParams"];

function RecipesController(recipes, $state, $stateParams) {

  var ctrl = this
  ctrl.recipes = recipes.data

  ctrl.presidents = [
   'George Washington',
   'Abraham Lincoln',
   'William Jefferson Clinton'
 ];

 ctrl.dragControlListeners = {
  accept: function(sourceItemHandleScope, destSortableScope) { return true },
  itemMoved: function(event) {},
  orderChanged: function(event) {}
};


}

angular
  .module('app')
  .controller('RecipesController', RecipesController);
