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

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value, type) => {
    console.log(value);
    console.log(type);
    if (type == "check") {
      onClose(null);
      onOpen(value);
    } else {
      onClose(value);
    }
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
          onClick={() => handleListItemClick(email.variable, email.type)}
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
      if (obj.name.length == 1) {
        return obj.name;
      } else return "";
    } else if (obj.type == "negative") {
      return duyetObject(obj.value);
    } else if (obj.type == "block") {
      return duyetObject(obj.child);
    } else if (obj.type == "function") {
      return duyetObject(obj.args[0]);
    } else if (obj.type == "parser-error") {
      var tex =
        obj.equation.slice(0, obj.start + 1) +
        obj.equation.slice(obj.end + 1, obj.equation.length);
      return duyetObject(parse(tex));
    } else return "";
  } else {
    return duyetObject(obj.a) + duyetObject(obj.b);
  }
}
const Error = Object.freeze({
  NotEqual: "notequal",
  Notvariable: "notvariable",
  MulEqual: "mulequal",
});
function parseErrorHandle(obj) {
  console.log(obj);
}
function checkSyntax(obj) {
  console.log(obj);
  if (obj.type == "parser-error") {
    parseErrorHandle(obj);
    return false;
  } else if (
    obj.type == "equals" ||
    obj.type == "less-than" ||
    obj.type == "greater-than" ||
    obj.type == "less-than-equals" ||
    obj.type == "greater-than-equals"
  ) {
    if (
      obj.a.type == "equals" ||
      obj.a.type == "less-than" ||
      obj.a.type == "greater-than" ||
      obj.a.type == "less-than-equals" ||
      obj.a.type == "greater-than-equals" ||
      obj.b.type == "equals" ||
      obj.b.type == "less-than" ||
      obj.b.type == "greater-than" ||
      obj.b.type == "less-than-equals" ||
      obj.b.type == "greater-than-equals"
    ) {
      return Error.MulEqual;
    } else {
      return duyetObject(obj);
    }
  } else {
    if (duyetObject(obj) == "") {
      return Error.Notvariable;
    } else {
      return Error.NotEqual;
    }
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

  const listExample = ["x^2-7x+10 = 0", "2x^2 +5x-7=0", "x^4-2x^2+1=0", "x^4-3x^2+2=0"];
  const listPlot = ["x^2-2x+3", "2x^2 -5x-10", "-7x^2+10x-20"];

  const handleClick = (e) => {
    console.log(e)
    setSelectedType(e.key);
    setOpenResult(false);
  };

  const handleClickOpen = (test) => {
    emails = [];

    //NOTE
    if (test != "" && parse(test).type == "parser-error") {
      var objError = parse(test);

      if (objError.equation.indexOf("begin") != -1) {
        console.log(objError.equation);
        objError.equation = objError.equation.replace(/begin/g, "");
        objError.equation = objError.equation.replace(/{cases}/g, "");
        objError.equation = objError.equation.replace(/end/g, "");

        console.log(objError.equation);
        console.log(objError.equation.indexOf("\\\\"));

        var sub1 = objError.equation.substr(
          0,
          objError.equation.indexOf("\\\\")
        );
        var sub2 = objError.equation.substr(
          objError.equation.indexOf("\\\\") + 1,
          objError.equation.length
        );
        sub1 = sub1.replace(/\\/g, "");
        sub2 = sub2.replace(/\\/g, "");
        if (
          checkSyntax(parse(sub1)) == checkSyntax(parse(sub2)) &&
          checkSyntax(parse(sub1)) != "notequal" &&
          checkSyntax(parse(sub1)) != "mulequal" &&
          checkSyntax(parse(sub1)) != "notvariable"
        ) {
          emails.push({ variable: "", detail: "Giải hệ phương trình" });
        } else {
          emails.push({
            variable: "",
            detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
          });
        }
      } else if (objError.equation.indexOf("sin") != -1) {
        console.log(objError.equation);
        objError.equation = objError.equation.replace(/\\mleft/g, "");
        objError.equation = objError.equation.replace(/\\mright/g, "");
        var hihi = objError.equation;
        objError.equation = objError.equation.replace(/\\sin/g, "");
        objError.equation = objError.equation.replace(/\\cos/g, "");
        objError.equation = objError.equation.replace(/\^/g, "");
        if (
          checkSyntax(parse(objError.equation)).length != 1 &&
          checkSyntax(parse(objError.equation)) != "notequal" &&
          checkSyntax(parse(objError.equation)) != "mulequal" &&
          checkSyntax(parse(objError.equation)) != "notvariable"
        ) {
          emails.push({
            variable: hihi,
            detail: "Giải phương trình lượng giác",
          });
        } else {
          emails.push({
            variable: "",
            detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
          });
        }
      }
    } else if (test != "" && checkSyntax(parse(test)) != false) {
      var test1 = checkSyntax(parse(test));
      console.log(test1);
      if (test1 == "notequal") {
        var test3 = duyetObject(parse(test)).split("");
        const uniqueSet1 = new Set(test3);
        const backToArray1 = [...uniqueSet1];
        console.log(backToArray1);
        if (backToArray1.length == 1) {
          emails.push({
            variable: test,
            detail: "Khảo sát và vẽ đồ thị hàm số ",
          });
          emails.push({
            variable: test + "=0",
            detail: "Giải phương trình ",
            type: "check",
          });
          emails.push({
            variable: test + ">0",
            detail: "Giải bất phương trình ",
          });
          emails.push({
            variable: test + "<0",
            detail: "Giải bất phương trình ",
          });
        } else {
          emails.push({
            variable: test,
            detail: "Khảo sát và vẽ đồ thị hàm số ",
          });
          emails.push({
            variable: test + "=0",
            detail: "Giải phương trình ",
            type: "check",
          });
        }
      } else if (test1 == "mulequal") {
        emails.push({
          variable: "",
          detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
        });
      } else if (test1 == "notvariable") {
        emails.push({ variable: test, detail: "Tính kết quả phép tính" });
      } else {
        var test2 = test1.split("");
        const uniqueSet = new Set(test2);
        const backToArray = [...uniqueSet];
        console.log(backToArray);
        backToArray.forEach(function (item, index, array) {
          emails.push({
            variable: item,
            detail: "Giải phương trình theo biến ",
          });
        });
        console.log(emails);
      }
    } else {
      emails.push({
        variable: "",
        detail: "Bài toán bạn nhập sai hoặc chưa được hỗ trợ, xin cảm ơn",
      });
    }
    setvalueDialog(emails);
    setOpen(true);
  };

  const clickExer = (item) => {
    document.getElementById("formula1").value = item;
    setInputLatex(item);
    setSelectedValue("x");
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
                  style={{ height: "40px" }}
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
                  <Card style={{ minWidth: "100%", minHeight: "100%", borderRadius: "8px" }}>
                    <Col span={24}>
                      <Divider orientation="left" plain>
                        <Title level={3}>{listdathuc[selectedType].name}</Title>
                      </Divider>
                      <Row gutter={8}>
                        {listdathuc[selectedType].list.map((item) => {
                          return (
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24} className="polynomial_poly_item">
                              <Button
                                block
                                className="polynomial_poly_button"
                                onClick={() => clickExer(item)}
                              >
                                <MathJax.Context>
                                  <MathJax.Node>{item}</MathJax.Node>
                                </MathJax.Context>
                              </Button>
                            </Col>
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
                            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={12} className="polynomial_plot_item">
                              <Link
                                to={{
                                  pathname: "/graph",
                                  state: { plot: item },
                                }}
                              >
                                <Button className="polynomial_plot_button" block>
                                  <MathJax.Context>
                                    <MathJax.Node>{item}</MathJax.Node>
                                  </MathJax.Context>
                                </Button>
                              </Link>
                            </Col>
                          );
                        })}
                      </Row>
                    </Col>
                  </Card>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px" }}>
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
              </>
            )}
            {openResult && (
              <>
                <Col span={16}>
                  <Result tex={input_latex} var={selectedValue}></Result>
                </Col>
                <Col span={8}>
                  <Row>
                    <Col span={24}>
                      <Card title="Vẽ đồ thị" className="polynomial_plot_card" style={{ borderRadius: "8px" }}>
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
              </>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}