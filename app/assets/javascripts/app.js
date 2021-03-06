angular
.module('app', ['ngFlash', 'as.sortable','ui.router', 'templates', 'ngMessages'])
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url:'/',
      templateUrl: 'app/views/home.html'
      // controller: 'HomeController as ctrl'
    })
    .state('home.welcome', {
      url:'welcome',
      templateUrl: 'app/views/welcome.html'
    })
    .state('home.newRecipe', {
      url:'recipes/new',
      controller: 'RecipeController as ctrl',
      templateUrl: 'app/views/recipe.html',
      resolve: {
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
          return ""
        }],
        ingredients: ["DataService", function (DataService) {
          return DataService.getIngredients();
        }]
      }
    })
    .state('home.recipe', {
      url:'recipes/:id',
      controller: 'RecipeController as ctrl',
      templateUrl: 'app/views/recipe.html',
      resolve: {
        recipe: ["$stateParams", "DataService", function ($stateParams, DataService) {
            return DataService.getRecipe($stateParams.id);
          }],
          ingredients: ["DataService", function (DataService) {
            return DataService.getIngredients();
          }]
      }
    })
    .state('home.recipes', {
      url:'recipes',
      controller: 'RecipesController as ctrl',
      templateUrl: 'app/views/recipes.html',
      resolve: {
        recipes: ["DataService", function (DataService) {
          return DataService.getRecipes();
        }]
      }
    })
    $urlRouterProvider.otherwise('welcome');

}])
