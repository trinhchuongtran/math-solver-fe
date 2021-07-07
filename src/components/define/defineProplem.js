import React, { useState, useRef, useEffect } from 'react';
import Diagram, { createSchema, useSchema } from 'beautiful-react-diagrams';
import { Button } from 'beautiful-react-ui';
import 'antd/dist/antd.css';
import 'beautiful-react-diagrams/styles.css';
import { Modal } from 'antd';


function CustomFinalRender({ id, content, data, inputs, outputs }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = (e) => {
        console.log(e.target)
        setIsModalVisible(true);
    };

    const handleOk = (event) => {
        var Con = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelCon")[0].getValue('latex');
        var Cal = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelCal")[0].getValue('latex');
        var Des = event.target.parentElement.parentElement.parentElement.getElementsByClassName("ant-modal-body")[0].children[0].children[0].getElementsByClassName("modelDes")[0].value;
        content.cal = Cal;
        content.con = Con;
        content.des = Des;
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <div class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
            <div style={{ textAlign: 'right' }}>
                <Button icon="times" size="small" onClick={() => data.onClick(id)} />
            </div>
            <div role="button" style={{ padding: '15px' }}>
                {content.cal}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'green' } }))}
                {outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'red' } }))}
            </div>
            <button type="primary" onClick={showModal}>
                Chi tiết
            </button>
            <Modal title="Thông tin bước giải" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div>
                        <div>Điều kiện thực hiện bước giải cuối cùng</div>
                        <math-field class="modelCon" id="dk" style={{ backgroundColor: "#faefde" }}></math-field>
                        <div>Nhập các phép tính toán cần có</div>
                        <math-field class="modelCal" style={{ backgroundColor: "#faefde" }}></math-field>
                        <div>Mô tả lời giải</div>
                        <input class="modelDes" />
                    </div>
                </div>

            </Modal>
        </div>
    );
}

function CustomVariableRender({ id, content, data, inputs, outputs }) {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        console.log("hihi")
        setIsModalVisible(true);
    };

    const handleOk = (event) => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };



    return (
        <div class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
            <div style={{ textAlign: 'right' }}>
                <Button icon="times" size="small" onClick={() => data.onClick(id)} />
            </div>
            <div role="button" style={{ padding: '15px' }}>
                {content.cal}
            </div>
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                {inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'green' } }))}
                {outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'red' } }))}
            </div>
            <button type="primary" onClick={showModal}>
                Chi tiết
            </button>
            <Modal title="Thông tin bước giải" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div>
                    <div>
                        <div>Thêm biến</div>
                        <math-field class="modelCon" id="dk" style={{ backgroundColor: "#faefde" }}></math-field>
                        <div>Điều kiện của biến</div>
                        <math-field class="modelCal" style={{ backgroundColor: "#faefde" }}></math-field>
                        <div>Đơn vị</div>
                        <input class="modelDes" />
                    </div>
                </div>

            </Modal>
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
            borderRadius: "10px"
        }}>
            <div>
                <math-field class="modelCon1" id="dk" style={{ backgroundColor: "#faefde" }}>{props.id.con}</math-field>
            </div>
            <div id={props.content} class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
                <div style={{ textAlign: 'right' }}>
                    <Button icon="times" size="small" onClick={() => props.data.onClick(props.content)} />
                </div>
                <div role="button" style={{ padding: '15px' }}>
                    {props.content}
                </div>
                <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                    {props.inputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'green' } }))}
                    {props.outputs.map((port) => React.cloneElement(port, { style: { width: '25px', height: '25px', borderRadius: '5px', background: 'red' } }))}
                </div>
                <button type="primary" onClick={showModal}>
                    Chi tiết
                </button>

                <Modal title="Thông tin bước giải" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                    <div>
                        <div>
                            <div>Điều kiện thực hiện bước giải</div>
                            <math-field class="modelCon" id="dk" style={{ backgroundColor: "#faefde" }}>{props.id.con}</math-field>
                            <div>Nhập các phép tính toán cần có</div>
                            <math-field class="modelCal" style={{ backgroundColor: "#faefde" }}>{props.id.cal}</math-field>
                            <div>Mô tả lời giải</div>
                            <input class="modelDes" value={props.id.des} />
                        </div>
                    </div>

                </Modal>
            </div>

        </div>

    );
}

function checkIvalid(test, array) {
    for (let i = 0; i < array.length; i++) {
        if (test == array[i]) {
            return true;
        }
    }
    return false;
}
function checkListObject(node, listobj) {

    for (let i = 0; i < listobj.length; i++) {
        if (node == listobj[i].node) {
            return i;
        }
    }
    return false;
}
function checkDataObject(node, listobj) {
    console.log(node);
    console.log(listobj)
    for (let i = 0; i < listobj.length; i++) {
        console.log(listobj[i].content)
        if (node == listobj[i].content) {
            return i;
        }
    }
    return false;
}

function formatJson(obj, listObj, dataObj) {
    console.log(obj);
    console.log(listObj);
    console.log(dataObj);
    var objTemp = obj;
    var indexRoot = checkDataObject(obj.node, dataObj)

    console.log(dataObj[indexRoot])
    objTemp.cal = dataObj[indexRoot].id.cal;
    objTemp.con = dataObj[indexRoot].id.con;
    objTemp.des = dataObj[indexRoot].id.des;

    for (let i = 0; i < obj.handle.length; i++) {
        var indexList = checkListObject(obj.handle[i], listObj);
        console.log(indexList)
        if (indexList != false) {

            objTemp.handle[i] = formatJson(listObj[indexList], listObj, dataObj)
        } else {
            var indexdata = checkDataObject(obj.handle[i], dataObj);
            delete dataObj[indexdata].id.id1; 
            objTemp.handle[i] = dataObj[indexdata].id;

        }



    }
    delete objTemp.node;
    return objTemp
}

function createData(obj) {
    var data = [

    ]
    var indexRoot = null;
    let link = [];
    var didCheck = []
    for (let i = 0; i < obj.links.length; i++) {

        var temp1 = obj.links[i];

        if (checkIvalid(temp1.output, didCheck) == false) {
            if (temp1.output == "node-1") {
                indexRoot = i;
            }
            var tempData = {
                "node": temp1.output,
                "handle": [
                    temp1.input
                ]
            }
            didCheck.push(temp1.output)
            for (let j = i + 1; j < obj.links.length; j++) {
                var temp2 = obj.links[j];
                if (temp2.output == temp1.output) {
                    tempData.handle.push(temp2.input)
                }
            }
            data.push(tempData)
        }
    }

    var tree = formatJson(data[indexRoot], data, obj.nodes)
    console.log(tree)
}


var numberCount = 0;
var numberCount1 = 0;

var test = {
    "nodes": [
        {
            "id": {
                "cal": "",
                "con": "",
                "des": "",
                "handle": ""
            },
            "content": "node-1",
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
        },
        {
            "id": {
                "cal": 1,
                "con": 1,
                "des": "Day la test",
                "handle": "",
                "id1": "nodeDif-2"
            },
            "content": "node-2",
            "coordinates": [
                190,
                46
            ],
            "data": {},
            "inputs": [
                {
                    "id": "node-2"
                }
            ],
            "outputs": [
                {
                    "id": "node-2"
                }
            ]
        },
        {
            "id": {
                "cal": 2,
                "con": 2,
                "des": "Day la test",
                "handle": "",
                "id1": "nodeDif-3"
            },
            "content": "node-3",
            "coordinates": [
                247,
                267
            ],
            "data": {},
            "inputs": [
                {
                    "id": "node-3"
                }
            ],
            "outputs": [
                {
                    "id": "node-3"
                }
            ]
        },
        {
            "id": {
                "cal": 3,
                "con": 3,
                "des": "Day la test",
                "handle": "",
                "id1": "nodeDif-4"
            },
            "content": "node-4",
            "coordinates": [
                443,
                124
            ],
            "data": {},
            "inputs": [
                {
                    "id": "node-4"
                }
            ],
            "outputs": [
                {
                    "id": "node-4"
                }
            ]
        },
        {
            "id": {
                "cal": 4,
                "con": 4,
                "des": "Day la test",
                "handle": "",
                "id1": "nodeDif-5"
            },
            "content": "node-5",
            "coordinates": [
                429,
                377
            ],
            "data": {},
            "inputs": [
                {
                    "id": "node-5"
                }
            ],
            "outputs": [
                {
                    "id": "node-5"
                }
            ]
        }
    ],
    "links": [
        {
            "input": "node-2",
            "output": "node-1"
        },
        {
            "input": "node-3",
            "output": "node-1"
        },
        {
            "input": "node-4",
            "output": "node-3"
        },
        {
            "input": "node-5",
            "output": "node-3"
        }
    ]
}





function DefineProplem(props) {

    var initialSchema = createSchema({
        nodes: [
            {
                id: 'node-1',
                content: 'Bài giải',
                cal: "",
                con: "",
                des: "",
                handle: "",
                coordinates: [200, 200],
                outputs: [{ id: 'node-1', alignment: 'bottom' }],
            }
        ]
    });
    console.log(props)
    var [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

    const deleteNodeFromSchema = (id) => {
        const nodeToRemove = schema.nodes.find(node => node.content === id);
        removeNode(nodeToRemove);
    };
    for (let i = 0; i < test.nodes.length; i++) {
        test.nodes[i].render = CustomRender;
        test.nodes[i].data = {
            onClick: deleteNodeFromSchema
        }

    }
    console.log(test);
    [schema, { onChange, addNode, removeNode }] = useSchema(test)

    const addNewNode = (number, number1) => {
        console.log(schema)
        const nextNode = {
            id: {
                cal: number1,
                con: number,
                des: "Day la test",
                handle: "",
                id1: `nodeDif-${schema.nodes.length + 1}`
            },
            content: `node-${schema.nodes.length + 1}`,
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ id: `node-${schema.nodes.length + 1}` }],
            outputs: [{ id: `node-${schema.nodes.length + 1}` }],
        };

        addNode(nextNode);

    }

    const addNewFinalNode = () => {
        console.log(schema);
        const nextNode = {
            id: {
                cal: "123",
                con: "",
                des: "",
                handle: "",
                id1: `node-${schema.nodes.length + 1}`
            },
            content: `node-${schema.nodes.length + 1}`,
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomFinalRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ content: `node-${schema.nodes.length + 1}` }],
        };

        addNode(nextNode);
    }
    return (
        <div>
            <div style={{ height: '600px' }}>
                <Button color="primary" icon="plus" onClick={() => {
                    numberCount = numberCount + 1;
                    numberCount1 = numberCount1 + 1;
                    addNewNode(numberCount, numberCount1)
                }}>Thêm bước giải</Button>
                <Button color="primary" icon="plus" onClick={addNewFinalNode}>Thêm kết quả</Button>
                <Button onClick={() => {
                    console.log(schema)
                    createData(schema);
                }}>Submit</Button>
                <Button onClick={() => {
                    console.log(schema)
                }}>Test</Button>
                <Diagram schema={schema} onChange={onChange} />
            </div>

        </div>
    );
}

export default DefineProplem



