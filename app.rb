require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'active_record'

get '/app' do
  haml :index
end

get '/addactivity' do
  haml :addactivity
end

post '/addactivity' do
  puts 'event posted'
  event = JSON.parse(request.body.read)
  Activity.create(event)

  sseControl = Ssecontrol.find(1)
  sseControl.newevent = true
  sseControl.save
  
end

get '/test' do
  puts "test hello"

  activity      = Activity.new
  activity.name = 'homer'
  puts activity.name

#  puts activity.to_json
end

get '/activities' do
  content_type 'application/json'
  products = Activity.find(:all)
  products.to_json
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"/stylesheets/#{params[:name]}")
end

configure do
  ActiveRecord::Base.establish_connection(
      :adapter  => 'sqlite3',
      :database => './db/bb.db',
      :timeout  => 5000
  )

#  class CreateActivities < ActiveRecord::Migration
#    def self.up
#      create_table :activities, :force => true do |t|
#        t.integer :id
#        t.string :user
#        t.string :application
#        t.string :event
#        t.string :lat
#        t.string :lng
#      end
#    end
#  end
#  CreateActivities.up

  class Activity < ActiveRecord::Base
    validates_uniqueness_of :id
  end
  #Activity.create(:id => 1, :user => 'imran', :application => 'LincPad')

##control table##

=begin
  class CreateSSEControl < ActiveRecord::Migration
    def self.up
      create_table :ssecontrols, :force => true do |t|
        t.integer :id
        t.boolean :newevent
      end
    end
  end
  CreateSSEControl.up
=end

  class Ssecontrol < ActiveRecord::Base
    validates_uniqueness_of :id
  end

  #Ssecontrol.create(:id => 1, :newevent => true)
end

get '/pullNewActivity' do
  content_type 'text/event-stream'
  time1 = Time.new
  mytime = time1.inspect
  puts mytime
  newevent = false
  sseControl = Ssecontrol.find(1)
  if sseControl.newevent then
    newevent = true
    sseControl.newevent = false
    sseControl.save
  end

  return "data: "+newevent.inspect+" \n\n"

end