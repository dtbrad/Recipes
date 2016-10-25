class Recipe < ApplicationRecord
  has_many :recipe_ingredients, dependent: :destroy
  has_many :ingredients, through: :recipe_ingredients

  def ingredients_attributes=(attributes)
    param_ingredients = attributes.collect{|a| a[:id] if a[:id]}
    self.recipe_ingredients.each {|ri| if !param_ingredients.include?(ri.id) then ri.destroy end}
    attributes.each do |recipe_ingredients_hash|
      i = Ingredient.find_or_create_by(name: recipe_ingredients_hash[:ingredient_name])
      if !self.ingredients.include?(i)
        self.recipe_ingredients.build(ingredient: i, quantity_prep: recipe_ingredients_hash[:quantity_prep])
      end
    end
  end

  # def directions_attributes=(attributes)
  #   binding.pry
  # end

end
