import React, { useEffect, useState } from "react";
import MathJax from "react-mathjax2";
import authHeader from "../services/auth-header";
import PlotImage from "../components/plot-image.component";
import { Row, Col, Card } from "antd";

import "../css/style.css";

function Plot(props) {
  var [result, setResult] = useState("");
  var [result_detail, setResultDetail] = useState("");
  const [loading, setLoading] = useState(false);
  const [survey, setSurvey] = useState(false);

  // var myHeaders = new Headers();
  // myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    input: props.tex,
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

  // function handleClick(e) {
  //     e.preventDefault();
  useEffect(() => {
    console.log(requestOptions);
    // fetch("http://api.bkmathapp.tk/api/plot_api", requestOptions)
    fetch(`http://api.bkmathapp.tk/api/plot_vnkey`, requestOptions)
      .then((res) => {
        res.json().then((db) => {
          setSurvey(!!db.detail);
          setResultDetail(db.detail);

          var x = "data:image/png;base64,";
          //   console.log(result_api);

          setResult(db.plot);
          setLoading(true);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // }

  return (
    <div>
      {console.log(loading, survey)}
      {loading ? (
        <div>
          <Row gutter={12}>
            <Col span={16}>
              {survey ? (
                <>
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
                      <div>
                        <MathJax.Node>{result_detail}</MathJax.Node>
                      </div>
                    </MathJax.Context>
                    {/* {result ? <img style={{"width": "40%"}} src={`data:image/jpeg;base64,${result}`} />: null } */}
                  </Card>
                  {/*</Col>*/}
                </>
              ) : null}
            </Col>
            <Col span={8}>
              <PlotImage result={result} style={{ width: "100%" }} />
            </Col>
          </Row>
        </div>
      ) : null}
    </div>
  );
}

export default Plot;
