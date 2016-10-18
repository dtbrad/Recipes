NewRecipeController.$inject = ["$state", "$stateParams", "DataService", "ingredients"];
function NewRecipeController($state, $stateParams, DataService, ingredients) {

  ctrl = this
  ctrl.ingredients = ingredients.data
  ctrl.recipe = {
                  title: "",
                  directions: [{id: 'step1', content: ""}],
                  ingredients: [{id: 'ing1', content: ""}]
                }

  ctrl.addNewField = function(field, array) {
    var newFieldNo = array.length+1;
    array.push({'id':'step'+newFieldNo});
  };

  ctrl.showAddField = function(field, array) {
    return field.id === array[array.length-1].id;
  };

  ctrl.submit = function(){
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(c){return c.content});
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
