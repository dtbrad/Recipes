NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {

  var ctrl = this
  ctrl.ingredientInput = {name: "", quantity: ""}
  ctrl.ingredients = ingredients.data
  ctrl.no_drag = false

  ctrl.recipe = {
                  title: "First Recipe",
                  directions: [],
                  ingredients_attributes: []
                }

  ctrl.addDirection = function(input){
    ctrl.recipe.directions.push({content:input})
    ctrl.directionInput = ""
  }

  ctrl.removeEntry = function(entry, array){
    array.splice(entry, 1)
  }

  ctrl.addIngredient = function(input){
    ctrl.recipe.ingredients_attributes.push({ingredient_name: input.name, quantity_prep: input.quantity })
    ctrl.ingredientInput = ""
  }

  ctrl.setIngredient = function(selectedValue){
    if (selectedValue)
    { ctrl.ingredientInput.name = selectedValue.name }
    else
    { ctrl.ingredientInput.name = "" }
  }


}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
