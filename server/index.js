const express = require("express");
const app = express();

const PORT = 5000 || process.env.PORT;
const cors = require("cors");

app.use(cors({
    origin:'http://localhost:3000',
    methods:"GET,POST,PUT,DELETE"
}))

const bodyParser = require('body-parser');


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userRoute = require("./routes/user/user.route");
const profileRoute = require("./routes/profile/profile.route");

const { connect } = require("./config/databaseConnect");

app.use("/api",userRoute)
app.use("/api",profileRoute);

app.listen(PORT,()=>{
    connect();
    console.log(`server is live on http://localhost:${PORT}`);
})