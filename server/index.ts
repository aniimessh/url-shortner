import { connectToDatabase } from "./src/database/index";
import app from "./src/index";

connectToDatabase();

// update with your own port and base url in .env file
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
