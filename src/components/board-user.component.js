import React, { Component, useState } from "react";
import Result from "../api/Result";
import MathJax from "react-mathjax2";

import { Row, Col } from "antd";
import { Layout } from "antd";
import { Divider } from "antd";

import { Modal, Button } from "antd";
import { List, Card } from "antd";
import { Typography } from "antd";
import { Menu } from "antd";
const { SubMenu } = Menu;

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;
const { parse } = require("equation-parser");

const style = { paddingTop: "4px", paddingBottom: "4px" };

var emails = [];

function SimpleDialog(props) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Modal footer={null} title="Tuỳ chọn" visible={open} onCancel={handleClose}>
      {emails.map((email) => (
        <Button type="text" block onClick={() => handleListItemClick(email)}>
          {"Giải theo biến " + email}
        </Button>
      ))}
    </Modal>
  );
}

function duyetObject(obj) {
  if (obj.a == undefined || obj.b == undefined) {
    if (obj.type == "variable") {
      return obj.name;
    } else if (obj.type == "negative") {
      return duyetObject(obj.value);
    } else if (obj.type == "block") {
      return duyetObject(obj.child);
    } else if (obj.type == "function") {
      return duyetObject(obj.args[0]);
    } else return "";
  } else {
    return duyetObject(obj.a) + duyetObject(obj.b);
  }
}

function Dathuc() {
  var [input_latex, setInputLatex] = useState(0);

  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [openResult, setOpenResult] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("default");
  // const [loading, setLoading] = React.useState(false);

  const listExample = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listPlot = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listdathuc = {
    default: {
      name: "Ví dụ",
      list: [
        "x-3=1",
        "2x^2 -5x-10=0",
        "3x^4-5x^2-1=0",
        "3\\tan(x)=2",
        "2\\cos(x)^2-3\\cos(x)+1=0",
      ],
    },
    ptb1: {
      name: "Phương trình bậc 1",
      list: ["x-3=1", "2x+7=0"],
    },
    ptb2: {
      name: "Phương trình bậc 2",
      list: ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"],
    },
    ptb4: {
      name: "Phương trình bậc 4 trùng phương",
      list: ["x^4-2x^2+1=0", "3x^4-5x^2-1=0"],
    },
    ptbc: {
      name: "Phương trình bậc cao",
      list: ["x^5-4x^4-7x^3+14x^2-44x+120=0"],
    },
    ptb1_trigo: {
      name: "Phương trình bậc lượng giác 1",
      list: ["2\\sin(x)+1=0", "3\\tan(x)=2"],
    },
    ptb2_trigo: {
      name: "Phương trình lượng giác bậc 2",
      list: ["2\\cos(x)^2-3\\cos(x)+1=0", "3\\cot(x)^2=2"],
    },
    ptb4_trigo: {
      name: "Phương trình lượng giác bậc 4 trùng phương",
      list: ["\\sin(x)^4-2\\sin(x)^2+1=0", "3\\cos(x)^4-5cos(x)^2-1=0"],
    },
    hptb1: {
      name: "Hệ phương trình bậc 1",
      list: ["\\begin{cases}x+y=1 \\\\ 2x-3y=3 \\end{cases}"],
    },
    ptc: {
      name: "Phương trình căn",
      list: ["\\sqrt{x-1}=x", "\\sqrt{3x^2+1} = 3x"],
    },
  };

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

  const handleClick = (e) => {
    // console.log(e)
    setSelectedType(e.key);
  };

  const handleClickOpen = () => {
    emails = [];

    //NOTE
    var test = document.getElementById("formula").getValue("ascii-math");
    if (test != "") {
      console.log(parse(test));
      var test1 = duyetObject(parse(test));

      var test2 = test1.split("");
      const uniqueSet = new Set(test2);
      const backToArray = [...uniqueSet];
      backToArray.forEach(function (item, index, array) {
        emails.push(item);
      });
    } else {
      emails.push("Không hợp lệ, vui lòng nhập lại");
    }
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
    setInputLatex(document.getElementById("formula").getValue("latex"));
    setOpenResult(true);
  };
  return (
    <>
      <Row style={{ paddingTop: "16px", paddingBottom: "16px" }}>
        <Col span={21}>
          <math-field
            id="formula"
            style={{
              width: "100%",
              // backgroundColor: "#ffffff",
              height: "40px",
              borderRadius: "10px",
              color: "#000000",
              fontSize: "20px",
            }}
          ></math-field>
        </Col>
        <Col span={3}>
          <Col span={22} offset={1}>
            <Button
              type="primary"
              block
              style={{ height: "40px" }}
              onClick={handleClickOpen}
            >
              Submit
            </Button>
            <SimpleDialog
              selectedValue={selectedValue}
              open={open}
              onClose={handleClose}
            />
          </Col>
        </Col>
      </Row>
      <Row gutter={16} style={{ minHeight: "100%"}}>
        {!openResult && (
          <>
            <Row gutter={8} style={{ minWidth: "100%" }}>
              <Col span={4}>
                <Menu
                  onClick={handleClick}
                  // style={{ width: 256 }}
                  defaultSelectedKeys={["1"]}
                  defaultOpenKeys={["sub1"]}
                  mode="inline"
                  // style={{ width: "unset" }}
                >
                  {listfunc.map((item) => {
                    return (
                      <SubMenu key={item.key} title={item.title}>
                        {item.sub.map((subitem) => {
                          return (
                            <Menu.Item key={subitem.key}>
                              {subitem.title}
                            </Menu.Item>
                          );
                        })}
                      </SubMenu>
                    );
                  })}
                  {/* <SubMenu key="sub1" title="Navigation One">
                    <Menu.Item key="1">Option 1</Menu.Item>
                    <Menu.Item key="2">Option 2</Menu.Item>
                    <Menu.Item key="3">Option 3</Menu.Item>
                    <Menu.Item key="4">Option 4</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub2" title="Navigation Two">
                    <Menu.Item key="5">Option 5</Menu.Item>
                    <Menu.Item key="6">Option 6</Menu.Item>
                    <Menu.Item key="7">Option 7</Menu.Item>
                    <Menu.Item key="8">Option 8</Menu.Item>
                  </SubMenu>
                  <SubMenu key="sub4" title="Navigation Three">
                    <Menu.Item key="9">Option 9</Menu.Item>
                    <Menu.Item key="10">Option 10</Menu.Item>
                    <Menu.Item key="11">Option 11</Menu.Item>
                    <Menu.Item key="12">Option 12</Menu.Item>
                  </SubMenu> */}
                </Menu>
              </Col>
              <Col span={16}>
                <Card style={{ minWidth: "100%", minHeight: "100%" }}>
                  <Col span={24}>
                    {/* <Card style={{border: "2px solid #000000"}}
                title="Một số bài toán giải đa thức cơ bản"
                // bodyStyle={{backgroundColor: '#ececec' }}
                style={{ minHeight: "100%"}}
              > */}
                    <Divider orientation="left" plain>
                      <Title level={3}>{listdathuc[selectedType].name}</Title>
                    </Divider>
                    <Row gutter={8}>
                      {listdathuc[selectedType].list.map((item) => {
                        return (
                          <Col span={12} style={style}>
                            {/* <Card
                              bordered
                              // title={item.name}
                              style={{
                                minHeight: "100%",
                                border: "2px solid #ececec",
                              }}
                            > */}
                            <Button block style={{fontWeight: "bold", textAlign: "left"}}>
                            <MathJax.Context>
                                <MathJax.Node>{item}</MathJax.Node>
                              </MathJax.Context>
                            </Button>
                              

                              {/* <List>
                                {item.list.map((dathuc) => {
                                  return (
                                    <List.Item>
                                      <MathJax.Context>
                                        <MathJax.Node>{dathuc}</MathJax.Node>
                                      </MathJax.Context>
                                    </List.Item>
                                  );
                                })}
                              </List> */}
                            {/* </Card> */}
                          </Col>
                        );
                      })}
                    </Row>
                    {/* </Card> */}
                  </Col>
                  <Col span={24}>
                    {/* <Card title="Đồ thị"> */}
                    <Divider orientation="left" plain>
                      <Title level={3}>Vẽ đồ thị</Title>
                    </Divider>
                    <Row gutter={8}>
                      {/* <List style={{paddingLeft:"16px"}}> */}
                      {listPlot.map((item) => {
                        return (
                          // <List.Item style={{minWidth:"100%"}}>
                          <Col span={8}>
                            <Button block style={{fontWeight: "bold", textAlign: "left"}}>
                            <MathJax.Context>
                                <MathJax.Node>{item}</MathJax.Node>
                              </MathJax.Context>
                            </Button>
                          </Col>
                          // {/* </List.Item> */}
                        );
                      })}
                    </Row>
                    {/* </List> */}
                  </Col>
                </Card>
              </Col>
              <Col span={4}></Col>
            </Row>
          </>
        )}
        {openResult && (
          <>
            <Col span={18}>
              <Result tex={input_latex} var={selectedValue}></Result>
            </Col>
            <Col span={6}>
              <Row style={{ minHeight: "100%" }}>
                <Col span={24}>
                  <Card title="Vẽ đồ thị">
                    <MathJax.Context>
                      <MathJax.Node>{input_latex}</MathJax.Node>
                    </MathJax.Context>
                  </Card>
                </Col>
                <Col span={24}>
                  <Card title="Bài tập tương tự">
                    <List>
                      {listExample.map((item) => {
                        return (
                          <List.Item>
                            <MathJax.Context>
                              <MathJax.Node>{item}</MathJax.Node>
                            </MathJax.Context>
                          </List.Item>
                        );
                      })}
                    </List>
                  </Card>
                </Col>
              </Row>
            </Col>
          </>
        )}
        <Col span={8}>{/* <ExampleView></ExampleView> */}</Col>
      </Row>
    </>
  );
}

export default class BoardUser extends Component {
  componentDidMount() {}

  render() {
    return (
      <Layout>
        <Content>
          <Dathuc></Dathuc>
        </Content>
      </Layout>
    );
  }
}
