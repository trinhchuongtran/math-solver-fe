import React, { useEffect } from "react";
import MathJax from "react-mathjax2";
import { Button, Popover } from "antd";
import { Card, Form } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import listfunc from '../staticdata/listmenu.json'

import "../css/style.css";

const { SubMenu } = Menu;

export default function Exercise(data2 = undefined) {
  const [check, setCheck] = React.useState({});
  const [checkSubmit, setCheckSubmit] = React.useState({});
  const [showResultpopup, setShowResultpopup] = React.useState(false);
  const [dataInput, setDataInput] = React.useState({});
  const [dataRequest, setDataRequest] = React.useState("");
  const [isLoad, setIsLoad] = React.useState(true);
  const [showbuttoncontent, setShowbuttoncontent] =
    React.useState("Hiện kết quả");
  // const [checkbuttonpopup, setCheckbuttonpopup] =
  //   React.useState(false);
  const [checkbuttoncontent, setCheckbuttoncontent] =
    React.useState("Kiểm tra tất cả");
  // const [selectedType, setSelectedType] = React.useState("default");

  useEffect(() => {
    var poly = "x^4 -8x^2=0";
    // console.log(data2)
    if (data2.location.state) {
      if (data2.location.state.polynomial) {
        poly = data2.location.state.polynomial;
      }
    }
    // setDataRequest(data2.data)
    fetch("http://api.bkmathapp.tk/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: poly,
        variable: "x",
      }),
    }).then((res) => {
      res.json().then((db) => {
        // console.log(152831258352)
        // this.setState({ data: db.result, isLoad: true });
        setDataRequest(db.result);
        setIsLoad(false);
      });
    });

    // return () => {
    //   setIsLoad(true)
    //   setDataRequest({})
    // };
  }, [data2]);

  function getdata(input, variable){
    fetch("http://api.bkmathapp.tk/api/exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: input,
        variable: variable,
      }),
    }).then((res) => {
      res.json().then((db) => {
        console.log(152831258352)
        // this.setState({ data: db.result, isLoad: true });
        setDataRequest(db.result);
        setIsLoad(false);
      });
    });
  }

  // const handleClick = (e) => {
  //   setSelectedType(e.key);
  // };

  // setData(data2);
  function popoverContent(data4) {
    // console.log(dataInput[data4]);
    if (dataInput[data4]) {
      if (check[data4]) {
        return "Đúng";
      } else {
        return "Sai";
      }
    } else {
      return "Trống";
    }
  }

  function checkSingleResult(name) {
    // setCheckSubmit({})
    var lst = [];
    setCheckbuttoncontent("Ẩn kiểm tra");
    var key = "";
    for (var i = 0; i < dataRequest.handle.length; i++) {
      if (dataRequest.handle[i].name === name) {
        key = dataRequest.handle[i].key;
        break;
      }
    }
    lst = [
      {
        name: name,
        key: key,
        input: dataInput[name],
      },
    ];

    checkfunc(lst);
    var temp = {};
    temp[name] = true;
    setCheckSubmit(temp);
    // console.log("checkSubmit: " ,checkSubmit);
  }

  function onchangeInput(e, name) {
    var newDataInput = dataInput;
    newDataInput[name] = e.target.value;
    setDataInput(newDataInput);
  }

  function showResult(name) {
    var content = "";
    for (var i = 0; i < dataRequest.handle.length; i++) {
      if (dataRequest.handle[i].name === name) {
        content = dataRequest.handle[i].key;
        break;
      }
    }
    // console.log(content);
    return (
      <MathJax.Context>
        <MathJax.Node>{"\\text{Đáp án: } " + content}</MathJax.Node>
      </MathJax.Context>
    );
  }

  function showResultEvent() {
    if (showResultpopup === true) {
      setShowResultpopup(false);
      setShowbuttoncontent("Hiện kết quả");
    } else {
      setShowbuttoncontent("Ẩn kết quả");
      setShowResultpopup(true);
    }
  }

  function checkfunc(lst) {
    fetch("http://api.bkmathapp.tk/api/checkresult_exercises", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: lst,
      }),
    }).then((res) => {
      res.json().then((db) => {
        setCheck(db.result);
      });
    });
  }

  function popup(check) {
    if (check === undefined) {
      return false;
    } else {
      return check;
    }
  }

  const onFinish = (e) => {
    var lst = [];
    for (var i = 0; i < Object.keys(e).length; i++) {
      if (e[Object.keys(e)[i]] !== undefined) {
        lst.push({
          name: Object.keys(e)[i],
          key: dataRequest.handle[i].key,
          input: e[Object.keys(e)[i]],
        });
      }
    }
    setDataInput(e);
    checkfunc(lst);
    if (Object.keys(checkSubmit).length !== 0) {
      setCheckSubmit({});
      setCheckbuttoncontent("Kiểm tra tất cả");
    } else {
      var checkpopup = {};
      for (var j = 0; j < dataRequest.handle.length; j++) {
        checkpopup[dataRequest.handle[j].name] = true;
      }
      setCheckSubmit(checkpopup);
      setCheckbuttoncontent("Ẩn kiểm tra");
    }
  };
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
              <React.Fragment key={item.key}>
              <SubMenu title={item.title}>
                {item.sub.map((subitem) => {
                  return (
                    <React.Fragment key={subitem.key}>
                    <Menu.Item >
                      <Link
                        to={{
                          pathname: "/polynomial",
                          state: { selectedType: subitem.key },
                        }}
                      >
                        {subitem.title}
                      </Link>
                    </Menu.Item>
                    </React.Fragment>
                  );
                })}
              </SubMenu>
              </React.Fragment>
            );
          })}
        </Menu>
      </Col>
      <Col span={18}>
        <Row>
          <Col span={16}>
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
                    height: "45px",
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
                      // var testASC = document
                      //   .getElementById("formula1")
                      //   .getValue("ASCIIMath");

                      var inputLatex = document
                        .getElementById("formula1")
                        .getValue("latex");
                        setIsLoad(true)
                        getdata(inputLatex, "x")
                    }}
                  >
                    Xác nhận
                  </Button>
                  
                </Col>
              </Col>
            </Row>
          </Col>
          <Col span={16}>
            <Card
              style={{ borderRadius: "8px" }}
              title="Bài Tập"
              loading={isLoad}
            >
              {!isLoad && (
                <Row>
                  <Col className="exercise_intro" span={24}>
                    <MathJax.Context>
                      <MathJax.Node>
                        {"\\text{Điền đáp án đúng vào chỗ trống: }"}
                      </MathJax.Node>
                    </MathJax.Context>
                  </Col>
                  <Col className="exercise_equation" span={24}>
                    <MathJax.Context>
                      <MathJax.Node>
                        {"\\text{Phương trình: }" + dataRequest.equation}
                      </MathJax.Node>
                    </MathJax.Context>
                  </Col>
                  <Col span={24}>
                    <Form onFinish={onFinish}>
                      <Row>
                        {dataRequest.handle.map((item) => {
                          return (
                            <React.Fragment key={item.name}>
                            <Col className="exercise_item" span={24}>
                              <Row
                                style={{ minWidth: "100%", minHeight: "100%" }}
                              >
                                <Col span={21} className="exercise_span">
                                  <MathJax.Context>
                                    <MathJax.Node>{item.before}</MathJax.Node>
                                  </MathJax.Context>
                                  <Popover
                                    trigger=""
                                    // visible={checkSubmit[item.name]}
                                    visible={showResultpopup}
                                    content={showResult(item.name)}
                                    // placement="right"
                                  >
                                    <Popover
                                      trigger=""
                                      visible={() =>
                                        popup(checkSubmit[item.name])
                                      }
                                      content={popoverContent(item.name)}
                                      placement="right"
                                    >
                                      <Form.Item
                                        name={item.name}
                                        style={{
                                          display: "inline-block",
                                          alignItems: "center",
                                          margin: "auto 0px",
                                        }}
                                      >
                                        <Input
                                          onChange={(e) =>
                                            onchangeInput(e, item.name)
                                          }
                                          style={{ width: "128px" }}
                                        />
                                      </Form.Item>
                                    </Popover>
                                  </Popover>
                                  <MathJax.Context>
                                    <MathJax.Node>{item.after}</MathJax.Node>
                                  </MathJax.Context>
                                </Col>
                                <Col
                                  span={3}
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    type="primary"
                                    style={{ margin: "auto 0px", right: "0px" }}
                                    onClick={() => checkSingleResult(item.name)}
                                  >
                                    Kiểm tra
                                  </Button>
                                </Col>
                              </Row>
                            </Col>
                            </React.Fragment>
                          );
                        })}
                      </Row>
                      <Row
                        justify="end"
                        gutter={16}
                        style={{ marginTop: "24px" }}
                      >
                        <Col span={6}>
                          <Button
                            type="primary"
                            block
                            onClick={() => showResultEvent()}
                          >
                            {showbuttoncontent}
                          </Button>
                        </Col>
                        <Col span={6}>
                          <Button
                            type="primary"
                            block
                            // style={{ color: "white", background: "blue" }}
                            htmlType="submit"
                          >
                            {checkbuttoncontent}
                          </Button>
                        </Col>
                      </Row>
                    </Form>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
          <Col span={8}></Col>
        </Row>
      </Col>
    </Row>
  );
}
