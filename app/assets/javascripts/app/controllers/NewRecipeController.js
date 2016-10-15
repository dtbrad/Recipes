NewRecipeController.$inject = ["$state", "$stateParams"];
function NewRecipeController($state, $stateParams) {

  ctrl = this
  ctrl.recipe = { title: "", directions: [{id: 'step1', desc: ""}] }

  ctrl.addNewStep = function() {
    var newStepNo = ctrl.recipe.directions.length+1;
    ctrl.recipe.directions.push({'id':'step'+newStepNo});
  };
  ctrl.showAddStep = function(step) {
  return step.id === ctrl.recipe.directions[ctrl.recipe.directions.length-1].id;
};


}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
