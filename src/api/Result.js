import React, { useState } from "react";
// import { Col, FormCheckbox } from "shards-react";
import { Col } from "antd";
import { Card } from "antd";
import MathJax from "react-mathjax2";

function Results(prop) {
  var [result, setResult] = useState("");
  const [loading, setLoading] = React.useState(false);

  fetch("http://api.bkmathapp.tk/api/combine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      input: prop.tex,
      // variable: prop.var
      variable: "x",
    }),
  })
    .then((res) => {
      res.json().then((db) => {
        var result_api = "";
        let valuesArray = Object.values(db.result);
        let i = 1;
        for (let value of valuesArray) {
          if (typeof value == "number") {
            continue;
          }
          if (typeof value == "object") {
            let valuesArray1 = Object.values(value);

            for (let value of valuesArray1) {
              result_api = result_api + value + "\\" + "\\";
              i++;
            }
          } else {
            result_api = result_api + value + "\\" + "\\";
            i++;
          }
        }
        // console.log(result_api)
        setResult(result_api);
        setLoading(true);
      });
    })
    .catch((err) => {
      console.log("test1");
    });
  let logicJS = (brd) => {
    var c = brd.create(
      "functiongraph",
      [
        function (x) {
          return x + 1;
        },
        -4,
        4,
      ],
      { strokeColor: "#000000", strokeWidth: 3 }
    );
    brd.unsuspendUpdate();
  };
  return (
    <Card title="Bài giải" style={{ minHeight: "100%" }} loading={!loading}>
      <Col>
        <MathJax.Context
          input="tex"
          options={{
            displayAlign: "left",
            mathmlSpacing: false,
            displayIndent: "0",
            paddingLeft: true,
            skipHtmlTags: ["+"],
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            processEscapes: true,
            tex: {
              packages: { "[+]": ["color"] },
            },
          }}
        >
          <div>
            <MathJax.Node>{result}</MathJax.Node>
          </div>
        </MathJax.Context>
      </Col>
    </Card>
  );
}

export default Results;
