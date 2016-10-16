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
    @recipe = Recipe.new(recipe_params)
    @recipe.save
    render json: @recipe, status: 201
  end

  private

  def recipe_params
    params.require(:recipe).permit(:title, :directions => [])
  end

end
