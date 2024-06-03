const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Could not connect to MongoDB:', error));

app.use('/universities', require('./routes/universityRoutes'));
app.use('/colleges', require('./routes/collegeRoutes'));
app.use('/programs', require('./routes/programRoutes'));
app.use('/undergraduateRequirements', require('./routes/undergraduateRequirementsRoutes'));
app.use('/postgraduateRequirements', require('./routes/postgraduateRequirementsRoutes'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
