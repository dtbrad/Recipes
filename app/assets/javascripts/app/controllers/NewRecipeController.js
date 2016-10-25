NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {

  ctrl = this
  ctrl.ingredientInput = {name: "", quantity: ""}
  ctrl.ingredients = ingredients.data
  ctrl.no_drag = false

  ctrl.recipe = {
                  title: "First Recipe",
                  directions: [{content: ""}],
                  ingredients_attributes: [{ingredient_name: "", quantity_prep: ""}]
                }

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


}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
