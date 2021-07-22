import React, { useState, useRef, useEffect, useCallback } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import 'antd/dist/antd.css';
import 'beautiful-react-diagrams/styles.css';
import { Modal } from 'antd';




function CustomFinalRender(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (event) => {
        var equa = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelEqua")[0].getValue('latex');
        var intro = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelIntro")[0].value;
        props.id.equation = equa;
        props.id.introduction = intro;
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{
            width: "110px",
            border: "1px solid #D3DAFF"
        }}>

            <div id={props.content} class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
                <div style={{ textAlign: 'right' }}>
                    <Button icon="times" size="small" onClick={() => props.data.onClick(props.id.id1)} />
                </div>

                <div role="button" style={{ padding: '15px', textAlign: "center" }}>
                    {props.content}
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    {props.inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'green' } }))}
                    {props.outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'red' } }))}
                </div>
                <button style={{
                    width: "100%"
                }} type="primary" onClick={showModal}>
                    Chi tiết kết quả
                </button>

                <Modal title="Thông tin kết quả" cancelText="Quay lại" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <div>
                            <div>Nhập kết quả</div>
                            <math-field class="modelEqua" style={{ backgroundColor: "#faefde" }}>{props.id.equation}</math-field>
                            <div>Mô tả lời giải</div>
                            <textarea style={{ width: "100%" }} class="modelIntro" id="w3review" name="w3review" rows="4" cols="20">
                                {props.id.introduction}
                            </textarea>
                        </div>
                    </div>

                </Modal>
            </div>

        </div>

    );
}



function CustomRender(props) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = (event) => {
        var Con = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelCon")[0].getValue('latex');
        var Cal = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelCal")[0].getValue('latex');
        var Des = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelDes")[0].value;
        props.id.cal = Cal;
        props.id.con = Con;
        props.id.des = Des;
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <div style={{
            width: "130px",
            border: "1px solid #147f8f"
        }}>

            <div id={props.content} class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
                <div style={{ border: "1px solid #147f8f" }}>
                    <math-field read-only class="modelCon1" id="dk" style={{ backgroundColor: "#faefde", textAlign: "center" }}>{props.id.con}</math-field>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <Button icon="times" size="small" onClick={() => props.data.onClick(props.id.id1)} />
                </div>

                <div role="button" style={{ padding: '15px', textAlign: "center" }}>
                    {props.content}
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    {props.inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'green' } }))}
                    {props.outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'red' } }))}
                </div>
                <button style={{
                    width: "100%"
                }} type="primary" onClick={showModal}>
                    Chi tiết bước giải
                </button>

                <Modal title="Thông tin bước giải" visible={isModalVisible}
                    cancelText="Quay lại" onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <div>
                            <div>Điều kiện thực hiện bước giải</div>
                            <math-field class="modelCon" id="dk" style={{ backgroundColor: "#faefde" }}>{props.id.con}</math-field>
                            <div>Nhập các phép tính toán cần có</div>
                            <math-field class="modelCal" style={{ backgroundColor: "#faefde" }}>{props.id.cal}</math-field>
                            <div>Mô tả lời giải</div>
                            <textarea style={{ width: "100%" }} class="modelDes" id="w3review" name="w3review" rows="4" cols="30">
                                {props.id.des}
                            </textarea>
                        </div>
                    </div>

                </Modal>
            </div>

        </div>

    );
}





function DefineProplem(props) {
    var numberCount = 0;
    var numberCount1 = 0;


    var test = {
        "nodes": [
            {
                "id": {
                    "handle": "",
                    "id1": "node-1"
                },
                "content": "Bắt đầu",
                "data": {},
                "coordinates": [
                    88,
                    176
                ],
                "outputs": [
                    {
                        "id": "node-1",
                        "alignment": "bottom"
                    }
                ]
            }

        ],
    }


    console.log(props);
    var initialSchema = createSchema({
        nodes: [
            {
                id: 'node-1',
                content: 'Bài giải',
                handle: "",
                coordinates: [200, 200],
                outputs: [{ id: 'node-1', alignment: 'bottom' }],
            }
        ]
    });
    console.log(props)
    var [schema, { onChange, addNode, removeNode, connect }] = useSchema(initialSchema);

    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find(node => node.id.id1 === id);
        removeNode(nodeToRemove);
        props.setState("schema", schema);
    };
    if (props.state.schema != null) {
        test = props.state.schema;
        console.log("test")
        for (let i = 1; i < test.nodes.length; i++) {
            if (test.nodes[i].content == "Bước giải") {

                test.nodes[i].render = CustomRender;
                test.nodes[i].data = {
                    onClick: deleteNodeFromSchema
                }
            } else if (test.nodes[i].content == "Đáp án") {

                test.nodes[i].render = CustomFinalRender;
                test.nodes[i].data = {
                    onClick: deleteNodeFromSchema
                }
            }



        }
    } else {
        for (let i = 1; i < test.nodes.length; i++) {
            test.nodes[i].render = CustomRender;
            test.nodes[i].data = {
                onClick: deleteNodeFromSchema
            }

        }
    }

    [schema, { onChange, addNode, removeNode }] = useSchema(test)
    console.log(onChange);
    const addNewNode = (number, number1) => {
        var count = `node-${schema.nodes.length + 1}`;
        for (let node of schema.nodes) {
            if (count == node.id.id1) {
                count = `node-${schema.nodes.length + 2}`
            }
        }


        const nextNode = {
            id: {
                cal: "",
                con: "",
                des: "",
                handle: "",
                id1: count
            },
            content: "Bước giải",
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ id: count }],
            outputs: [{ id: count }],
        };

        addNode(nextNode);
        props.setState("schema", schema);
    }

    const addNewFinalNode = () => {
        var count = `node-${schema.nodes.length + 1}`;
        for (let node of schema.nodes) {
            if (count == node.id.id1) {
                count = `node-${schema.nodes.length + 2}`
            }
        }
        const nextNode = {
            id: {
                equation: "",
                introduction: "",
                id1: count
            },
            content: "Đáp án",
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomFinalRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ id: count }]
        };

        addNode(nextNode);
    }
    return (
        <div>
            <div style={{ height: '900px', paddingTop: "50px" }}>
                <div style={{
                    textAlign: "center",
                    fontSize: "30px",
                    color: "#147f8f"
                }}>
                    Bước 3: Nhập thông tin các bước giải
                </div>
                <Button color="primary" icon="plus" onClick={() => {
                    numberCount = numberCount + 1;
                    numberCount1 = numberCount1 + 1;
                    addNewNode(numberCount, numberCount1)
                }}>Thêm bước giải</Button>
                <Button color="primary" icon="plus" onClick={() => {
                    console.log(schema);
                }}>Thêm bước giải</Button>
                <Button color="primary" icon="plus" onClick={addNewFinalNode}>Thêm kết quả</Button>
                <Diagram schema={schema} onChange={onChange} onClick={() => {
                    props.setState("schema", schema);
                }} />
            </div>

        </div>
    );
}

export default DefineProplem



