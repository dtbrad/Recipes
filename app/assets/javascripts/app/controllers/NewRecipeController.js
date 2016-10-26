NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {
  debugger;
  ctrl = this
  ctrl.ingredientInput = {name: "", quantity: ""}
  ctrl.ingredients = ingredients.data
  ctrl.no_drag = false
  ctrl.newArray = ["daniel", "brad", "theodore", "julia"]

  ctrl.recipe = {
                  title: "",
                  directions: [{content: ""}],
                  ingredients_attributes: [{ingredient_name: "", quantity_prep: ""}]
                }

  ctrl.dragControlListeners = {
    accept: function (sourceItemHandleScope, destSortableScope) {
      return sourceItemHandleScope.itemScope.sortableScope.$id === destSortableScope.$id;
    },
    itemMoved: function(event) {},
    orderChanged: function(event) {},
  };

  ctrl.addDirection = function(input){
    ctrl.recipe.directions.push({content:input})
    ctrl.directionInput = ""
  }

  ctrl.removeEntry = function(entry, array){
    array.splice(entry, 1)
  }

  ctrl.addIngredient = function(){
    ctrl.recipe.ingredients_attributes.push({ingredient_name: "", quantity_prep: "" })
  }
  ctrl.addDirection = function(){
    ctrl.recipe.directions.push({content: ""})
  }

  ctrl.setIngredient = function(selectedValue, ingredientEntry){
    if (selectedValue)
    { ingredientEntry.ingredient_name = selectedValue.name }
    else
    { ingredientEntry.ingredient_name = "" }
  }

  ctrl.submit = function(){
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){return d.content});
    DataService.postRecipe(ctrl.recipe)
    .then(function(result){
      $state.go('home.recipe', {id: result.data.id});
      flash.success = 'Recipe created!';
    });


  };



}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
