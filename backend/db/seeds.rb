# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

@user = User.create(email: 'demo@demo', password: 'demo')

@playlist1 = Playlist.create(user: @user)
@playlist2 = Playlist.create(user: @user)

Track.create(
  playlist_id: @playlist1.id,
  name: 'Killer',
  artists: 'Kristina Bazan',
  album: 'EPHV1',
  uri: 'spotify:track:54c0hwydo3VhIosCOzKz8h',
  image: 'https://i.scdn.co/image/ab67616d0000b273b0ba0749eae2a3ff31650f48'
)
Track.create(
  playlist_id: @playlist1.id,
  name: 'Paris',
  artists: 'Else',
  album: 'Paris',
  uri: 'spotify:track:2H7F7EfsVhy0jNLsVz8MLH',
  image: 'https://i.scdn.co/image/ab67616d0000b2734ddf4df172bd6c51173989e9'
)
Track.create(
  playlist_id: @playlist2.id,
  name: 'Bohemian Rhapsody - Remastered 2011',
  artists: 'Queen',
  album: 'Greatest Hits (Remastered)',
  uri: 'spotify:track:2OBofMJx94NryV2SK8p8Zf',
  image: 'https://i.scdn.co/image/ab67616d0000b273bb19d0c22d5709c9d73c8263'
)
Track.create(
  playlist_id: @playlist2.id,
  name: 'Fever',
  artists: 'Dua Lipa, Angèle',
  album: 'Fever',
  uri: 'spotify:track:3wJVBz7gvGTwTWVAxFa6ny',
  image: 'https://i.scdn.co/image/ab67616d0000b273214b60a753733ca0792cf47f'
)
