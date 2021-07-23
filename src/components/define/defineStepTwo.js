import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';
import { MathfieldComponent } from "react-mathlive";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

function CustomizedForm({ fields1, value, onChange, setState }) {
    const onFinish = (values) => {
        setState("Variable", "Test");
    }
    return (
        <div>123</div>
    )
};
const DefineStepTwo = (props) => {

    console.log(props);
    const onFinish = (values) => {
        props.setState("Variable", values.Variable);
        console.log(values.Variable);

    }
    useEffect(() => {
        console.log(fields1);
        if (fields1[0].Variable != undefined) {
            for (let i = 0; i < document.getElementsByClassName("VarName").length; i++) {
                document.getElementsByClassName("VarName")[i].value = fields1[0].Variable[i].name;
                document.getElementsByClassName("VarCon")[i].value = fields1[0].Variable[i].condition;
                document.getElementsByClassName("unitDefineVar")[i].value = fields1[0].Variable[i].unit;
            }

        }
        if (props.state.topic != undefined) {
            document.getElementById("debai").value = props.state.topic;
        }


    });
    const [fields1, setFields] = useState([
        {
            "Variable": props.state.Variable
        }
    ]);
    console.log(fields1);
    const onChangeValue = () => {
        console.log("hihi");
        var objVar = [];
        var Con = document.getElementsByClassName("VarCon");
        var Name = document.getElementsByClassName("VarName");
        var Unit = document.getElementsByClassName("unitDefineVar");
        var topic = document.getElementById("debai").value;
        console.log(Con.length);
        for (let i = 0; i < document.getElementsByClassName("VarCon").length; i++) {

            var temp = {
                name: Name[i].getValue('latex'),
                unit: Unit[i].value,
                condition: Con[i].getValue('latex')
            }
            console.log(temp);
            objVar.push(temp);

        }
        props.state.Variable = objVar;
        props.state.topic = topic;
        console.log(props);
    }
    return (
        <div style={{ height: "400px", paddingTop: "50px" }}>
            <div style={{
                textAlign: "center",
                fontSize: "30px",
                color: "#147f8f"
            }}>
                Bước 2: Nhập thông tin đề bài và biến số
            </div>
            <p>
                <Form fields={fields1} name="dynamic_form_nest_item" initialValues={
                    fields1[0]
                } onFinish={onFinish} autoComplete="on">
                    <Form.Item

                    >
                        <div style={{

                            fontSize: "20px",
                            color: "#147f8f"
                        }}>Đề bài toán</div>
                        <TextArea id="debai" onChange={onChangeValue}
                            row={3}
                        >

                        </TextArea>
                    </Form.Item>
                    <Form.List name="Variable" id="listVar" >
                        {(fields, { add, remove }) => {
                            console.log(fields)
                            return (
                                <>
                                    {
                                        fields.map((props) => {
                                            console.log(props);
                                            return (
                                                <Space key={props.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item
                                                        style={{
                                                            width: "200px"
                                                        }}
                                                        name={[props.name, "name"]}
                                                        fieldKey={[props.fieldKey, 'name']}

                                                        rules={[{ required: true, message: 'Thiếu tên biến' }]}
                                                    >
                                                        <math-field onKeyUp={onChangeValue} class="VarName" style={{ backgroundColor: "#faefde" }}></math-field>
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{
                                                            width: "200px"
                                                        }}

                                                        name={[props.name, 'unit']}
                                                        fieldKey={[props.fieldKey, 'unit']}
                                                        rules={[{ required: true, message: 'Thiếu đơn vị của biến' }]}
                                                    >
                                                        <input class="unitDefineVar" onKeyUp={onChangeValue} placeholder="Đơn vị" />
                                                    </Form.Item>
                                                    <Form.Item
                                                        style={{
                                                            width: "200px"
                                                        }}
                                                        name={[props.name, 'condition']}
                                                        fieldKey={[props.fieldKey, 'condition']}
                                                        rules={[{ required: true, message: 'Thiếu điều kiện của biến' }]}
                                                    >
                                                        <math-field onKeyUp={onChangeValue} class="VarCon" style={{ backgroundColor: "#faefde" }}></math-field>



                                                    </Form.Item>
                                                    <MinusCircleOutlined onClick={() => remove(props.name)} />
                                                </Space>
                                            )


                                        })
                                    }
                                    < Form.Item >
                                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                            Thêm biến mới
                                        </Button>

                                    </Form.Item>
                                </>
                            )
                        }
                        }
                    </Form.List >
                </Form >
            </p>
        </div>
    );
}

export default DefineStepTwo;
