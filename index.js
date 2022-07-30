const express = require("express");
const app = express();
const port = 3000;

const data = json2array(require("./rate.json").currencies);
const obj = require("./rate.json").currencies;

console.log(data);

app.get("/", (req, res) => {
  res.json({
    READMD: [
      { URL: "/twd", DOC: "read twd to any one currency rate" },
      { URL: "/usd", DOC: "read usd to any one currency rate" },
      { URL: "/jpy", DOC: "read jpy to any one currency rate" },
      {
        URL: "/{source}/{target}/{qty}",
        DOC: "Calculate currency conversion values",
      },
      {
        URL: "/twd/usd/100",
        DOC: "example: twd 100 to usd",
      },
    ],
  });
});

app.get("/twd", (req, res) => {
  res.json({ rate: obj["TWD"] });
});

app.get("/jpy", (req, res) => {
  res.json({ rate: obj["JPY"] });
});

app.get("/usd", (req, res) => {
  res.json({ rate: obj["USD"] });
});

/*
- 來源幣別
- 目標幣別
- 金額數字
*/
app.get("/:source/:target/:money", (req, res) => {
  const source = req.params.source.toUpperCase();
  const target = req.params.target.toUpperCase();
  const money = req.params.money.toUpperCase();

  if (!check(source) || !check(target)) {
    res.json({ results: "僅提供JPY/TWD/USD轉換" });
  }

  if (isNaN(Number(money))) {
    res.json({ results: "請輸入數字" });
  }

  const cal = data[source][target] * money;
  const calFloor = Math.round(cal * 100) / 100;
  const calFormat = FormatNumber(calFloor);
  const repson = { results: calFormat };

  // 請實作一個提供匯率轉換的 API,
  // 轉換金額請四捨五入到小數點第二位,
  // 且轉換後的金額顯示格式請增加逗點分隔做為千分位表示

  res.json(repson);
});

function json2array(json) {
  var result = [];
  var keys = Object.keys(json);
  keys.forEach(function (key) {
    nestKeys = Object.keys(json[key]);
    var nestList = [];
    nestKeys.forEach((k) => {
      nestList[k] = json[key][k];
    });
    result[key] = nestList;
  });
  return result;
}

function FormatNumber(number) {
  number += "";
  let arr = number.split(".");
  let re = /(\d{1,3})(?=(\d{3})+$)/g;
  return arr[0].replace(re, "$1,") + (arr.length == 2 ? "." + arr[1] : "");
}

function check(type) {
  switch (type) {
    case "TWD":
    case "JPY":
    case "USD":
      return true;
    default:
      return false;
  }
}

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
