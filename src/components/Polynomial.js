import React, { Component, useState, useEffect } from "react";
import Result from "../api/Result";
import MathJax from "react-mathjax2";

import { Row, Col } from "antd";
import { Layout } from "antd";
import { Divider } from "antd";
import { Modal, Button } from "antd";
import { List, Card } from "antd";
import { Typography } from "antd";
import { Menu } from "antd";

import virtualKeyboard from '../staticdata/virtualKeyboard.json';

import listdathuc from '../staticdata/polydata.json';
import listfunc from '../staticdata/listmenu.json';
import listPlot from '../staticdata/plotdata.json';
import listExer from '../staticdata/exercisedata.json';

import { Switch, Route, Link } from "react-router-dom";

// import Rightsidemenu from "../subcomponents/menu"
import "../css/style.css";

const { SubMenu } = Menu;

const { Title } = Typography;

const { Header, Footer, Sider, Content } = Layout;
const { parse } = require("equation-parser");

const style = {};

var emails = [];

function SimpleDialog(props) {
  const { onClose, selectedValue, open, onOpen, value } = props;
  console.log(props);
  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };
  var [testMathjax, setMathJax] = useState("x");

  return (
    // <>
    <Modal
      footer={null}
      title="Chúng tôi có thể giúp gì cho bạn ?"
      visible={open}
      onCancel={handleClose}
    >
      {value.map((email) => (
        <Button
          type="text"
          block
          onClick={() => handleListItemClick(email.variable)}
        >
          <MathJax.Context>
            <MathJax.Node>
              {"\\text{" + email.detail + "}" + email.variable}
            </MathJax.Node>
          </MathJax.Context>
        </Button>
      ))}
    </Modal>
  );
}


function duyetObject(obj) {
  if (obj.a == undefined || obj.b == undefined) {

    if (obj.type == "variable") {
      return obj.name;
    }
    else if (obj.type == "negative") {

      return duyetObject(obj.value);
    }
    else if (obj.type == "block") {
      return duyetObject(obj.child);
    }
    else if (obj.type == "function") {
      return duyetObject(obj.args[0]);
    }
    else return "";
  }
  else {
    return duyetObject(obj.a) + duyetObject(obj.b);


  }
}

export default function Dathuc(data) {
  var emails = [];
  var [input_latex, setInputLatex] = useState(0);
  var [valueDialog, setvalueDialog] = useState(emails);
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(emails[1]);
  const [openResult, setOpenResult] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState("default");


  useEffect(() => {
    const mf = document.getElementById("formula1");
    mf.setOptions({
      ...virtualKeyboard,
    });

    if (data.location.state) {
      if (data.location.state.selectedType != undefined) {
        setSelectedType(data.location.state.selectedType);
      }
    }
  }, []);



  const handleClick = (e) => {
    console.log(e)
    setSelectedType(e.key);
    setOpenResult(false);
  };

  const handleClickOpen = (test) => {
    emails = [];
    emails = [];

    //NOTE
    var test = document.getElementById('formula1').getValue("latex");
    var he = "begin{cases}";

    if (test.includes(he) == true && test != "") {
      emails.push({
        variable: "x,y",
        detail: "Tính kết quả phép tính "
      })
    } else {
      if (test != "") {
        console.log(parse(test))
        var test1 = duyetObject(parse(test));

        var test2 = test1.split("");
        if (test2.length != 0) {
          const uniqueSet = new Set(test2);
          const backToArray = [...uniqueSet];
          backToArray.forEach(function (item, index, array) {
            emails.push({
              variable: item,
              detail: "Giải theo biến "
            });

          });
        } else {
          emails.push({
            variable: "",
            detail: "Tính kết quả phép tính "
          })
        }
      }
      else {
        emails.push("Không hợp lệ, vui lòng nhập lại");
      }
    }



    setvalueDialog(emails);

    setOpen(true);
  };

  const clickExer = (item, variable) => {
    document.getElementById("formula1").value = item;
    setInputLatex(item);
    setSelectedValue(variable);
    setOpenResult(true);
  };

  const handleClose = (value) => {
    if (value == null) {
      console.log("test");
      setOpen(false);
    } else {
      setOpen(false);
      setSelectedValue(value);
      setInputLatex(document.getElementById("formula1").getValue("latex"));
      setOpenResult(true);
    }
  };


  return (
    <>
      <Row gutter={12} style={{ marginTop: "24px" }}>
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
                      <Menu.Item key={subitem.key}>{subitem.title}</Menu.Item>
                    );
                  })}
                </SubMenu>
              );
            })}
          </Menu>
        </Col>
        <Col span={18}>
          <Row style={{ paddingBottom: "16px" }}>
            <Col span={21}>
              <math-field
                id="formula1"
                virtual-keyboard-mode="onfocus"
                smart-mode={true}
                smart-fence={true}
                virtual-keyboard-theme="apple"
                smart-superscript={true}
                use-shared-virtual-keyboard={true}
                style={{
                  width: "100%",
                  backgroundColor: "#ffffff",
                  height: "90px",
                  borderRadius: "8px",
                  color: "#000000",
                  fontSize: "20px",
                }}
              ></math-field>
            </Col>
            <Col span={3} style={{ margin: "auto" }}>
              <Col span={22} offset={1}>
                <Button
                  type="primary"
                  block
                  style={{ height: "90px" }}
                  onClick={() => {
                    var testASC = document
                      .getElementById("formula1")
                      .getValue("ASCIIMath");
                    var inputLatex = document
                      .getElementById("formula1")
                      .getValue("latex");

                    if (inputLatex != "") {
                      console.log(inputLatex);
                      handleClickOpen(inputLatex);
                    } else if (testASC != "") {
                      console.log(testASC);
                      handleClickOpen(testASC);
                    }
                  }}
                >
                  Giải
                </Button>
                <SimpleDialog
                  value={valueDialog}
                  onOpen={handleClickOpen}
                  selectedValue={selectedValue}
                  open={open}
                  onClose={handleClose}
                />
              </Col>
            </Col>
          </Row>
          <Row gutter={12} style={{ minWidth: "100%", minHeight: "80vh" }}>
            {!openResult && (
              <>
                <Col span={16}>
                  <Card style={{ minWidth: "100%", borderRadius: "8px" }}>
                    <Col span={24}>
                      <Divider orientation="left" plain>
                        <Title level={3}>{listdathuc[selectedType].name}</Title>
                      </Divider>
                      <Row gutter={8}>
                        {listdathuc[selectedType].list.map((item) => {
                          return (
                            <React.Fragment key={item.key}>
                              <Col xs={24} sm={24} md={24} lg={12} xl={12} xxl={12} className="polynomial_poly_item">
                                {/* {console.log(item)} */}
                                <Button
                                  block
                                  className="polynomial_poly_button"
                                  onClick={() => clickExer(item.value, listdathuc[selectedType].variable)}
                                >
                                  <MathJax.Context>
                                    <MathJax.Node>{item.title}</MathJax.Node>
                                  </MathJax.Context>
                                </Button>
                              </Col>
                            </React.Fragment>
                          );
                        })}
                      </Row>
                    </Col>
                    <Col span={24} >
                      <Divider orientation="left" plain>
                        <Title level={3}>Vẽ đồ thị</Title>
                      </Divider>
                      <Row gutter={8}>
                        {listPlot.map((item) => {
                          return (
                            <React.Fragment key={item.key}>
                              <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12} className="polynomial_plot_item">
                                <Link
                                  to={{
                                    pathname: "/graph",
                                    state: { plot: item.value },
                                  }}
                                >
                                  <Button className="polynomial_plot_button" block>
                                    <MathJax.Context>
                                      <MathJax.Node>{item.value}</MathJax.Node>
                                    </MathJax.Context>
                                  </Button>
                                </Link>
                              </Col>
                            </React.Fragment>
                          );
                        })}
                      </Row>
                    </Col>
                  </Card>
                </Col>
                <Col span={8}>
                  <Row>
                    {/* <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px" }}>
                        <MathJax.Context>
                          <MathJax.Node>{input_latex}</MathJax.Node>
                        </MathJax.Context>
                      </Card>
                    </Col> */}
                    <Col span={24}>
                      <Card title="Bài tập" className="polynomial_exer_card">
                        <List>
                          <Row>
                            {listExer.map((item) => {
                              return (
                                <React.Fragment key={item.key}>
                                  <Col span={24} className="polynomial_poly_item">
                                    <Link
                                      to={{
                                        pathname: "/exercise",
                                        state: { polynomial: item.value },
                                      }}
                                    >
                                      <Button className="polynomial_poly_button" block>
                                        <MathJax.Context>
                                          <MathJax.Node>{item.value}</MathJax.Node>
                                        </MathJax.Context>
                                      </Button>
                                    </Link>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                          </Row>
                        </List>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
            {openResult && (
              <>
                <Col span={16}>
                  {console.log(input_latex)}
                  <Result tex={input_latex} var={selectedValue}></Result>
                </Col>
                <Col span={8}>
                  <Row>
                    {/* <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px" }}>
                        <MathJax.Context>
                          <MathJax.Node>{input_latex}</MathJax.Node>
                        </MathJax.Context>
                      </Card>
                    </Col> */}
                    <Col span={24}>
                      <Card title="Bài tập" className="polynomial_exer_card">
                        <List>
                          <Row>
                            {listExer.map((item) => {
                              return (
                                <React.Fragment key={item.key}>
                                  <Col span={24} className="polynomial_poly_item">
                                    <Link
                                      to={{
                                        pathname: "/exercise",
                                        state: { polynomial: item.value },
                                      }}
                                    >
                                      <Button className="polynomial_poly_button" block>
                                        <MathJax.Context>
                                          <MathJax.Node>{item.value}</MathJax.Node>
                                        </MathJax.Context>
                                      </Button>
                                    </Link>
                                  </Col>
                                </React.Fragment>
                              );
                            })}
                          </Row>
                        </List>
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}