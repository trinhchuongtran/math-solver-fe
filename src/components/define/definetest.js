import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Formik, Field, Form, ErrorMessage, FieldArray } from 'formik';

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
    const [fields1, setFields] = useState([
        {
            "Variable": props.state.Variable

        }
    ]);
    return (
        <div>
            <p>
                <Form fields={fields1} name="dynamic_form_nest_item" initialValues={
                    fields1[0]
                } onFinish={onFinish} autoComplete="on">

                    <Form.List name="Variable">
                        {(fields, { add, remove }) => (
                            <>
                                {
                                    fields.map(({ key, name, fieldKey, ...restField }) => (
                                        <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                                            <Form.Item

                                                name={[name, "name"]}
                                                fieldKey={[fieldKey, 'name']}

                                                rules={[{ required: true, message: 'Thiếu tên biến' }]}
                                            >
                                                <Input placeholder="Tên biến" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'unit']}
                                                fieldKey={[fieldKey, 'unit']}
                                                rules={[{ required: true, message: 'Thiếu đơn vị của biến' }]}
                                            >
                                                <Input placeholder="Đơn vị" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'condition']}
                                                fieldKey={[fieldKey, 'condition']}
                                                rules={[{ required: true, message: 'Thiếu điều kiện của biến' }]}
                                            >
                                                <Input placeholder="Điều kiện" />
                                                {/* <math-field style={{ backgroundColor: "#faefde", width: "200px" }}></math-field> */}
                                            </Form.Item>
                                            <MinusCircleOutlined onClick={() => remove(name)} />
                                        </Space>
                                    ))
                                }
                                < Form.Item >
                                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                        Thêm biến mới
                                    </Button>

                                </Form.Item>
                            </>
                        )
                        }
                    </Form.List >
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form >
            </p>
        </div>
    );
}

export default DefineStepTwo;
