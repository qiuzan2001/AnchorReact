const mongoose = require('mongoose');

const PostgraduateRequirementsSchema = new mongoose.Schema({
  program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  gpa: {
    required_gpa: { type: Number, min: 0, max: 4 },
    average_gpa: { type: Number, min: 0, max: 4 },
  },
  academic_requirements: {
    required_degree: { type: String, required: true },
    preferred_fields: [String],
    specific_courses: [String],
    professional_qualification: { type: String },
  },
  standardized_tests: {
    gre: {
      status: { type: String, enum: ['accepted', 'not accepted', 'required'], required: true },
      minimum_score: { type: Number, min: 260, max: 340 },
      average_score: { type: Number, min: 260, max: 340 },
      note: { type: String },
    },
    gmat: {
      status: { type: String, enum: ['accepted', 'not accepted', 'required'], required: true },
      minimum_score: { type: Number, min: 200, max: 800 },
      average_score: { type: Number, min: 200, max: 800 },
      note: { type: String },
    },
  },
  english_proficiency: {
    toefl: { type: Number, min: 0, max: 120 },
    ielts: { type: Number, min: 0, max: 9 },
    duolingo: { type: Number, min: 10, max: 160 },
    language_course_supported: { type: Boolean },
    note: { type: String }
  },
  work_experience: { type: String },
  portfolio: { type: Boolean },
  interview: { type: Boolean },
  other_requirements: { type: String },
});

module.exports = mongoose.model('PostgraduateRequirements', PostgraduateRequirementsSchema);
