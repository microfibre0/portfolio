class AddAboutToWebsites < ActiveRecord::Migration[7.1]
  def change
    add_column :websites, :about, :string
  end
end
