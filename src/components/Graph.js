import React, { useState } from "react";

// import MathJax from "react-mathjax2";
import { Button, Row, Col } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import MathJax from "react-mathjax2";
import PlotImage from "../components/plot-Image";
import { Card } from "antd";

import "../css/style.css";
import listfunc from "../staticdata/listmenu.json";

const { SubMenu } = Menu;

// export default class General2 extends Component {
export default function Graph(data) {
  // const [selectedType, setSelectedType] = React.useState("default");
  // const [input_latex, setInputLatex] = useState("");
  var [result, setResult] = useState("");
  var [result_detail, setResultDetail] = useState("");
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    var poly = "x^4 -2x^2";
    // console.log(data2)
    if (data.location.state) {
      if (data.location.state.polynomial) {
        poly = data.location.state.polynomial;
      }
    }
    // setInputLatex(poly)
    var raw = JSON.stringify({
      input: poly,
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
    fetch(`http://api.bkmathapp.tk/api/plot_vnkey`, requestOptions)
      .then((res) => {
        res.json().then((db) => {
          if (db.detail) {
            setResultDetail(db.detail);
          } else {
            setResultDetail("\\textrm{Đồ thị: }" + poly);
          }

          setLoading(false);
          setResult(db.plot);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const clickSubmit = (input) => {
    setLoading(true)

    var raw = JSON.stringify({
      input: input,
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
    fetch(`http://api.bkmathapp.tk/api/plot_vnkey`, requestOptions)
      .then((res) => {
        res.json().then((db) => {
          if (db.detail) {
            setResultDetail(db.detail);
          } else {
            setResultDetail("\\textrm{Đồ thị: }" + input);
          }
          setLoading(false);
          setResult(db.plot);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Row
      gutter={12}
      style={{ marginTop: "24px", minWidth: "100%", minHeight: "80vh" }}
    >
      <Col span={6}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          className="menu"
        >
          {listfunc.map((item) => {
            return (
              <SubMenu key={item.key} title={item.title}>
                {item.sub.map((subitem) => {
                  return (
                    <Menu.Item key={subitem.key}>
                      <Link
                        to={{
                          pathname: "/polynomial",
                          state: { selectedType: subitem.key },
                        }}
                      >
                        {subitem.title}
                      </Link>
                    </Menu.Item>
                  );
                })}
              </SubMenu>
            );
          })}
        </Menu>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={24} style={{ marginBottom: "8px" }}>
            <Row>
              <Col span={21}>
                <math-field
                  id="formula"
                  style={{
                    backgroundColor: "#c0cacc",
                    height: "50px",
                    borderRadius: "10px",
                    color: "#000000",
                    fontSize: "20px",
                    width: "100%",
                  }}
                />
              </Col>
              <Col span={3} style={{ margin: "auto" }}>
                <Col span={22} offset={1}>
                  <Button
                    block
                    style={{ height: "40px" }}
                    type="primary"
                    onClick={() => {
                      clickSubmit(
                        document.getElementById("formula").getValue("latex")
                      );
                    }}
                    id="submit"
                  >
                    Khảo sát
                  </Button>
                </Col>
              </Col>
            </Row>
          </Col>
          <Col style={{width: "100%"}}>
            <Row gutter={12}>
              <Col span={16}>
                <Card title="Khảo sát đồ thị" className="graph_plot_card" loading={loading}>
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
                <PlotImage result={result} loading = {loading} style={{ width: "100%" }} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
