var express = require("express");
var app = express();
var categorised = [];
var tags = [];
var uncategorised = [];
app.get("/", function(req, res) {
  const csvFilePath = "./flow.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .on("json", jsonObj => {
      if (jsonObj.tagName !== "") {
        jsonObj.tagName = jsonObj.tagName.toLowerCase();
        jsonObj.parentTag = jsonObj.parentTag.toLowerCase();
        jsonObj.category = jsonObj.category.toLowerCase();
        jsonObj.priority = Number(jsonObj.priority);
        tags.push(jsonObj);
      }
    })
    .on("done", error => {
      console.log("end........................................");
      console.log(tags);
      res.send(tags);
    });
});

app.listen(3000, () => {
  console.log("node runnning at port 3000...");
});
