import React from "react";
import { Input } from "antd";
import { Row, Col } from "antd";
function defineStepOne(props) {
    console.log(props);
    props.state.data = "hihi";
    console.log(props);
    return (
        <div style={{ height: "400px", paddingTop: "50px" }}>
            <Row align="center">
                Bước 2: Nhập thông tin đề bài
            </Row>
            <p>
                <div>Nhập đề bài toán</div>
                <Input
                    style={{
                        height: "200px"
                    }}
                    addonBefore="Đề bài"
                    name="name"
                    value={props.getState("name", "")}
                    onChange={props.handleChange}
                />
            </p>
        </div>
    );
}

export default defineStepOne;
