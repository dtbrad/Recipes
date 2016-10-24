function displayRecipe () {
   return {
     bindToController: {recipe: "="},
     templateUrl: 'app/views/directive_templates/displayRecipe.html',
     controllerAs: 'dis',
     controller: [function(){
       var ctrl = this;
     }]
   }
 }

 angular
   .module('app')
   .directive('displayRecipe', displayRecipe);
