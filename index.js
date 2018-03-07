var express = require("express");
var app = express();
var tags = [];

var prevParentTag;
var prevCategory;
app.get("/", function(req, res) {
  const csvFilePath = "./flow.csv";
  const csv = require("csvtojson");
  csv()
    .fromFile(csvFilePath)
    .on("json", jsonObj => {
      if (jsonObj.tagName !== "") {
        if (jsonObj.category == "") jsonObj.category = prevCategory;
        else jsonObj.category = jsonObj.category.toLowerCase();

        if (jsonObj.parentTag == "") {
          if (prevCategory !== jsonObj.category) jsonObj.parentTag = "";
          else jsonObj.parentTag = prevParentTag;
        } else jsonObj.parentTag = jsonObj.parentTag.toLowerCase();

        jsonObj.tagName = jsonObj.tagName.toLowerCase();
        jsonObj.priority = Number(jsonObj.priority);

        prevCategory = jsonObj.category;
        prevParentTag = jsonObj.parentTag;
        tags.push(jsonObj);
      }
    })
    .on("done", error => {
      console.log("end........................................");
      res.send(tags);
    });
});

app.listen(3000, () => {
  console.log("node runnning at port 3000...");
});
