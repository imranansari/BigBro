require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'active_record'

get '/app' do
  haml :index
end

get '/addevent' do
  haml :addevent
end

post '/addevent' do
  puts 'event posted'
  event = JSON.parse(request.body.read)
  Activity.create(event)
end

get '/test' do
  puts "test hello"

  activity      = Activity.new
  activity.name = 'homer'
  puts activity.name

#  puts activity.to_json
end

get '/events' do
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

  class CreateActivities < ActiveRecord::Migration
    def self.up
      create_table :activities, :force => true do |t|
        t.integer :id
        t.string :user
        t.string :application
        t.string :event
        t.string :lat
        t.string :lng
      end
    end
  end
  CreateActivities.up

  class Activity < ActiveRecord::Base
    validates_uniqueness_of :id
  end
  #Activity.create(:id => 1, :user => 'imran', :application => 'LincPad')
end