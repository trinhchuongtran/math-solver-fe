import React, { Component, useState } from "react";
import MathJax from "react-mathjax2";
import { Button, Popover } from "antd";
import { List, Card, Form } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";
import "../css/exercise.css";

function Exercise(data2) {
  const [check, setCheck] = React.useState({});
  const [checkSubmit, setCheckSubmit] = React.useState(false);
  const [dataInput, setDataInput] = React.useState({});

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

  const onFinish = (e) => {
    var lst = [];
    console.log(e);
    for (var i = 0; i < Object.keys(e).length; i++) {
      if (e[Object.keys(e)[i]] != undefined) {
        lst.push({
          name: Object.keys(e)[i],
          key: data2.data.handle[i].key,
          input: e[Object.keys(e)[i]],
        });
      }
    }
    setDataInput(e);
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
        setCheckSubmit(true);
      });
    });
  };
  return (
    <Row>
      <Col className="exercise_equation">
        <MathJax.Context>
          <MathJax.Node>{data2.data.equation}</MathJax.Node>
        </MathJax.Context>
      </Col>
      <Col span={24}>
        <Form onFinish={onFinish}>
          <Row>
            {data2.data.handle.map((item) => {
              console.log(data2.data);
              return (
                <Col
                  className="exercise_item"
                  span={24}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MathJax.Context>
                    <MathJax.Node>{item.before}</MathJax.Node>
                  </MathJax.Context>
                  <Popover
                    trigger=""
                    visible={checkSubmit}
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
                      <Input style={{ width: "128px" }} />
                    </Form.Item>
                  </Popover>
                  <MathJax.Context>
                    <MathJax.Node>{item.after}</MathJax.Node>
                  </MathJax.Context>
                </Col>
              );
            })}
          </Row>
          <Button
            type="primary"
            style={{ color: "white", background: "blue" }}
            htmlType="submit"
          >
            Kiem tra
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default class General2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      isLoad: false,
    };
    fetch("http://api.bkmathapp.tk/api/exer_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: "x^4 -8x^2=0",
        variable: "x",
      }),
    }).then((res) => {
      res.json().then((db) => {
        this.setState({ data: db.result, isLoad: true });
      });
    });
  }
  render() {
    return (
      <Row>
        {this.state.isLoad && <Exercise data={this.state.data}></Exercise>}
      </Row>
    );
  }
}
