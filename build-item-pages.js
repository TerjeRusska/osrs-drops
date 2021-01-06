const path = require("path");
const fs = require("fs");
const YAML = require('json-to-pretty-yaml');

const jsonDataPath = path.join("_data", "item-drop-table.json");
const outputFolder = path.join("_item");

const jsonData = fs.readFileSync(jsonDataPath).toString();
const deserializedData = JSON.parse(jsonData);
const items = deserializedData.items;

for (let item in items) {
    const data = YAML.stringify(items[item]);
    const content = "---\n" +
        "layout: item\n" +
        "title: " + items[item].name + "\n" +
        "item-id: " + items[item].id + "\n" +
        "datatable: true\n" +
        data +
        "---";
    const file = path.join(outputFolder, items[item].id + ".md");
    fs.writeFileSync(file, content);
}
