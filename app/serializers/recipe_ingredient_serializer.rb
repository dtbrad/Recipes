class RecipeIngredientSerializer < ActiveModel::Serializer
  attributes :id, :quantity_prep, :ingredient_name
  # belongs_to :ingredient

  def ingredient_name
    @object.ingredient.name
  end
end
