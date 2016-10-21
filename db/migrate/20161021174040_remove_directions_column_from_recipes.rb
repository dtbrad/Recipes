class RemoveDirectionsColumnFromRecipes < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :directions
  end
end
