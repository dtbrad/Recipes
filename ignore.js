NewRecipeController.$inject = ["$state", "$stateParams", "DataService", "ingredients"];
function NewRecipeController($state, $stateParams, DataService, ingredients) {

  ctrl = this
  ctrl.ingredients = ingredients.data
  ctrl.recipe = { title: "", directions: [{id: 'step1', desc: ""}], ingredients: [{id: 'ing1', desc: "dan"}] }

  // ctrl.addNewStep = function() {
  //   var newStepNo = ctrl.recipe.directions.length+1;
  //   ctrl.recipe.directions.push({'id':'step'+newStepNo});
  // };

  ctrl.addNewField = function(field, array) {
    var newFieldNo = array.length+1;
    array.push({'id':'step'+newFieldNo});
  };

  // ctrl.showAddStep = function(step) {
  //   return step.id === ctrl.recipe.directions[ctrl.recipe.directions.length-1].id;
  // };

  ctrl.showAddField = function(field, array) {
    return field.id === array[array.length-1].id;
  };

  // ctrl.addNewIng = function() {
  //   var newIngNo = ctrl.recipe.ingredients.length+1;
  //   ctrl.recipe.ingredients.push({'id':'step'+newIngNo});
  // };

  // ctrl.showAddNewIng = function(ing) {
  //   return ing.id === ctrl.recipe.ingredients[ctrl.recipe.ingredients.length-1].id;
  // };



  ctrl.submit = function(){
    debugger;
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
