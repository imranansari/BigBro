require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'geokit'
include Geokit::Geocoders
require 'active_record'
require './configure_db'
require 'eventmachine'

class EventStream
  include EventMachine::Deferrable

  def each
    count = 0
    timer = EventMachine::PeriodicTimer.new(5) do
      #yield "data: #{count += 1}\n\n"
      newevent   = false
      sseControl = Ssecontrol.find(1)
      if sseControl.newevent then
        newevent            = true
        sseControl.newevent = false
        sseControl.save
      end

      yield "data: "+newevent.inspect+" \n\n"
    end
    errback { timer.cancel }
  end
end

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
  activity     = JSON.parse(request.body.read)
  activity_rec = setActivityGeolocation(activity)
  activity_rec.save

  setSseFlag()

end

get '/activity' do
  content_type 'application/json'
  response['Expires'] = (Time.now).httpdate
  activities          = Activity.find(:all)
  puts activities.to_json
  activities.to_json
end

get '/pullnewactivity' do
   response.headers['Content-Type'] = 'text/event-stream'
   response.headers['charset'] = ''
   response.headers['Cache-Control'] = 'no-cache'
  #content_type '', :charset => '', :'Cache-Control' => 'no-cache'
  #connection 'keep-alive'
  
  newevent   = false
  sseControl = Ssecontrol.find(1)
  if sseControl.newevent then
    newevent            = true
    sseControl.newevent = false
    sseControl.save
  end

  response = "data: "+newevent.inspect+" \n"
  response += "id: 12345\n\n"

end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  response['Expires'] = (Time.now).httpdate
  scss(:"/stylesheets/#{params[:name]}")
end

def setActivityGeolocation(activity)
  georesponse              =GoogleGeocoder.reverse_geocode([activity['lat'], activity['lng']])

  activity_rec             = Activity.create(activity)
  activity_rec.loc_street  = georesponse.street_address
  activity_rec.loc_city    = georesponse.city
  activity_rec.loc_state   = georesponse.state
  activity_rec.loc_zipcode = georesponse.zip
  activity_rec.loc_country = georesponse.country
  activity_rec
end

def setSseFlag
  sseControl          = Ssecontrol.find(1)
  sseControl.newevent = true
  sseControl.save
end