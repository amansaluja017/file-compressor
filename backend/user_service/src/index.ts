import app from "./app"

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`User service is running on port ${port}`);
});