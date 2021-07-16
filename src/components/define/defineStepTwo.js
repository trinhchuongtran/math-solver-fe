import React, { useState, useEffect } from "react";
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function CustomizedForm({ fields1, value, onChange, setState }) {
    const onFinish = (values) => {
        setState("Variable", "Test");
        console.log(values);
        console.log(onChange)
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
        for (let i = 0; i < document.getElementsByClassName("nameDefineVar").length; i++) {
            document.getElementsByClassName("nameDefineVar")[i].value = fields1[0].Variable[i].name;
            document.getElementsByClassName("conDefineVar")[i].value = fields1[0].Variable[i].condition;
            document.getElementsByClassName("unitDefineVar")[i].value = fields1[0].Variable[i].unit;
        }


    });
    const [fields1, setFields] = useState([
        {
            "Variable": props.state.Variable

        }
    ]);
    const onChange = () => {
        console.log("hihi");
        for (let i = 0; i < document.getElementsByClassName("nameDefineVar").length; i++) {
            var obj = {
                name: document.getElementsByClassName("nameDefineVar")[i].value,
                unit: document.getElementsByClassName("unitDefineVar")[i].value,
                condition: document.getElementsByClassName("conDefineVar")[i].value
            }
            console.log(obj);

        }

        // props.setState("Variable", values.Variable);
    }
    return (
        <div>
            <p>
                <Form fields={fields1} name="dynamic_form_nest_item" initialValues={
                    fields1[0]
                } onFinish={onFinish} autoComplete="on">

                    <Form.List name="Variable" id="listVar" onChange={onChange}>
                        {(fields, { add, remove }) => {
                            return (
                                <>
                                    {
                                        fields.map((props) => {

                                            return (
                                                <Space key={props.key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                                    <Form.Item

                                                        name={[props.name, "name"]}
                                                        fieldKey={[props.fieldKey, 'name']}

                                                        rules={[{ required: true, message: 'Thiếu tên biến' }]}
                                                    >
                                                        <math-field onChange={onChange} class="nameDefineVar" style={{ width: "200px", backgroundColor: "#FFFFFF", borderRadius: "5px", margin: "15px", }}></math-field>
                                                    </Form.Item>
                                                    <Form.Item

                                                        name={[props.name, 'unit']}
                                                        fieldKey={[props.fieldKey, 'unit']}
                                                        rules={[{ required: true, message: 'Thiếu đơn vị của biến' }]}
                                                    >
                                                        <input class="unitDefineVar" placeholder="Đơn vị" />
                                                    </Form.Item>
                                                    <Form.Item

                                                        name={[props.name, 'condition']}
                                                        fieldKey={[props.fieldKey, 'condition']}
                                                        rules={[{ required: true, message: 'Thiếu điều kiện của biến' }]}
                                                    >

                                                        <math-field placeholder="x^2" class="conDefineVar" style={{ width: "200px", backgroundColor: "#FFFFFF", borderRadius: "5px", margin: "15px", }}></math-field>


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
