import React, { Component } from "react";
import { Typography, Col, Row } from 'antd';
import HomeCard from './home-card.component';
import UserService from "../services/user.service";

const { Title } = Typography;
export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div style={{textAlign: 'center', minHeight: "100vh"}}>
        <Title type="primary">MATHSOLVER</Title>
        <Title level={5}>Công cụ giải toán cung cấp lời giải từng bước.</Title>
        <Row>
          {/* <Col span={8}> */}
            <HomeCard
            title="ĐA THỨC"
            content="Lời giải từng bước cho các phương trình đa thức cơ bản"
            destination="/polynomial"
            source="https://magoosh.com/math/files/2018/10/shutterstock_754217827.jpg"
            ></HomeCard>
          {/* </Col> */}
          {/* <Col span={8}> */}
            <HomeCard
            title="ĐỒ THỊ"
            content="Khảo sát và vẽ đồ thị hàm số cho các phương trình đa thức cơ bản"
            destination="/graph"
            source="https://upload.wikimedia.org/wikipedia/commons/6/69/Drawing-a-circle-with-the-compasses.jpg"></HomeCard>
          {/* </Col> */}
          {/* <Col span={8}> */}
            <HomeCard
            title="TỔNG HỢP"
            content="Các dạng bài tổng hợp do người dùng đóng góp"
            destination="/problem"
            source="https://i.pinimg.com/736x/b1/98/4d/b1984d689cc4013c46a6bba7d04f6aa7.jpg"></HomeCard>
          {/* </Col> */}
        </Row>
      </div>
    );
  }
}
