import React, { Component, useState } from "react";
import MathJax from "react-mathjax2";
import { Button, Popover } from "antd";
import { List, Card, Form } from "antd";
import { Input } from "antd";
import { Row, Col } from "antd";

const data = {
  equation: "x^2 -3x+2=0",
  handle: [
    {
      before: "\\text{Tính } \\Delta \\text{: } \\Delta = b^{2} - 4ac =",
      name: "delta_value",
      key: "1",
      after: "",
    },
    {
      before: "\\text{Nghiệm 1: }x_1 = \\frac{ -b+ sqrt{ \\Delta}   }{ 2a  } = ",
      name: "root_value0",
      key: "2",
      after: "",
    },
    {
      before: "\\text{Nghiệm 2: }x_2 = \\frac{ -b- sqrt{ \\Delta}   }{ 2a  } = ",
      name: "root_value1",
      key: "1",
      after: "",
    },
  ],
};

function Exercise() {
  const [check, setCheck] = React.useState({});
  const [checkSubmit, setCheckSubmit] = React.useState(false)

  function popoverContent(data){
    
    if (data){
      return "Right"
    }
    else{
      console.log("Worng")
      return "Wrong"
    }
  }

  const onFinish = (e) => {
    console.log(Object.keys(e))
    var lst = []
    for(var i = 0; i < Object.keys(e).length; i++){
      lst.push({
        name: Object.keys(e)[i],
        key: "1",
        input: e[Object.keys(e)[i]]
      })
    }
    fetch("http://api.bkmathapp.tk/api/check_api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        request: lst
      }),
    }).then((res) => {
      res.json().then((db) => {
        console.log(db)
        setCheck(db.result)
        setCheckSubmit(true)
        // this.setState({ result: getcontent(db) });
        // this.setState({ isOpenSolution: true });
      });
    });
    console.log(lst)
    console.log(e);

  };

  return (
    <Form
      // {...layout}
      onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
    >
      <Row>
      {data.handle.map((item) => {
        console.log(check[item.name])
        return (
          <Col span ={24} style={{display: "flex",
          alignItems: "center"}}>
            <MathJax.Context
            >
              <MathJax.Node>{item.before}</MathJax.Node>
            </MathJax.Context>
            <Popover trigger="" visible={checkSubmit} content={popoverContent(check[item.name])}  placement="right">
            <Form.Item name={item.name} style={{ display: "inline-block", alignItems: "center" }}>
              <Input style={{ width: "128px" }} />
            </Form.Item>
            </Popover>
            <MathJax.Context>
              <MathJax.Node>{item.after}</MathJax.Node>
            </MathJax.Context>

          </Col>
          // <Row>
          //   <Title level={5} style={{ paddingRight: "6px" }}>
          //     {element.name + " ="}
          //   </Title>
          //   <Form.Item
          //     name={element.name}
          //     style={{ marginBottom: "12px" }}
          //   >
          //     <Input style={{ width: "128px" }} />
          //   </Form.Item>
          // </Row>
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
  );
}

export default class General1 extends Component {
  render() {
    return <Exercise></Exercise>;
  }
}
