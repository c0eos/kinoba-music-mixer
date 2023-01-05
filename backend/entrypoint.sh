#!/bin/sh

bundle exec rails db:reset
exec "$@"
