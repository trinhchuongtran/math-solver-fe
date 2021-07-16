import React from "react";
import { Input } from "antd";

function defineStepOne(props) {
    console.log(props);
    props.state.data = "hihi";
    console.log(props);
    return (
        <div>
            <p>
                <div>Nhập đề bài toán</div>
                <Input
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
