import app from "./app"

const port = process.env.PORT || 3002;


app.listen(port, () => {
    console.log(`file server is running on port ${port}`)
});