// import React from "react"
import React from "react";
import MathJax from "react-mathjax2";
// import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// import Typography from "@material-ui/core/Typography";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
// import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core";

import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";

import { List, Card, Form } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Checkbox, Divider } from "antd";
import { Select } from "antd";
import { Input } from "antd";

import { Typography } from "antd";

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Popup = (props) => {
  return (
    <div className="popup-box">
      <IconButton aria-label="delete" onClick={props.handleClose}>
        <HighlightOffIcon />
      </IconButton>
      <FlavorForm idProblem={props.idProblem} />
    </div>
  );
};

function getcontent(data) {
  let valuesArray = Object.values(data);
  let i = 1;
  var result_api = "";
  for (let value of valuesArray) {
    if (typeof value == "number") {
      continue;
    }
    if (typeof value == "object") {
      result_api = result_api + getcontent(value) + "\\\\";
    } else {
      result_api = result_api + value + "\\" + "\\";
      i++;
    }
  }
  return result_api;
}

function arrayRemove(arr, value) {
  return arr.filter(function(ele) {
    return ele != value;
  });
}

const styleSubmit = {
  marginLeft: "10px",
  height: "40px",
  borderRadius: "10px",
};

function Solution(props) {
  const { result } = props;
  return (
    // <div className={classes.solutionContent}>
    <Card title={"Bài Giải"}>
      {/* <Divider orientation="left">Bài Giải</Divider> */}
      <Col>
      <Title level={5}>
        <MathJax.Context
          input="tex"
          options={{
            displayAlign: "left",
            mathmlSpacing: false,
            displayIndent: "0",
            paddingLeft: true,
            skipHtmlTags: ["+"],
            inlineMath: [
              ["$", "$"],
              ["\\(", "\\)"],
            ],
            processEscapes: true,
            tex: {
              packages: { "[+]": ["color"] },
            },
          }}
        >
          <div>
            <MathJax.Node>{result}</MathJax.Node>
          </div>
        </MathJax.Context>
        </Title>
      </Col>
    </Card>
  );
}

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setState({idProblem: props.idProblem})
    var inputJson = "";
    //   if (this.props.idProblem){
    // console.log(this.props.idProblem);
    fetch("http://api.bkmathapp.tk/api/problem_detail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        //   id: 0
        id: this.props.idProblem,
      }),
    }).then((res) => {
      res.json().then((db) => {
        inputJson = db.data.baitoan.description;
        // console.log(db);
        this.setState({
          defaultTopic: inputJson,
          topic: inputJson,
          variable: db.data.Variable,
          name: db.name
        });
        var findVar = this.state.value;
        var listvar = [];
        for (var i = 0; i < this.state.variable.length; i++) {
          listvar.push(this.state.variable[i].name);
        }
        var valueVar = arrayRemove(listvar, findVar);
        var topic = this.state.defaultTopic;

        if (topic.search("{" + findVar + "}") != -1) {
          topic = topic.replace("{" + findVar + "}", findVar);
          this.setState({ topic: topic });
        }
        this.setState({ isRender: true });
        // console.log(this.state.topic)
      });
    });
    // }
    this.state = {
      value: {},
      defaultTopic: inputJson,
      topic: inputJson,
      variable: [],
      result: "",
      isOpenSolution: false,
      isRender: false,
      isSubmit: false,
      name: "",
    };

    this.setState({ topic: this.state.defaultTopic });
  }

  // handleChange(event) {

  //   this.setState({value: event.target.value});
  //   this.setState({topic: this.state.defaultTopic});
  //   var findVar = event.target.value;
  //   var listvar = [];
  //   for (var i = 0; i < this.state.variable.length; i++){
  //     listvar.push(this.state.variable[i].name)
  //   }
  // // var listvar = this.state.variable;
  // var valueVar = arrayRemove(listvar, findVar);
  // // var topic = this.state.topic;
  // var topic = this.state.defaultTopic;

  // if (topic.search("{"+findVar+"}") != -1) {
  //   topic = topic.replace("{"+findVar+"}", findVar);
  //   this.setState({topic: topic});
  // }
  // for (var i = 0; i < valueVar.length; i++){
  //   if (topic.search("{"+valueVar[i]+"}") != -1) {
  //     topic = topic.replace("{"+valueVar[i]+"}", valueVar[i]+ ' = <input class = "test" name = "' + valueVar[i] + '"/>')
  //     this.setState({topic: topic})
  //     console.log(findVar, valueVar, topic)
  //   }
  // }
  // event.preventDefault();
  // }

  handleChange(event) {
    var listvalue = this.state.value;
    listvalue[event.target.id] = event.target.value;
    this.setState({ value: listvalue });
  }

  onFinish = (values) => {
    console.log("Success:", values);
    // this.setState({ value: values });
    this.setState({ isSubmit: true, isOpenSolution: false });
    fetch("http://api.bkmathapp.tk/api/problem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.idProblem,
        parameter: values,
      }),
    }).then((res) => {
      res.json().then((db) => {
        this.setState({ result: getcontent(db) });
        this.setState({ isOpenSolution: true });
      });
    });
  };

  onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  handleSubmit(event) {
    this.setState({ isSubmit: true, isOpenSolution: false });
    fetch("http://api.bkmathapp.tk/api/problem", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.props.idProblem,
        parameter: this.state.value,
      }),
    }).then((res) => {
      res.json().then((db) => {
        this.setState({ result: getcontent(db) });
        this.setState({ isOpenSolution: true });
      });
    });
    // event.preventDefault();
  }

  render() {
    return (
      <Row style={{ display: "block" }}>
        <Button type="primary" loading={!this.state.isOpenSolution}>
          Click me!
        </Button>
        {/* <Backdrop className={classes.backdrop} open={!this.state.isRender}>
          <CircularProgress color="inherit" />
        </Backdrop> */}
        {this.state.isRender && (
          <Row>
            <Col span={24}>
              <Form
                {...layout}
                onFinish={this.onFinish}
                onFinishFailed={this.onFinishFailed}
              >
                {/* <Button type="primary" loading={true} onClick={() => this.enterLoading(0)}>
          Click me!
        </Button> */}

                <Card
                  title={"Bài toán: " + this.state.name}
                  extra={
                    <Button
                      type="primary"
                      style={{ color: "white", background: "blue" }}
                      htmlType="submit"
                    >
                      Giải
                    </Button>
                  }
                >
                  <Title level={5}>{"Đề bài: " + this.state.topic}</Title>
                  <Title level={5}>Nhập các giá trị:</Title>
                  {this.state.variable.map((element, i) => {
                    return (
                      <Row>
                        <Title level={5} style={{ paddingRight: "6px" }}>
                          {element.name + " ="}
                        </Title>
                        <Form.Item
                          name={element.name}
                          style={{ marginBottom: "12px" }}
                        >
                          <Input style={{ width: "128px" }} />
                        </Form.Item>
                      </Row>
                    );
                  })}
                </Card>
              </Form>
            </Col>
          </Row>
        )}
        {/* {(!this.state.isOpenSolution && this.state.isSubmit) &&
          <CircularProgress color="inherit"/>
          } */}
        {this.state.isOpenSolution && (
          <Solution result={this.state.result}></Solution>
        )}
      </Row>
    );
  }
}

export default Popup;
