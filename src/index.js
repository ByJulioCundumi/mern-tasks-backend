import app from "./app.js";
import connectDB from "./db.js";

function main(){
    app.listen(3000,"localhost", ()=>{console.log("Server started on http://localhost:3000")})
    connectDB()
}
main()