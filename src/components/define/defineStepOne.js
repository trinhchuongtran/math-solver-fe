import React from "react";
import { Input } from "antd";

function defineStepOne(props) {
    props.getState("title", "Đề bài toán")
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
