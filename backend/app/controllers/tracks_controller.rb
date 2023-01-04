class TracksController < ApplicationController
  before_action :authenticate_user

  def index
    @tracks = Track.all
    render json: @tracks
  end

  def create
    @track = Track.create(track_params)
    render json: @track
  end

  def destroy
    @track = Track.find(params[:id])
    @track.destroy
    render json: @track
  end

  def track_params
    params.permit(
      :uri, :name, :album, :artists, :image, :playlist_id
    )
  end
end
