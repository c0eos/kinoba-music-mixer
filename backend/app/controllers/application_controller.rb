class ApplicationController < ActionController::API
  def authenticate_user
    # format is Authorization: Bearer #token
    jwt_token = request.headers['Authorization']
    jwt_token = jwt_token.split(' ').last if jwt_token
    begin
      decoded_token = JWT.decode(jwt_token, ENV['JWT_SECRET'])
      @current_user = User.find(decoded_token[0]['user_id'])
    rescue JWT::DecodeError
      render json: { error: 'Invalid token' }, status: :unauthorized
    rescue ActiveRecord::RecordNotFound
      render json: { error: 'Invalid token' }, status: :unauthorized
    end
  end
end
