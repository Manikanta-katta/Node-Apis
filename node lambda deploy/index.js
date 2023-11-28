const Express = require("express");
const app = Express();

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => console.log(`Server running...${PORT}`));
module.exports = app;