const mongoose = require('mongoose');

const CollegeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  college_official_site: { type: String, required: true },
  description: { type: String, required: true },
  university_id: { type: mongoose.Schema.Types.ObjectId, ref: 'University', required: true },
});

CollegeSchema.pre('remove', async function(next) {
  const Program = mongoose.model('Program');
  const UndergraduateRequirements = mongoose.model('UndergraduateRequirements');
  const PostgraduateRequirements = mongoose.model('PostgraduateRequirements');

  const programs = await Program.find({ college_id: this._id });
  for (const program of programs) {
    await UndergraduateRequirements.deleteMany({ program_id: program._id });
    await PostgraduateRequirements.deleteMany({ program_id: program._id });
    await program.remove();
  }
  next();
});

module.exports = mongoose.model('College', CollegeSchema);
