NewRecipeController.$inject = ["Flash", "$state", "$stateParams", "DataService", "ingredients", "recipe"];
function NewRecipeController(Flash, $state, $stateParams, DataService, ingredients, recipe) {
  var ctrl = this
  ctrl.transformed = false;
  ctrl.ingredientInput = {name: "", quantity: ""}
  ctrl.ingredients = ingredients.data

  ctrl.flashCreate = function(){
    var message = 'Recipe created';
    var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

  ctrl.flashUpdate = function(){
    var message = 'Recipe updated';
    var id = Flash.create('success', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

  ctrl.flashDelete = function(){
    var message = 'Recipe deleted';
    var id = Flash.create('warning', message, 3000, {class: 'custom-class', id: 'custom-id'}, true);
  }

  if ($stateParams.id)
    {
      ctrl.recipe = recipe.data
      ctrl.recipe.ingredients_attributes = ctrl.recipe.recipe_ingredients
      delete ctrl.recipe.recipe_ingredients
      ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){ return {content: d}});
      ctrl.display = true
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
    array.splice(array.indexOf(entry), 1)
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
    ctrl.transformed=true
    ctrl.recipe.directions = ctrl.recipe.directions.map(function(d){return d.content});
    if (!ctrl.recipe.id) {
      DataService.postRecipe(ctrl.recipe)
      .then(function(result){
        $state.go('home.recipe', {id: result.data.id});
        ctrl.flashCreate();
      });
    }
    else {
      DataService.updateRecipe(ctrl.recipe)
      .then(function(result){
        $state.go($state.$current, null, { reload: true });
        ctrl.flashUpdate();
      });
    }
  };

  ctrl.deleteRecipe = function(){
    if (confirm('Are you sure?'))
    {
    DataService.deleteRecipe(ctrl.recipe.id)
    .then(function(result){
      $state.go('home.recipes');
      ctrl.flashDelete();
    })
  }
  }



}
angular
  .module('app')
  .controller('NewRecipeController', NewRecipeController);
