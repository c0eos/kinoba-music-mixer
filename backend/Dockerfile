FROM ruby:3.0-alpine

# install postgres
RUN apk add --no-cache --update \
  build-base \
  postgresql-dev \
  && rm -rf /var/cache/apk/*

# throw errors if Gemfile has been modified since Gemfile.lock
RUN bundle config --global frozen 1

WORKDIR /app
COPY . .
RUN bundle install

COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT [ "entrypoint.sh" ]

EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
