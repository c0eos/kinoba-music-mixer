class PlaylistsController < ApplicationController
  before_action :authenticate_user

  def index
    @playlists = Playlist.all
    render json: @playlists
  end

  def user_playlists
    @playlists = Playlist.where(user_id: params[:id])
    full_playlists = []
    @playlists.each do |p|
      @tracks = Track.where(playlist_id: p.id)
      full_playlists.push({
                            id: p.id,
                            tracks: @tracks
                          })
    end
    render json: full_playlists
  end
end
