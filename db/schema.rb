# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170202014954) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customer_interests", force: :cascade do |t|
    t.integer  "feedback_id", null: false
    t.integer  "customer_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["customer_id"], name: "index_customer_interests_on_customer_id", using: :btree
    t.index ["feedback_id"], name: "index_customer_interests_on_feedback_id", using: :btree
  end

  create_table "customers", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedback_states", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "feedbacks", force: :cascade do |t|
    t.string   "description",       null: false
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "feedback_state_id", null: false
    t.index ["feedback_state_id"], name: "index_feedbacks_on_feedback_state_id", using: :btree
  end

  create_table "ticket_interests", force: :cascade do |t|
    t.integer  "feedback_id", null: false
    t.integer  "ticket_id",   null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.index ["feedback_id"], name: "index_ticket_interests_on_feedback_id", using: :btree
    t.index ["ticket_id"], name: "index_ticket_interests_on_ticket_id", using: :btree
  end

  create_table "tickets", force: :cascade do |t|
    t.string   "title",      null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "customer_interests", "customers"
  add_foreign_key "customer_interests", "feedbacks"
  add_foreign_key "feedbacks", "feedback_states"
  add_foreign_key "ticket_interests", "feedbacks"
  add_foreign_key "ticket_interests", "tickets"
end
