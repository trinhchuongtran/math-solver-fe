// import React from "react"
import React  from "react";
import MathJax from "react-mathjax2";
import { LeftOutlined } from "@ant-design/icons";

import { Card, Form } from "antd";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Input } from "antd";

import { Typography } from "antd";



const apiURL = process.env.REACT_APP_API_URL;

const { Title } = Typography;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const PopupProblem = (props) => {

  // const [idProblem, setIdProblem] = React.useState(props.idProblem )

  // React.useEffect(() => {
  //   setIdProblem(props.idProblem)
  //   console.log(props.idProblem)
  //   console.log(idProblem)
  // }, [])

  return (
    <Card className="problem_card">
      <Button
        type="primary"
        icon={<LeftOutlined />}
        onClick={props.handleClose}
        style={{ marginBottom: "8px" }}
      >
        Trở lại
      </Button>
      <Threads problemData={props.problemData} />
    </Card>
  );
};

function getcontent(data) {
  let valuesArray = Object.values(data);
  // let i = 1;
  var result_api = "";
  for (let value of valuesArray) {
    if (typeof value == "number") {
      continue;
    }
    if (typeof value == "object") {
      result_api = result_api + getcontent(value) + "\\\\";
    } else {
      result_api = result_api + value + "\\\\";
      // i++;
    }
  }
  return result_api;
}

// function arrayRemove(arr, value) {
//   return arr.filter(function (ele) {
//     return ele !== value;
//   });
// }

function Solution(props) {
  const { result, isloading } = props;
  return (
    <Card title={"Bài Giải"} loading={!isloading} style={{ marginTop: "8px" }}>
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

// class Threads extends React.Component {
//   constructor(props) {
//         super(props);
        
//         this.state = {idProblem: this.props.idProblem,
//           value: {},
//           defaultTopic: "",
//           topic: "",
//           variable: [],
//           result: "",
//           isOpenSolution: false,
//           isRender: false,
//           isSubmit: false,
//           name: "",
//         };
//       }

//   componentDidMount(){
//     var inputJson = "";
//     fetch(`${apiURL}/api/problem_detail", {

//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             //   id: 0
//             id: this.state.idProblem,
//           }),
//         }).then((res) => {
//           res.json().then((db) => {
//             // console.log(db);
//             inputJson = db.data.baitoan.description;
//             this.setState({
//               defaultTopic: inputJson,
//               topic: inputJson,
//               variable: db.data.Variable,
//               name: db.name,
//             });
//             var findVar = this.state.value;
//             var listvar = [];
//             for (var i = 0; i < this.state.variable.length; i++) {
//               listvar.push(this.state.variable[i].name);
//             }
//             var valueVar = arrayRemove(listvar, findVar);
//             var topic = this.state.defaultTopic;
    
//             if (topic.search("{" + findVar + "}") != -1) {
//               topic = topic.replace("{" + findVar + "}", findVar);
//               this.setState({ topic: topic });
//             }
//             this.setState({ isRender: true });
//           });
//         });
        
    
//         // this.setState({ topic: this.state.defaultTopic });
//   }

//   render() {
//     return (
//       "sdbkfkjsdfkjsd"
//     )
//   }
// }

class Threads extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // console.log(this.props.problemData.id)
    this.state = {
      idProblem: this.props.problemData.id,
      problemData: this.props.problemData.data,
      value: {},
      defaultTopic: "",
      topic: "",
      variable: [],
      result: "",
      isOpenSolution: false,
      isRender: false,
      isSubmit: false,
      name: this.props.problemData.name
    };
  }

  componentDidMount(){
    var inputJson = "";
    // fetch(`${apiURL}/api/problem_detail", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     //   id: 0
    //     id: this.state.idProblem,
    //   }),
    // }).then((res) => {
    //   res.json().then((db) => {
    //     // console.log(db);
    //     inputJson = db.data.baitoan.description;
    //     this.setState({
    //       defaultTopic: inputJson,
    //       topic: inputJson,
    //       variable: db.data.Variable,
    //       name: db.name,
    //     });
    //     var findVar = this.state.value;
    //     var listvar = [];
    //     for (var i = 0; i < this.state.variable.length; i++) {
    //       listvar.push(this.state.variable[i].name);
    //     }
    //     // var valueVar = arrayRemove(listvar, findVar);
    //     var topic = this.state.defaultTopic;

    //     if (topic.search("{" + findVar + "}") !== -1) {
    //       topic = topic.replace("{" + findVar + "}", findVar);
    //       this.setState({ topic: topic });
    //     }
    //     this.setState({ isRender: true });
    //   });
    // });
    console.log(this.state.problemData)
        inputJson = this.state.problemData.baitoan.description;
        this.setState({
          defaultTopic: inputJson,
          topic: inputJson,
          variable: this.state.problemData.Variable,
          name: this.state.name,
        });
        var findVar = this.state.value;
        var listvar = [];
        for (var i = 0; i < this.state.variable.length; i++) {
          listvar.push(this.state.variable[i].name);
        }
        // var valueVar = arrayRemove(listvar, findVar);
        var topic = this.state.defaultTopic;

        if (topic.search("{" + findVar + "}") !== -1) {
          topic = topic.replace("{" + findVar + "}", findVar);
          this.setState({ topic: topic });
        }
        this.setState({ isRender: true });
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
    // console.log("Success:", this.state.idProblem);
    // this.setState({ value: values });
    this.setState({ isSubmit: true, isOpenSolution: false });
    fetch(`${apiURL}/api/problem`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: this.state.idProblem,
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
    fetch(`${apiURL}/api/problem`, {
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
        <Col span={24}>
          <Form
            {...layout}
            onFinish={this.onFinish}
            onFinishFailed={this.onFinishFailed}
          >
            <Card
              title={"Bài toán: " + this.state.name}
              extra={
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={this.state.isSubmit && !this.state.isOpenSolution}
                >
                  Giải
                </Button>
              }
              loading={!this.state.isRender}
            >
              <Title level={5}>{"Đề bài: " + this.state.topic}</Title>
              <Title level={5}>Nhập các giá trị:</Title>
              <Row>
                {this.state.variable.map((element) => {
                  return (
                    <React.Fragment key={element.name}>
                    <Col span={24} className="problem_inputvalue">
                      <Title level={5} style={{ paddingRight: "6px" }}>
                        {element.title + " " + element.name + " ="}
                      </Title>
                      <Form.Item
                        name={element.name}
                        style={{ marginBottom: "12px" }}
                      >
                        <Input style={{ width: "128px" }} />
                      </Form.Item>
                      <Title level={5} style={{ paddingLeft: "6px" }}>
                        {element.unit}
                      </Title>
                    </Col>
                    </React.Fragment>
                  );
                })}
              </Row>
            </Card>
          </Form>
        </Col>
        {this.state.isSubmit && (
          <Solution
            result={this.state.result}
            isloading={this.state.isOpenSolution}
          ></Solution>
        )}
      </Row>
    );
  }
}

export default PopupProblem;
