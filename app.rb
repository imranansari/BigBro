require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'

get '/app' do
  haml :index
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"/stylesheets/#{params[:name]}")
end