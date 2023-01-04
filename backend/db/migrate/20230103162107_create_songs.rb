class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.references :playlist, null: false, foreign_key: true
      t.string :name
      t.string :artists
      t.string :album
      t.string :uri
      t.string :image

      t.timestamps
    end
  end
end
