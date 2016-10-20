function displayRecipe () {
   return {
     bindToController: {recipe: "="},
     templateUrl: 'app/views/directive_templates/displayRecipe.html',
     controllerAs: 'dis',
     controller: [function(){
       ctrl = this;
       debugger;
     }]
   }
 }

 angular
   .module('app')
   .directive('displayRecipe', displayRecipe);
