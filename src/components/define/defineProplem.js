import 'antd/dist/antd.css';
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


function CustomRender({ id, content, content1, data, test, inputs, outputs }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    console.log(content1);
    const showModal = () => {
        console.log("hihi")
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
        <div style={{
            borderRadius: "10px"
        }}>
            <div>
                <math-field class="modelCon1" id="dk" style={{ backgroundColor: "#faefde" }}>{content.con}</math-field>
            </div>
            <div id={id} class="Model" style={{ background: '#faefde', borderRadius: '10px' }}>
                <div style={{ textAlign: 'right' }}>
                    <Button icon="times" size="small" onClick={() => data.onClick(id)} />
                </div>
                <div role="button" style={{ padding: '15px' }}>
                    {id}
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
                            <div>Điều kiện thực hiện bước giải</div>
                            <math-field class="modelCon" id="dk" style={{ backgroundColor: "#faefde" }}>{content.con}</math-field>
                            <div>Nhập các phép tính toán cần có</div>
                            <math-field class="modelCal" style={{ backgroundColor: "#faefde" }}>{content.cal}</math-field>
                            <div>Mô tả lời giải</div>
                            <input class="modelDes" value={content.des} />
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

    for (let i = 0; i < listobj.length; i++) {
        console.log(listobj[i].id)
        if (node == listobj[i].id) {
            return i;
        }
    }
    return false;
}

function formatJson(obj, listObj, dataObj) {
    var objTemp = obj;
    var indexRoot = checkDataObject(obj.node, dataObj)
    console.log(dataObj[indexRoot])
    objTemp.cal = dataObj[indexRoot].content.cal;
    objTemp.con = dataObj[indexRoot].content.con;
    objTemp.des = dataObj[indexRoot].content.des;

    for (let i = 0; i < obj.handle.length; i++) {
        var indexList = checkListObject(obj.handle[i], listObj);
        console.log(indexList)
        if (indexList != false) {

            objTemp.handle[i] = formatJson(listObj[indexList], listObj, dataObj)
        } else {
            var indexdata = checkDataObject(obj.handle[i], dataObj);
            objTemp.handle[i] = dataObj[indexdata].content;
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
const deleteNodeFromSchema = (id) => {
    const nodeToRemove = this.schema.nodes.find(node => node.id === id);
    this.removeNode(nodeToRemove);
};
function DefineProplem(props) {
    console.log(props)
    var schemaTest = props.data;
    const initialSchema1 = {
        "nodes": [
            {
                "id": "node-1",
                "content": "baitoangoc",
                "content1": {
                    "cal": "123",
                    "con": "x>2",
                    "des": "Day la 0",
                    "handle": ""
                },
                "coordinates": [
                    400,
                    200
                ],
                "outputs": [
                    {
                        "id": "node-1",
                        "alignment": "bottom"
                    }
                ]
            },
            {
                "id": "node-2",
                "content": "bafitoan2",
                "content1": {
                    "cal": "123",
                    "con": "x>2",
                    "des": "Day la 1",
                    "handle": ""
                },
                "coordinates": [
                    352,
                    261
                ],
                "render": CustomRender,
                "data": { onClick: deleteNodeFromSchema },
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
                "id": "node-3",
                "content": "Baitoan3",
                "content1": {
                    "cal": "123",
                    "con": "x>2",
                    "des": "Day la 3",
                    "handle": ""
                },
                "coordinates": [
                    393,
                    79
                ],
                "render": CustomRender,
                "data": { onClick: deleteNodeFromSchema },
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

        ],

    }

    console.log()
    const initialSchema = createSchema({
        nodes: [
            {
                id: 'node-1',
                content: 'Bài giải',
                cal: "",
                con: "",
                des: "",
                handle: "",
                data: "123",
                coordinates: [200, 200],
                outputs: [{ id: 'node-1', alignment: 'bottom' }],
            }
        ]
    });
    console.log(initialSchema)
    console.log(props.data)
    const [schema, { onChange, addNode, removeNode }] = useSchema(initialSchema);

    const addNewNode = () => {
        const nextNode = {
            id: `node-${schema.nodes.length + 1}`,
            content: {
                cal: "123",
                con: "",
                des: "Day la test",
                handle: "",
            },
            test: "123",
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
        console.log(schema)
    }

    const addNewFinalNode = () => {
        const nextNode = {
            id: `node-${schema.nodes.length + 1}`,
            content: {
                cal: "123",
                con: "",
                des: "",
                handle: "",
            },
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomFinalRender,
            data: { onClick: deleteNodeFromSchema },
            inputs: [{ id: `node-${schema.nodes.length + 1}` }],
        };

        addNode(nextNode);
    }
    const addNewVariableNode = () => {
        const nextNode = {
            id: `node-${schema.nodes.length + 1}`,
            content: {
                cal: "123",
                con: "",
                des: "",
                handle: "",
            },
            coordinates: [
                schema.nodes[schema.nodes.length - 1].coordinates[0] + 100,
                schema.nodes[schema.nodes.length - 1].coordinates[1],
            ],
            render: CustomVariableRender,
            data: { onClick: deleteNodeFromSchema },
        };

        addNode(nextNode);
    }
    const addIn = (obj) => {
        schema.links = obj.links;
        for (let i = 1; i < obj.nodes.length; i++) {
            const nextNode = {
                id: obj.nodes[i].id,
                content: obj.nodes[i].content,
                coordinates: obj.nodes[i].coordinates,
                render: CustomRender,
                data: { onClick: deleteNodeFromSchema },
                inputs: [{ id: obj.nodes[i].id }],
                outputs: [{ id: obj.nodes[i].id }],
            };

            addNode(nextNode);
        }
    }

    return (
        <div>
            <div style={{ height: '600px' }}>
                <Button color="primary" icon="plus" onClick={addNewNode}>Thêm bước giải</Button>
                <Button color="primary" icon="plus" onClick={addNewFinalNode}>Thêm kết quả</Button>
                <Button id="test111" color="primary" icon="plus" onClick={() => {
                    addIn(props.data);
                    console.log(schema)
                }}>Thêm đừogn dẫn1</Button>
                <Button onClick={() => {
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



