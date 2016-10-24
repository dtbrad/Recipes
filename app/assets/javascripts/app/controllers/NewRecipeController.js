NewRecipeController.$inject = ["flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(flash, $state, $stateParams, DataService, ingredients, recipe) {

  var ctrl = this
  ctrl.transformed = false
  ctrl.ingredients = ingredients.data
  if ($stateParams.id) {
    ctrl.recipe = recipe.data
    ctrl.recipe.ingredients_attributes = ctrl.recipe.recipe_ingredients
    delete ctrl.recipe.recipe_ingredients
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){
      return {content: d}

    });
  }
    else {
      ctrl.recipe = {
                    title: "",
                    directions: [{content: ""}],
                    ingredients_attributes: [{ingredient_name: "", quantity_prep: ""}]
                  }
  }


  ctrl.addNewField = function(field, array) {
    var index = array.indexOf(field)
    // debugger;
    // var newFieldNo = parseInt(field.id.replace(/[a-z]+/,"")) + 1
    // var newId = idText + newFieldNo
    array.splice((index +1), 0, {content: ""});
    // debugger;
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
    { ingredientEntry.name = selectedValue.name }
    else
    { ingredientEntry.name = "" }
  }

  ctrl.submit = function(){
    ctrl.transformed = true
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){return d.content});
    // ctrl.recipe.directions_attributes = ctrl.recipe.directions;
    // delete ctrl.recipe.directions
    // debugger;
    if (!ctrl.recipe.id) {
      DataService.postRecipe(ctrl.recipe)
      .then(function(result){
        $state.go('home.recipe', {id: result.data.id});
        flash.success = 'Recipe created!';
      });
    }
    else {

      // ctrl.recipe.ingredients_attributes.forEach(function(i){delete i.id});

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
