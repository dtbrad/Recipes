class AddDirectionsToRecipes < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :directions, :string, array: true
  end
end
