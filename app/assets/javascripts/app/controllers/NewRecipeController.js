NewRecipeController.$inject = ["$state", "$stateParams", "DataService", "ingredients"];
function NewRecipeController($state, $stateParams, DataService, ingredients) {

  ctrl = this
  ctrl.ingredients = ingredients.data
  ctrl.recipe = {
                  title: "",
                  directions: [{id: 'step1', content: ""}],
                  ingredients_attributes: [{id: 'ing1', name: "", quantityPrep: ""}]
                }

  ctrl.addNewField = function(field, array) {
    var idText = field.id.replace(/\d/,"")
    var newFieldNo = parseInt(field.id.replace(/[a-z]+/,"")) + 1
    var newId = idText + newFieldNo
    array.push({'id':newId});
  };

  ctrl.showAddField = function(field, array) {
    return field.id === array[array.length-1].id;
  };

  ctrl.submit = function(){
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){return d.content});
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
