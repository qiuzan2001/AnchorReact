const mongoose = require('mongoose');

const ProgramSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college_id: { type: mongoose.Schema.Types.ObjectId, ref: 'College', required: true },
  program_type: { type: String, enum: ['Undergraduate', 'Postgraduate'], required: true },
  intro: { type: String, required: true },
  program_official_site: { type: String, required: true },
  international_tuition_fee: { type: String, required: true },
  international_terms_offered: [String],
  start_dates: [String],
  international_application_deadlines: [String],
  course_details: { type: String, required: true },
  notes: { type: String },
});

ProgramSchema.pre('remove', async function(next) {
  const UndergraduateRequirements = mongoose.model('UndergraduateRequirements');
  const PostgraduateRequirements = mongoose.model('PostgraduateRequirements');

  await UndergraduateRequirements.deleteMany({ program_id: this._id });
  await PostgraduateRequirements.deleteMany({ program_id: this._id });

  next();
});

module.exports = mongoose.model('Program', ProgramSchema);
