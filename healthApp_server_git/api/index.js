// server.js
const app = require('../app');

const PORT = process.env.PORT || 8085;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
