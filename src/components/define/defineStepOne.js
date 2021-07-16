import React, { useEffect } from "react";
import { Input, Form } from "antd";
import { Row, Col } from "antd";
const { TextArea } = Input;
function DefineStepOne(props) {
    console.log(props);
    console.log(props);

    useEffect(() => {
        if (props.state.topic != undefined) {
            document.getElementById("debai").value = props.state.topic;
        }
    });

    const onChange = () => {
        var debai = document.getElementById("debai").value;
        props.setState("topic", debai);
        console.log(props);
    }
    return (
        <div style={{ height: "400px", paddingTop: "50px" }}>
            <Form onChange={onChange}>
                <Form.Item

                >
                    <div>Tên bài toán</div>
                    <TextArea id="debai"
                        row={3}
                    >

                    </TextArea>
                </Form.Item>
            </Form>

        </div >
    );
}

export default DefineStepOne;
