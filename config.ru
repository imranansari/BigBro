require 'rubygems'
require 'sinatra'
require 'eventmachine'

require './app.rb'

log = File.new("logs/sinatra.log", "a")
STDOUT.reopen(log)
STDERR.reopen(log)

run Sinatra::Application