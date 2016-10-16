NewRecipeController.$inject = ["$state", "$stateParams", "DataService"];
function NewRecipeController($state, $stateParams, DataService) {

  ctrl = this
  ctrl.recipe = { title: "", directions: [{id: 'step1', desc: ""}] }

  ctrl.addNewStep = function() {
    var newStepNo = ctrl.recipe.directions.length+1;
    ctrl.recipe.directions.push({'id':'step'+newStepNo});
  };

  ctrl.showAddStep = function(step) {
    return step.id === ctrl.recipe.directions[ctrl.recipe.directions.length-1].id;
  };

  ctrl.submit = function(){
    var array = [];
    ctrl.recipe.directions.forEach(function(c){array.push(c.desc)});
    ctrl.recipe.directions = array
    DataService.postRecipe(ctrl.recipe)
    .then(function(result){
      $state.go('home.recipe', {id: result.data.id});
      alert("recipe created")
    });
  };



}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
