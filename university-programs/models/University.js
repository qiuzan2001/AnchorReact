const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  qs_ranking: { type: Number, required: true },
  university_official_site: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
});

UniversitySchema.pre('remove', async function(next) {
  try {
    const College = mongoose.model('College');
    const Program = mongoose.model('Program');
    const UndergraduateRequirements = mongoose.model('UndergraduateRequirements');
    const PostgraduateRequirements = mongoose.model('PostgraduateRequirements');

    const colleges = await College.find({ university_id: this._id });
    for (const college of colleges) {
      const programs = await Program.find({ college_id: college._id });
      for (const program of programs) {
        await UndergraduateRequirements.deleteMany({ program_id: program._id });
        await PostgraduateRequirements.deleteMany({ program_id: program._id });
        await program.remove();
      }
      await college.remove();
    }
    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('University', UniversitySchema);
