class RecipeSerializer < ActiveModel::Serializer
  attributes :id, :title, :directions
  has_many :recipe_ingredients
end
