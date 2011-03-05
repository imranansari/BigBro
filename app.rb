require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'geokit'
include Geokit::Geocoders
require 'active_record'
require './configure_db'

get '/app' do
  #escape_attrs : false
  response['Expires'] = (Time.now).httpdate
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
  puts activity['lat']
  georesponse =GoogleGeocoder.reverse_geocode([activity['lat'],activity['lng']])

  activity_rec = Activity.create(activity)
  activity_rec.loc_street = georesponse.street_address
  activity_rec.loc_city = georesponse.city
  activity_rec.loc_state = georesponse.state
  activity_rec.loc_zipcode = georesponse.zip
  activity_rec.loc_country = georesponse.country
  activity_rec.save

  sseControl = Ssecontrol.find(1)
  sseControl.newevent = true
  sseControl.save
  
end

get '/activity' do
  content_type 'application/json'
  response['Expires'] = (Time.now).httpdate
  activities = Activity.find(:all)
  puts activities.to_json
  activities.to_json
end

get '/pullnewactivity' do
  content_type 'text/event-stream'
  newevent = false
  sseControl = Ssecontrol.find(1)
  if sseControl.newevent then
    newevent = true
    sseControl.newevent = false
    sseControl.save
  end

  response = "data: "+newevent.inspect+" \n\n"
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  response['Expires'] = (Time.now).httpdate  
  scss(:"/stylesheets/#{params[:name]}")
end

get '/favicon.ico' do
  "Hello World"
end