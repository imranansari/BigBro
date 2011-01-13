require 'rubygems'
require 'sinatra'
require 'haml'
require 'sass'
require 'json'
require 'active_record'

get '/app' do
  haml :index
end

get '/test' do
  puts "test hello"

  activity      = Activity.new
  activity.name = 'homer'
  puts activity.name

#  puts activity.to_json
end

get '/products' do
  products = Product.find(:all)
  puts products
end

get '/css/:name.css' do
  content_type 'text/css', :charset => 'utf-8'
  scss(:"/stylesheets/#{params[:name]}")
end


class Activity
  attr_accessor :name
end

configure do
  ActiveRecord::Base.establish_connection(
      :adapter  => 'sqlite3',
      :database => './db/bb.db',
      :timeout  => 5000
  )

  class CreateProducts < ActiveRecord::Migration
    def self.up
      create_table :products, :force => true do |t|
        t.string :name
        t.decimal :price, :precision => 10, :scale => 2
      end
    end
  end
  CreateProducts.up

  class Product < ActiveRecord::Base
    validates_uniqueness_of :name
  end
  Product.create(:name => 'Beer', :price => 6.99)
end