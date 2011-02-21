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

  class CreateSSEControl < ActiveRecord::Migration
    def self.up
      create_table :ssecontrols, :force => true do |t|
        t.integer :id
        t.boolean :newevent
      end
    end
  end
  CreateSSEControl.up

  class Ssecontrol < ActiveRecord::Base
    validates_uniqueness_of :id
  end

  Ssecontrol.create(:id => 1, :newevent => true)
end