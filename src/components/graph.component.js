import React, { useState, useEffect } from "react";

import MathJax from "react-mathjax2";
import Plot from "../api/Plot";
import { List, Button, Row, Col, Card } from "antd";
import { Menu } from "antd";
import { Switch, Route, Link } from "react-router-dom";

import "../css/style.css";

const { SubMenu } = Menu;

// export default class General2 extends Component {
export default function Graph(data) {
  const [selectedType, setSelectedType] = React.useState("default");
  const [input_latex, setInputLatex] = useState("");

  const listfunc = [
    {
      key: "dathuc",
      title: "Đa thức",
      sub: [
        {
          key: "ptb1",
          title: "PT bậc 1",
        },
        {
          key: "ptb2",
          title: "PT bậc 2",
        },
        {
          key: "ptb4",
          title: "PT bậc 4 trùng phương",
        },
        {
          key: "ptbc",
          title: "PT bậc cao",
        },
      ],
    },
    {
      key: "trigo",
      title: "Lượng giác",
      sub: [
        {
          key: "ptb1_trigo",
          title: "PT bậc 1",
        },
        {
          key: "ptb2_trigo",
          title: "PT bậc 2",
        },
        {
          key: "ptb4_trigo",
          title: "PT bậc 4 trùng phương",
        },
      ],
    },
    {
      key: "hpt",
      title: "Hệ PT",
      sub: [
        {
          key: "hptb1",
          title: "Hệ PT bậc 1",
        },
      ],
    },
    {
      key: "ptc",
      title: "PT căn",
      sub: [
        {
          key: "ptc",
          title: "PT căn",
        },
      ],
    },
  ];
  const listExample = ["x^2-7x+10 = 0", "2x^2 +5x-7=0", "-7x^2+10x-3=0"];

  useEffect(() => {
    var poly = "x^2 -6x +3";
    if (data.location.state) {
      if (data.location.state.plot) {
        poly = data.location.state.plot;
      }
    }
    setInputLatex(poly);
  }, []);

  const handleClick = (e) => {
    setSelectedType(e.key);
  };

  return (
    <Row
      gutter={12}
      style={{ marginTop: "24px", minWidth: "100%", minHeight: "80vh" }}
    >
      <Col span={6}>
        <Menu
          onClick={handleClick}
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
              <Col span={20}>
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
              <Col span={4}>
                <Col span={22} offset={1}>
                  <Button
                    style={{
                      marginTop: "10px",
                    }}
                    type="primary"
                    onClick={() => {
                      setInputLatex(
                        document.getElementById("formula").getValue("latex")
                      );
                    }}
                    id="submit"
                  >
                    Submit
                  </Button>
                </Col>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={16}>
            <Row gutter={8}>
              <Col span={24}>
                <Plot id="result" tex={input_latex} />
              </Col>
            </Row>
          </Col>
          <Col span={8}>
            <Row>
              <Col span={24}>
                <Card
                  title="Vẽ đồ thị"
                  className="polynomial_plot_card"
                  style={{ borderRadius: "8px" }}
                >
                  <MathJax.Context>
                    <MathJax.Node>{input_latex}</MathJax.Node>
                  </MathJax.Context>
                </Card>
              </Col>
              <Col span={24}>
                <Card title="Bài tập" className="polynomial_exer_card">
                  <List>
                    <Row>
                      {listExample.map((item) => {
                        return (
                          <Col span={24} className="polynomial_poly_item">
                            <Link
                              to={{
                                pathname: "/exercise",
                                state: { polynomial: item },
                              }}
                            >
                              <Button className="polynomial_poly_button" block>
                                <MathJax.Context>
                                  <MathJax.Node>{item}</MathJax.Node>
                                </MathJax.Context>
                              </Button>
                            </Link>
                          </Col>
                        );
                      })}
                    </Row>
                  </List>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
