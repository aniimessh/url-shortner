import { connectToDatabase } from './src/database/index';
import app from "./src/index";

connectToDatabase();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
