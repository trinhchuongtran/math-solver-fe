import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax2";
// import authHeader from "../services/auth-header";
import PlotImage from "../components/plot-Image";
import { Row, Col, Card } from "antd";

import "../css/style.css";

function Plot(props) {
  console.log("test");
  var [data, setData] = useState(props.tex);
  var [result, setResult] = useState("");
  var [result_detail, setResultDetail] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [survey, setSurvey] = useState(false);
  setData(props.tex)

  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  

  // function handleClick(e) {
  //     e.preventDefault();
  useEffect(() => {
    
    var raw = JSON.stringify({
      input: data,
      // input: "x^3+x^2-5x+1",
      variable: "x",
    });
  
    var requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: raw,
      redirect: "follow",
    };
    // console.log(requestOptions);
    // fetch("http://api.bkmathapp.tk/api/plot_api", requestOptions)
    // setSurvey(true)
    fetch(`http://api.bkmathapp.tk/api/plot_vnkey`, requestOptions)
      .then((res) => {
        res.json().then((db) => {
          // setSurvey(false);
          if (db.detail) {
            setResultDetail(db.detail);
          } else {
            setResultDetail("\\textrm{Đồ thị: }" + props.tex);
          }
          console.log(123);

          // var x = "data:image/png;base64,";
          //   console.log(result_api);

          setResult(db.plot);
          // setLoading(true);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // }

  return (
    <Row gutter={12}>
      <Col span={16}>
        <Card title="Khảo sát đồ thị" className="graph_plot_card">
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
            <MathJax.Node>{result_detail}</MathJax.Node>
          </MathJax.Context>
        </Card>
      </Col>
      <Col span={8}>
        <PlotImage result={result} style={{ width: "100%" }} />
      </Col>
    </Row>
  );
}

export default Plot;
