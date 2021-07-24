import React, { Component, useState } from "react";
import AuthService from "../services/auth.service";
import { Switch, Route, Link, BrowserRouter as Router, } from "react-router-dom";
import { List, Card } from "antd";
import { Steps, Step } from "react-step-builder";
import { Button } from "antd";
import { Row, Col } from "antd";
import { Checkbox, Divider } from "antd";
import { Select } from "antd";
import { Layout } from "antd";
import { Menu } from "antd";
import { Redirect } from "react-router-dom";
import DefineInfo from "./define/defineInfo"
import defineStepTwo from "./define/defineStepTwo";
import DefineProplem from "./define/defineProplem";
import { Modal } from 'antd';
const { Option } = Select;
const initialSchema1 = {
  "nodes": [
    {
      "id": "node-1",
      "content": "Bài toán gốc",
      "cal": "",
      "con": "",
      "des": "",
      "handle": "",
      "coordinates": [
        400,
        200
      ],
      "outputs": [
        {
          "id": "node-1",
          "alignment": "bottom"
        }
      ]
    }
  ]
};



function checkIvalid(test, array) {
  for (let value of array) {
    if (test == value) {
      return true;
    }
  }
  return false;
}
function checkListObject(node, listobj) {

  for (let i = 0; i < listobj.length; i++) {
    if (node == listobj[i].node) {
      return i;
    }
  }
  return false;
}
function checkDataObject(node, listobj) {
  console.log(node);
  console.log(listobj)
  for (let i = 0; i < listobj.length; i++) {
    console.log(listobj[i].id.id1)
    if (node == listobj[i].id.id1) {
      return i;
    }
  }
  return false;
}

function formatJson(obj, listObjPara, dataObjPara) {
  console.log(obj);
  console.log(listObj);
  console.log(dataObj);
  var objTemp = obj;
  var listObj = listObjPara;
  var dataObj = dataObjPara;
  var indexRoot = checkDataObject(obj.node, dataObj)
  console.log(indexRoot);
  console.log(dataObj[indexRoot])
  objTemp.unit = dataObj[indexRoot].id.unit;
  objTemp.cal = dataObj[indexRoot].id.cal;
  objTemp.con = dataObj[indexRoot].id.con;
  objTemp.des = dataObj[indexRoot].id.des;

  for (let i = 0; i < obj.handle.length; i++) {
    var indexList = checkListObject(obj.handle[i], listObj);
    console.log(indexList)
    if (indexList != false) {

      objTemp.handle[i] = formatJson(listObj[indexList], listObj, dataObj)
    } else {
      var indexdata = checkDataObject(obj.handle[i], dataObj);
      console.log(indexdata);
      // delete dataObj[indexdata].id.id1;
      var test = {

        equation: dataObj[indexdata].id.equation,
        unit: dataObj[indexdata].id.unit,
        introduction: dataObj[indexdata].id.introduction
      }
      objTemp.handle[i] = test

    }



  }
  delete objTemp.node;
  return objTemp
}

function createData(obj1) {
  var obj = obj1;
  console.log(obj);
  if (obj == undefined) {
    return false;
  }
  var data = [

  ]
  var indexRoot = null;
  let link = [];
  var didCheck = []
  console.log(obj.links);
  if (obj.links == undefined) {
    return false;
  }
  for (let i = 0; i < obj.links.length; i++) {

    var temp1 = obj.links[i];

    if (checkIvalid(temp1.output, didCheck) == false) {
      if (temp1.output == "node-1") {
        indexRoot = i;
      }
      var tempData = {
        "node": temp1.output,
        "handle": [
          temp1.input
        ]
      }
      didCheck.push(temp1.output)
      for (let j = i + 1; j < obj.links.length; j++) {
        var temp2 = obj.links[j];
        if (temp2.output == temp1.output) {
          tempData.handle.push(temp2.input)
        }
      }
      data.push(tempData)
    }
  }


  var tree = formatJson(data[indexRoot], data, obj.nodes)
  console.log(tree);
  return tree;
}


const Navigation = (props) => {
  console.log(props);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk1 = (event) => {

    console.log(props)
    var ListCondition = createData(props.state.schema);

    var check = false;
    var detail = 0;
    if (
      props.state.Info == undefined ||
      props.state.topic == undefined ||
      props.state.Variable == undefined ||
      ListCondition == false ||
      props.state.schema == undefined
    ) {
      check = false;
      detail = 1;
    } else {
      var dataSend = {
        "name": props.state.Info.name,
        "user": "123",
        "subject": props.state.Info.subject,
        "grade": props.state.Info.grade,
        "date": "10/08/2020",
        "data": {
          "baitoan": {
            "description": props.state.topic
          },
          "Variable": props.state.Variable,
          "ListCondition": ListCondition.handle
        },
        "schema": props.state.schema
      }
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "text/plain");

      var raw = JSON.stringify(dataSend);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };

      fetch("http://api.bkmathapp.tk/api/defineproblem", requestOptions)
        .then((response) => {
          response.json().then((db) => {
            if (db.check == true) {
              setIsModalVisible(false);
              setIsModalVisible1(true);
            }
          })
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }






  };


  const handleCancel = () => {
    setIsModalVisible(false);
  };

  var x = props.current;
  if (x != 3) {
    return (
      <div>
        <Row align="center" style={{ paddingBottom: "100px" }}>
          <Col>
            <Button type="primary" onClick={props.prev} style={{ marginRight: 10 }}>
              Quay lại
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={props.next}>
              Tiếp theo
            </Button>
          </Col>
        </Row>
      </div>

    )
  } else {
    return (
      <div>
        <Row align="center" style={{ paddingBottom: "100px" }}>
          <Col>
            <Button type="primary" onClick={props.prev} style={{ marginRight: 10 }}>
              Quay lại
            </Button>
          </Col>
          <Col>
            <Button type="primary" onClick={showModal}>
              Lưu bài toán
            </Button>
          </Col>
          <Modal align="center" title="Lưu bài toán" cancelText="Huỷ bỏ" okText="Lưu" visible={isModalVisible} onOk={handleOk1} onCancel={handleCancel}>
            <div>Xác nhận lưu bài toán</div>
          </Modal>
          <Modal align="center" title="Thông tin kết quả" visible={isModalVisible1}
            footer={[
              <Button key="back" onClick={() => {
                window.location.reload();
              }}>
                Quay lại
              </Button>,

            ]}
          >
            <div>Lưu bài toán thành công</div>

          </Modal>
        </Row>
      </div>

    )
  }

};
const config = {
  navigation: {
    component: Navigation, // a React component with special props provided automatically
    location: "after" // or before
  }
};

class ContentProblem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      listProblem: [],
      idProblem: "",
      nameProblem: "",
      isModalVisible: false,
      checkedAll: true,
      checked: [],
      grade: [],
      selectedGrade: "",
      isLoad: false,
      checkedList: [],


      indeterminate: true,

      checkAll: true,
      listSubject: [],
      selectedSubject: []
    };
    fetch("http://api.bkmathapp.tk/api/listproblem", {
      method: "GET",
    }).then((res) => {
      res.json().then((db) => {
        var listSubject = [];
        var listGrade = [];
        console.log("hahahaha");
        db.result.forEach((element) => {
          if (!listSubject.includes(element.subject)) {
            listSubject.push(element.subject);
          }
          if (!listGrade.includes(element.grade)) {
            listGrade.push(element.grade);
          }
        });
        this.setState({
          listProblem: db.result,
          listSubject: listSubject,
          checkedList: listSubject,
          grade: listGrade,
          isLoad: true,
        });
      });
    });
  }

  handleClose = (event) => {
    this.setState({ isOpen: !this.state.isOpen });
    document.getElementById("listProblem").style.display = null;
  };
  showModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };
  CloseModel = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  }
  handleClick = (event, problemData) => {
    this.setState({
      isOpen: !this.state.isOpen,
      // idProblem: id,
      // problemData: problemData,
      // nameProblem: nameProblem
      problemData: problemData
    });
    // this.setState({ nameProblem: nameProblem });
    document.getElementById("listProblem").style.display = "none";
  };
  handleDelete = () => {

    console.log(this.state.idProblem)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    var dataSend = {
      id: this.state.idProblem
    }
    var raw = JSON.stringify(dataSend);

    var requestOptions = {
      method: 'DELETE',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("http://api.bkmathapp.tk/api/defineproblem", requestOptions)
      .then((response) => {
        response.json().then((db) => {
          if (db.check == true) {
            window.location.reload();
          }
        })
      })
      .then(result => console.log(result))
      .catch(error => console.log('error', error));






  }

  onChange = (list) => {
    this.setState({
      checkedList: list,
      indeterminate:
        !!list.length && list.length < this.state.listSubject.length,
      checkAll: list.length === this.state.listSubject.length,
    });
  };

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? this.state.listSubject : [],
      // indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  render() {
    return (
      <>
        <Card
          loading={!this.state.isLoad}
          className="problem_list_card"
          id="listProblem"
        >
          <Button onClick={(e) =>
            this.handleClick(
              e,
              null
            )
          }>Định nghĩa bài toán mới</Button>
          <Row style={{ display: "block" }}>
            <Col span={24} style={{ padding: "0px 12px" }}>
              <Row gutter={16}>
                <Col span={18} style={{ paddingBottom: "8px" }}>
                  <Col span={24}>
                    <Divider>Môn học</Divider>
                    {/* <React.Fragment key="allsubject"> */}
                    <Checkbox
                      // indeterminate={this.state.indeterminate}
                      onChange={(list) => this.onCheckAllChange(list)}
                      checked={this.state.checkAll}
                    >
                      Tất cả
                    </Checkbox>
                    {/* </React.Fragment> */}
                  </Col>
                  <Col span={24}>
                    <Checkbox.Group
                      style={{ padding: "4px 0", width: "100%" }}
                      value={this.state.checkedList}
                      onChange={(e) => this.onChange(e)}
                    >
                      <Row>
                        {console.log(this.state.listSubject)}
                        {this.state.listSubject.map((value) => {
                          return (
                            <React.Fragment key={value}>
                              <Col span={6} style={{ padding: "4px 0" }}>

                                <Checkbox value={value}>
                                  {value}
                                </Checkbox>

                              </Col>
                            </React.Fragment>


                          );
                        })}
                      </Row>
                    </Checkbox.Group>
                  </Col>
                </Col>

                <Col span={6}>
                  <Divider>Lớp</Divider>
                  <Row justify="center">
                    <Select
                      defaultValue={this.state.selectedGrade}
                      style={{ width: 120 }}
                      onChange={(event) => {
                        this.setState({ selectedGrade: event });
                      }}
                    >
                      <React.Fragment key="all">
                        <Option value="">Tất cả</Option>
                      </React.Fragment>
                      {this.state.grade.map((value) => {
                        return (
                          <React.Fragment key={value}>
                            <Option value={value}>
                              {"Lớp " + value}
                            </Option>
                            ;
                          </React.Fragment>
                        );
                      })}
                    </Select>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col span={24}>
              <div>
                <List>
                  {this.state.listProblem.map((element) => {
                    var selectedSubject = this.state.checkedList;
                    if (this.state.checkAll) {
                      selectedSubject = this.state.listSubject;
                    }
                    if (
                      selectedSubject.includes(element.subject) &&
                      (this.state.selectedGrade === "" ||
                        this.state.selectedGrade === element.grade)
                    ) {
                      return (
                        <React.Fragment key={element.id}>
                          <List.Item
                            className="problen_listitem"
                            style={{ display: "block" }}
                          >
                            <Card
                              title={element.name}
                              extra={
                                <div>
                                  <Button
                                    type="primary"
                                    onClick={(e) =>
                                      this.handleClick(
                                        e,
                                        element
                                      )
                                    }
                                  >
                                    Chọn
                                  </Button>
                                  <Button
                                    style={{ marginLeft: "5px" }}
                                    type="primary"
                                    onClick={(e) => {
                                      this.showModal()
                                      this.setState({ idProblem: element.id })

                                    }}

                                  >
                                    Xoá
                                  </Button>
                                  <Modal align="center" title="Xoá bài toán" cancelText="Huỷ bỏ" okText="Xoá" visible={this.state.isModalVisible} onOk={this.handleDelete} onCancel={this.CloseModel}>
                                    <div>Xác nhận xoá bài toán</div>
                                  </Modal>

                                </div>
                              }
                            >
                              {element.data.baitoan.description}
                            </Card>
                          </List.Item>
                        </React.Fragment>
                      );
                    }
                    else {
                      return (
                        <></>
                      )
                    }
                  })}
                </List>
              </div>
            </Col>
          </Row>
        </Card >
        {
          this.state.isOpen && (
            <Steps style={{ height: "1000px" }} config={config}  >
              <Step style={{ height: "100%" }} handleClose={this.handleClose} data={this.state.problemData} component={DefineInfo} title="Bước 1: Nhập thông tin bài toán " />
              <Step style={{ height: "100%" }} component={defineStepTwo} title="Định nghĩa đề bài và biến số " />
              <Step style={{ height: "100%" }} component={DefineProplem} title="Định nghĩa bài giải" />
            </Steps>
          )
        }
      </>
    );
  }
}







export default class BoardModerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (!user) this.setState({ redirect: "/login" });
    else if (!["moderator", "admin"].includes(user.role)) this.setState({ redirect: "/home" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }
    return (
      <div className="container">
        <header className="jumbotron">
          <ContentProblem></ContentProblem>
        </header>
      </div>
    );
  }
}
