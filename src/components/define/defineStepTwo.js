import React, { useState } from "react";
import 'antd/dist/antd.css';
import { Form, Input, Button, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

function CustomizedForm({ fields1 }) {
    const onFinish = (values) => {
        console.log(values);
    }
    return (
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
                                        {...restField}
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
    )
};




const DefineStepTwo = (props) => {

    const [fields, setFields] = useState([
        {
            "Variable": [
                {
                    "name": "1",
                    "unit": "2",
                    "condition": "3"
                },
                {
                    "name": "2",
                    "unit": "3",
                    "condition": "4"
                }
            ]
        }
    ]);
    return (
        <div>
            <p>
                <Input
                    addonBefore="hihi"
                    name="name"
                    value={props.getState("name", "")}
                    onChange={props.handleChange}
                />
                <CustomizedForm
                    fields1={fields}

                />
            </p>
        </div>
    );
}

export default DefineStepTwo;
