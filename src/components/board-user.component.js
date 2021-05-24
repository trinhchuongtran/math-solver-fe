import React, { Component, useState } from "react";
import Result from "../api/Result";
import MathJax from "react-mathjax2";

import { Row, Col } from "antd";
import { Layout } from "antd";
import { Divider } from "antd";

import { Modal, Button } from "antd";
import { List, Card } from "antd";
import { Typography } from 'antd';

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;
const { parse } = require("equation-parser");

const style = { paddingTop: "8px", paddingBottom: "8px" };

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
  // const [loading, setLoading] = React.useState(false);

  const listExample = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listPlot = ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"];
  const listdathuc = [
    {
      name: "Phương trình bậc 1",
      list: ["x=3=1", "2x+7=0"],
    },
    {
      name: "Phương trình bậc 2",
      list: ["x^2-2x+3 = 0", "2x^2 -5x-10=0", "-7x^2+10x-20=0"],
    },
    {
      name: "Phương trình bậc 4 trùng phương",
      list: ["x^4-2x^2+1=0", "3x^4-5x^2-1=0"],
    },
  ];

  const handleClickOpen = () => {
    emails = [];

    //NOTE
    var test = document.getElementById("formula").getValue("ascii-math");
    console.log(test);
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
              backgroundColor: "#c0cacc",
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
      <Row gutter={16}>
        {!openResult && (
          <>
            <Card style={{ minWidth: "100%" }}>
              <Col span={24}>
                {/* <Card style={{border: "2px solid #000000"}}
                title="Một số bài toán giải đa thức cơ bản"
                // bodyStyle={{backgroundColor: '#ececec' }}
                style={{ minHeight: "100%"}}
              > */}
                <Divider orientation="left" plain>
                <Title level={3}>Một số bài toán giải đa thức cơ bản</Title>
                </Divider>
                <Row gutter={16}>
                  {listdathuc.map((item) => {
                    return (
                      <Col span={12} style={style}>
                        <Card
                          bordered
                          title={item.name}
                          style={{
                            minHeight: "100%",
                            border: "2px solid #ececec",
                          }}
                        >
                          <List>
                            {item.list.map((dathuc) => {
                              return (
                                <List.Item>
                                  <MathJax.Context>
                                    <MathJax.Node>{dathuc}</MathJax.Node>
                                  </MathJax.Context>
                                </List.Item>
                              );
                            })}
                          </List>
                        </Card>
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
                        <Card style={{ border: "2px solid #ececec" }}>
                          <MathJax.Context>
                            <MathJax.Node>{item}</MathJax.Node>
                          </MathJax.Context>
                        </Card>
                      </Col>
                      // {/* </List.Item> */}
                    );
                  })}
                </Row>
                {/* </List> */}
              </Col>
            </Card>
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
