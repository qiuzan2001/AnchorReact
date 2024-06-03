const mongoose = require('mongoose');

const UndergraduateRequirementsSchema = new mongoose.Schema({
  program_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Program', required: true },
  high_school_grades: {
    china: { type: Number, min: 0, max: 100 },
    usa_gpa: { type: Number, min: 0, max: 4 },
    a_level: { type: String, enum: ['A*', 'A', 'B', 'C', 'D', 'E', 'U'] },
    ib: { type: Number, min: 24, max: 45 },
    ossd: { type: Number, min: 0, max: 100 },
    atar: { type: Number, min: 0, max: 99.95 },
    note: { type: String }
  },
  english_proficiency: {
    toefl: { type: Number, min: 0, max: 120 },
    toefl_detail: { type: String },
    ielts: { type: Number, min: 0, max: 9 },
    ielts_detail: { type: String },
    duolingo: { type: Number, min: 10, max: 160 },
    duolingo_detail: { type: String },
    language_course_supported: { type: Boolean },
    language_course_detail: { type: String }
  },
  standardized_tests: {
    sat: { type: Number, min: 800, max: 1600 },
    act: { type: Number, min: 1, max: 36 },
    ap_all_subject_total: { type: Number },
    huikao: { type: String },
    gaokao_percentage: { type: Number, min: 0, max: 100 },
    note: { type: String }
  },
  other_requirements: { type: String },
});

module.exports = mongoose.model('UndergraduateRequirements', UndergraduateRequirementsSchema);
