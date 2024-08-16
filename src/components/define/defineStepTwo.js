import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';
// import { MathfieldComponent } from "react-mathlive";
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { TextArea } = Input;

// function CustomizedForm({ fields1, value, onChange, setState }) {
//     const onFinish = (values) => {
//         setState("Variable", "Test");
//     }
//     return (
//         <div>123</div>
//     )
// };
const DefineStepTwo = (props) => {

    // console.log(props);
    const onFinish = (values) => {
        props.setState("Variable", values.Variable);
        // console.log(values.Variable);

    }
    useEffect(() => {
        // console.log(fields1);
        if (fields1[0].Variable !== undefined) {
            for (let i = 0; i < document.getElementsByClassName("VarName").length; i++) {

                document.getElementsByClassName("VarNameC")[i].value = fields1[0].Variable[i].title;
                document.getElementsByClassName("VarName")[i].value = fields1[0].Variable[i].name;
                if (fields1[0].Variable[i].condition != null) {
                    document.getElementsByClassName("VarCon")[i].value = fields1[0].Variable[i].condition;
                } else {
                    document.getElementsByClassName("VarCon")[i].value = "";
                }
                if (fields1[0].Variable[i].unit != null) {
                    document.getElementsByClassName("unitDefineVar")[i].value = fields1[0].Variable[i].unit;
                } else {
                    document.getElementsByClassName("unitDefineVar")[i].value = "";
                }
            }

        }
        if (props.state.topic !== undefined) {
            document.getElementById("debai").value = props.state.topic;
        }


    });
    const [fields1, setFields] = useState([
        {
            "Variable": props.state.Variable
        }
    ]);
    // console.log(fields1);
    const onChangeValue = () => {
        // console.log("hihi");
        var objVar = [];
        var Title = document.getElementsByClassName("VarNameC");
        var Con = document.getElementsByClassName("VarCon");
        var Name = document.getElementsByClassName("VarName");
        var Unit = document.getElementsByClassName("unitDefineVar");
        var topic = document.getElementById("debai").value;
        // console.log(Con.length);
        for (let i = 0; i < document.getElementsByClassName("VarCon").length; i++) {
            var unit = "";
            var con = "";
            if (Unit[i].value === "") {
                unit = null;
            } else {
                unit = Unit[i].value;
            }
            if (Con[i].getValue('latex') === "") {
                con = null;
            } else {
                con = Con[i].getValue('latex');
            }
            var temp = {
                title: Title[i].value,
                name: Name[i].getValue('latex'),
                unit: unit,
                condition: con
            }
            // console.log(temp);
            objVar.push(temp);

        }
        props.state.Variable = objVar;
        props.state.topic = topic;
        // console.log(props);
    }
    const styleInput = {
        width: "100%",
        backgroundColor: "#ffffff",
        border: "1px solid #d9d9d9"
    }









    return (
        <div style={{ minHeight: "600px", paddingTop: "50px" }}>
            <Button type="primary" onClick={props.state.handleClose} style={{ marginRight: 10 }}>
                Trở về
            </Button>
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
                    <div style={{
                        fontSize: "20px",
                        color: "#147f8f"
                    }}>Danh sách biến số</div>
                    <Form.List name="Variable" id="listVar" style={{ width: "100%" }}  >
                        {(fields, { add, remove }) => {
                            // console.log(fields)
                            return (
                                <>
                                    {
                                        fields.map((props) => {
                                            // console.log(props);
                                            return (
                                                <Space key={props.key} style={{ display: 'flex', width: "100%" }} align="baseline">
                                                    <Form.Item
                                                        label="Tên biến số"
                                                        style={{
                                                            width: "280px"
                                                        }}
                                                        name={[props.name, "nameC"]}
                                                        fieldKey={[props.fieldKey, 'nameC']}

                                                        rules={[{ required: true, message: 'Thiếu tên biến' }]}
                                                    >
                                                        <input onKeyUp={onChangeValue} class="VarNameC" style={{
                                                            width: "100%",
                                                            height: "40px",
                                                            backgroundColor: "#ffffff",
                                                            border: "1px solid #d9d9d9"
                                                        }} />

                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Kí hiệu"
                                                        style={{
                                                            width: "250px"
                                                        }}
                                                        name={[props.name, "name"]}
                                                        fieldKey={[props.fieldKey, 'name']}

                                                        rules={[{ required: true, message: 'Thiếu tên biến' }]}
                                                    >
                                                        <math-field placeholder="x^2" onKeyUp={onChangeValue} class="VarName" style={styleInput}></math-field>

                                                    </Form.Item>
                                                    <Form.Item
                                                        label="Đơn vị biến số"
                                                        style={{
                                                            width: "250px"
                                                        }}
                                                        name={[props.name, 'unit']}
                                                        fieldKey={[props.fieldKey, 'unit']}
                                                        rules={[{ required: true, message: 'Thiếu đơn vị của biến' }]}
                                                    >
                                                        <input onKeyUp={onChangeValue} class="unitDefineVar" style={{
                                                            width: "100%",
                                                            height: "40px",
                                                            backgroundColor: "#ffffff",
                                                            border: "1px solid #d9d9d9"
                                                        }} />
                                                    </Form.Item>

                                                    <Form.Item

                                                        label="Điều kiện biến số"
                                                        style={{
                                                            width: "250px"
                                                        }}
                                                        name={[props.name, 'condition']}
                                                        fieldKey={[props.fieldKey, 'condition']}
                                                        rules={[{ required: true, message: 'Thiếu điều kiện của biến' }]}
                                                    >
                                                        <math-field onKeyUp={onChangeValue} class="VarCon" style={styleInput}></math-field>



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
