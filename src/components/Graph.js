import React, { useState } from "react";

// import MathJax from "react-mathjax2";
import Plot from "../api/Plot";
import { Button, Row, Col } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import "../css/style.css";
// import listdathuc from "../staticdata/polydata.json";
import listfunc from "../staticdata/listmenu.json";

const { SubMenu } = Menu;

// export default class General2 extends Component {
export default function Graph(data) {
  // const [selectedType, setSelectedType] = React.useState("default");
  const [input_latex, setInputLatex] = useState("x^2 -6x +3");
  // const listExample = ["x^2-7x+10 = 0", "2x^2 +5x-7=0", "-7x^2+10x-3=0"];

  // useEffect(() => {
  //   var poly = "x^2 -6x +3";
  //   if (data.location.state) {
  //     if (data.location.state.plot) {
  //       poly = data.location.state.plot;
  //     }
  //   }
  //   setInputLatex(poly);
  // }, []);

  // const handleClick = (e) => {
  //   setSelectedType(e.key);
  // };

  return (
    <Row
      gutter={12}
      style={{ marginTop: "24px", minWidth: "100%", minHeight: "80vh" }}
    >
      <Col span={6}>
        <Menu
          // onClick={handleClick}
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
                      setInputLatex(
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
        </Row>
        <Row>
          <Plot id="result" tex={input_latex} />
        </Row>
        {/* <Row gutter={12}>
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
        </Row> */}
      </Col>
    </Row>
  );
}
