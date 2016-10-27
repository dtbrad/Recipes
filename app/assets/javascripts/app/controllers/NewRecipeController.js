NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {

  var ctrl = this
  ctrl.ingredientInput = {name: "", quantity: ""}
  ctrl.ingredients = ingredients.data

  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
      ctrl.recipe.ingredients_attributes = ctrl.recipe.recipe_ingredients
      delete ctrl.recipe.recipe_ingredients
      ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){ return {content: d}});
      ctrl.display = true
      // ctrl.recipe.ingredients_attributes.forEach(function(ing){ing.display = true});
      // ctrl.recipe.directions.forEach(function(step){step.display = true});
    }
  else
    {
      ctrl.recipe = {
                    title: "",
                    directions: [{content: ""}],
                    ingredients_attributes: [{ingredient_name: "", quantity_prep: ""}]
                  }
      ctrl.edit = true
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
    if (!ctrl.recipe.id) {
      DataService.postRecipe(ctrl.recipe)
      .then(function(result){
        $state.go('home.recipe', {id: result.data.id});
        flash.success = 'Recipe created!';
      });
    }
    else {
      DataService.updateRecipe(ctrl.recipe)
      .then(function(result){
        flash.success = 'Recipe updated!';
        $state.go($state.$current, null, { reload: true });
      });
    }
  };



}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
