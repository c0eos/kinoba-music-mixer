class UsersController < ApplicationController
  before_action :authenticate_user, except: %i[create login]

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user
  end

  def create
    @user = User.new(email: params[:email], password: params[:password])
    if @user.save
      # create 2 playlists
      Playlist.create(user: @user)
      Playlist.create(user: @user)

      render json: @user, status: :created
    else
      render json: { error: 'Cannot create' }, status: :bad_request
    end
  end

  def login
    @user = User.find_by(email: params[:email])

    if @user&.authenticate(params[:password])
      payload = { user_id: @user.id }
      jwt_token = JWT.encode(payload, ENV['JWT_SECRET'])

      render json: { token: jwt_token, user_id: @user.id }
    else
      render json: { error: 'Cannot login' }, status: :not_found
    end
  end
end
