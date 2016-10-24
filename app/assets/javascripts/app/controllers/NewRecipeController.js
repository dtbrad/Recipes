NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {

  var ctrl = this
  ctrl.transformed = false
  ctrl.ingredients = ingredients.data
  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
      ctrl.recipe.ingredients_attributes = ctrl.recipe.recipe_ingredients
      delete ctrl.recipe.recipe_ingredients
      ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){
        return {content: d}

      });
    }
  else
    {
      ctrl.recipe = {
                    title: "",
                    directions: [{content: ""}],
                    ingredients_attributes: [{ingredient_name: "", quantity_prep: ""}]
                  }
    }

  ctrl.addNewField = function(field, array) {
    var index = array.indexOf(field)
    array.splice((index +1), 0, {content: ""});

  };

  ctrl.removeField = function(field, array) {
    var index = array.indexOf(field)
    array.splice(index, 1)
  }

  ctrl.showRemoveField = function(field, array) {
    return array.length > 1
  };

  ctrl.showAddField = function(field, array) {
    return field.id === array[array.length-1].id;
  };

  ctrl.setIngredient = function(selectedValue, ingredientEntry){
    if (selectedValue)
    { ingredientEntry.ingredient_name = selectedValue.name }
    else
    { ingredientEntry.ingredient_name = "" }
  }

  ctrl.submit = function(){
    ctrl.transformed = true
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
        $state.go($state.$current, null, { reload: true });
        flash.success = 'Recipe updated!';
      });
    }
  };


}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
