import app from "./app"
import { connect } from "./db/db";

const port = process.env.PORT || 3002;

connect()
.then(() => {
    console.log("Database connected successfully");
})
.catch((error) => {
    console.error("Database connection failed:", error);
    process.exit(1);
});


app.listen(port, () => {
    console.log(`file server is running on port ${port}`)
});