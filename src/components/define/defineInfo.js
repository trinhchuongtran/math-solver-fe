import React, { useEffect } from "react";
import { Form, Input, Button, Space, Select } from 'antd';
import { Row, Col } from "antd";
const { TextArea } = Input;
function DefineInfo(props) {

    useEffect(() => {
        if (props.state.Info != undefined) {
            document.getElementById("nameProplem").value = props.state.Info.name;
            document.getElementById("Subject").value = props.state.Info.subject;
            document.getElementById("Grade").value = props.state.Info.grade;

        }
    });

    const onChange = (e) => {
        var nameProblem = document.getElementById("nameProplem").value;
        var Grade = document.getElementById("Grade").value;
        var Subject = document.getElementById("Subject").value;
        var info = {
            id: "1",
            name: nameProblem,
            subject: Subject,
            grade: Grade
        }

        props.setState("Info", info);
        console.log(props);
    }
    const onChangeSelect = (value) => {
        console.log(value);
    }

    const style = {
        width: "100%",
        padding: "5px"
    }
    return (
        <div style={{ height: "400px", paddingTop: "50px" }}>
            <Form name="register" id="te" onChange={onChange}>
                <Form.Item

                >
                    <div>Tên bài toán</div>
                    <Input addonBefore="Tên bài tập" id="nameProplem" rows={4} />
                </Form.Item>
                <Form.Item

                >
                    <div>Môn học</div>
                    <select
                        style={style}
                        placeholder="Chọn môn học"
                        allowClear
                        onChange={onChange}
                        id="Subject"
                    >   <option value="">Chọn môn học</option>
                        <option value="Toán học">Toán học</option>
                        <option value="Hoá học">Hoá học</option>
                        <option value="Vật lý">Vật lý</option>
                    </select>
                </Form.Item>
                <Form.Item

                >
                    <div>Lớp</div>
                    <select
                        style={style}
                        placeholder="Chọn môn học"
                        allowClear
                        onChange={onChange}
                        id="Grade"
                    >
                        <option value="">Chọn lớp</option>
                        <option value="6">Lớp 6</option>
                        <option value="7">Lớp 7</option>
                        <option value="8">Lớp 8</option>
                        <option value="9">Lớp 9</option>
                    </select>
                </Form.Item>
            </Form>
        </div >
    );
}

export default DefineInfo;
