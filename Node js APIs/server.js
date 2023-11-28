const express = require("express");
const mongoose = require("mongoose");
const CompanyName = require("./modal");
const app = express();

app.use(express.json());
mongoose
    .connect(
        "mongodb+srv://manikanta:manikanta@cluster0.taclgus.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB connected .."))
    .catch((err) => console.log(err));

app.post("/addcompanys", async (req, res) => {
    const { companyname } = req.body;

    try {
        const newData = new CompanyName({ companyname });
        await newData.save();
        return res.json(await CompanyName.find());
    } catch (err) {
        console.log(err.message);
    }
});

app.get("/getallcompanys", async (req, res) => {
    try {
        const allData = await CompanyName.find();
        return res.json(allData);
    } catch (err) {
        console.log(err.msg);
    }
});
app.get("/getallcompanys/:id", async (req, res) => {
    try {
        const Data = await CompanyName.findById(req.params.id);
        return res.json(Data);
    } catch (err) {
        console.log(err.message);
    }
});

app.delete("/deletecompany/:id", async (req, res) => {
    try {
        await CompanyName.findByIdAndDelete(req.params.id);
        return res.json(await CompanyName.find());
    } catch (err) {
        console.log(err.message);
    }
});
app.put("/updatecompanys/:id", async (req, res) => {
    try {
        const updatedetails = await CompanyName.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        return res.json(updatedetails);
    } catch (err) {
        console.log(err.message);
    }
});

app.post("/upload-avatar", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded",
            });
        } else {
            let avatar = req.files.avatar;

            avatar.mv("./uploads/" + avatar.name);

            res.send({
                status: true,
                message: "File is uploaded",
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size,
                },
            });
        }
    } catch (err) {
        console.log(err.message);
    }
});
app.listen(3000, () => console.log("Server running..."));
