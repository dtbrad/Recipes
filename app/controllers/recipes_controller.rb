class RecipesController < ApplicationController

  def index
    @recipes = Recipe.all
    render json: @recipes
  end

  def show
    @recipe = Recipe.find(params[:id])
    render json: @recipe
  end

  def create
    binding.pry
    @recipe = Recipe.new(recipe_params)
    @recipe.save
    render json: @recipe, status: 201
  end

  def update
    @recipe = Recipe.find(params[:id])

    @recipe.update(recipe_params)
    @recipe.save
  end


  private

  def recipe_params
    params.require(:recipe).permit(:title, :directions => [], :ingredients_attributes => [:id, :ingredient_name, :quantity_prep])
  end

end
