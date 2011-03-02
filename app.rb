require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'active_record'
require './configure_db'

get '/app' do
  #escape_attrs : false
  haml :index
end

get '/addactivity' do
  haml :addactivity
end

get '/analytics' do
  haml :analytics
end

post '/activity' do
  puts 'activity posted'
  activity = JSON.parse(request.body.read)
  Activity.create(activity)

  sseControl = Ssecontrol.find(1)
  sseControl.newevent = true
  sseControl.save
  
end

get '/activity' do
  content_type 'application/json'
  response['Expires'] = (Time.now).httpdate
  products = Activity.find(:all)
  products.to_json
end

get '/pullNewActivity' do
  content_type 'text/event-stream'
  newevent = false
  sseControl = Ssecontrol.find(1)
  if sseControl.newevent then
    newevent = true
    sseControl.newevent = false
    sseControl.save
  end

  return "data: "+newevent.inspect+" \n\n"
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  response['Expires'] = (Time.now).httpdate  
  scss(:"/stylesheets/#{params[:name]}")
end