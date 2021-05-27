import React, { Component, useState, useEffect } from "react";
import MathJax from "react-mathjax2";
import { Button, Popover } from "antd";
import { List, Card, Form } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";
import { Menu } from "antd";
import { Switch, Route, Link } from "react-router-dom";

import "../css/style.css";

const { SubMenu } = Menu;

export default function Exercise(data2) {
  const [check, setCheck] = React.useState({});
  const [checkSubmit, setCheckSubmit] = React.useState({});
  const [showResultpopup, setShowResultpopup] = React.useState(false);
  const [dataInput, setDataInput] = React.useState({});
  const [dataRequest, setDataRequest] = React.useState("");
  const [isLoad, setIsLoad] = React.useState(true);
  const [showbuttoncontent, setShowbuttoncontent] =
    React.useState("Hiện kết quả");
  const [selectedType, setSelectedType] = React.useState("default");

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

  useEffect(() => {
    var poly = "x^4 -8x^2=0";
    if (data2.location.state) {
      if (data2.location.state.polynomial) {
        poly = data2.location.state.polynomial;
      }
    }
    // setDataRequest(data2.data)
    fetch("http://api.bkmathapp.tk/api/exer_api", {
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
        console.log(db);
        // this.setState({ data: db.result, isLoad: true });
        setDataRequest(db.result);
        setIsLoad(false);
      });
    });
  }, []);

  const handleClick = (e) => {
    setSelectedType(e.key);
  };

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
    var lst = [];
    var key = "";
    for (var i = 0; i < dataRequest.handle.length; i++) {
      if (dataRequest.handle[i].name == name) {
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
      if (dataRequest.handle[i].name == name) {
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
    if (showResultpopup == true) {
      setShowResultpopup(false);
      setShowbuttoncontent("Hiện kết quả");
    } else {
      setShowbuttoncontent("Ẩn kết quả");
      setShowResultpopup(true);
    }
  }

  function checkfunc(lst) {
    console.log(lst);
    fetch("http://api.bkmathapp.tk/api/check_api", {
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

  const onFinish = (e) => {
    var lst = [];
    for (var i = 0; i < Object.keys(e).length; i++) {
      if (e[Object.keys(e)[i]] != undefined) {
        lst.push({
          name: Object.keys(e)[i],
          key: dataRequest.handle[i].key,
          input: e[Object.keys(e)[i]],
        });
      }
    }
    setDataInput(e);
    checkfunc(lst);
    var checkpopup = {};
    for (var i = 0; i < dataRequest.handle.length; i++) {
      checkpopup[dataRequest.handle[i].name] = true;
    }
    setCheckSubmit(checkpopup);
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
                                      visible={checkSubmit[item.name]}
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
                            Kiểm tra tất cả
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

// export default class ExerciseComponent extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: "",
//     };
//   }

//   componentDidMount() {
//     var datarequest = "x^4 -8x^2=0";
//     console.log(this.props.location);

//     if (this.props.location.state) {
//       if (this.props.location.state.polynomial) {
//         console.log(this.props.location.state.polynomial)
//         this.setState({ data: this.props.location.state.polynomial });
//       } else {
//         this.setState({ data: datarequest });
//       }
//     }
//   }

//   render() {
//     return (
//       <Row>
//         {console.log(this.state.data)}
//         <Exercise data={this.state.data}></Exercise>
//       </Row>
//     );
//   }
// }
