Rails.application.routes.draw do
  get '/users/', to: 'users#index'
  post '/users/', to: 'users#create'
  post '/users/login', to: 'users#login'

  get '/playlists/', to: 'playlists#index'
  get '/playlists/user/:id', to: 'playlists#user_playlists'

  get '/tracks/', to: 'tracks#index'
  post '/tracks/', to: 'tracks#create'
  delete '/tracks/:id', to: 'tracks#destroy'
end
