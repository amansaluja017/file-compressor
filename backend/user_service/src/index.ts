import app from "./app"
import { connect } from "./db/db";

const port = process.env.PORT || 3001;

connect()
.then(() => {
  console.log("db connection success")
})
.catch((error) => {
  console.error(error)
  process.exit(1)
})

app.listen(port, () => {
  console.log(`User service is running on port ${port}`);
});