let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let eventSchema = new Schema(
  {
    title: { type: String, require: true },
    summary: String,
    host: { type: String, require: true },
    start_date: { type: Date, require: true },
    end_date: { type: Date, require: true },
    event_category: [String],
    location: String,
    likes: { type: Number, default: 0 },
    remarks: [{ type: Schema.Types.ObjectId, ref: 'Remark' }],
  },
  { timestamps: true }
);

let Event = mongoose.model('Event', eventSchema);

module.exports = Event;
