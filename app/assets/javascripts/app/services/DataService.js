DataService.$inject = ["$http"];

function DataService($http) {

  this.getRecipes = function() {
    return $http.get('/recipes.json');
  }

  this.getRecipe = function(id) {
    return $http.get('/recipes/' + id);
  }

  this.postRecipe = function(recipe) {
    return $http.post('/recipes', {recipe: recipe})
  }

}

angular
    .module('app')
    .service('DataService', DataService);
