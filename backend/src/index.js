import "dotenv/config"
import connectDB from "./db/db.js"
import app from "./app.js"
import dns from "dns"

dns.setServers(["1.1.1.1", "8.8.8.8"])

const port = process.env.PORT || 5000

connectDB()
.then(()=> {
    app.listen(port, ()=> {
        console.log(`Server is runing at http://localhost:${port}`)
    })
})
.catch((err)=> {
    console.log(`Mongo DB Connection Failed !`, err)
})