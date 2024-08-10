import React, { useState, useEffect } from "react";
import { Table, Space, Button, Modal } from "antd";

import {
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Input, Select } from "antd";

const apiURL = process.env.REACT_APP_API_URL;

const { Option } = Select;

const { Column, ColumnGroup } = Table;

function MonitorComponent(props) {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [editData, setEditData] = useState({});
  const [isModalVisible, setIsModalVisible] = useState({});
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const [datarequest, setDatarequest] = useState({});
  const [deleteID, setDeleteID] = useState(undefined);

  
  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch(`${apiURL}/api/users`, requestOptions)
      .then((res) => {
        res.json().then((db) => {
          setLoading(false);
          setData(db);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function editclick(record) {
    setEditData(record);

    var dataUpdate = {};
    dataUpdate.id = record.id;
    dataUpdate.first_name = record.first_name;
    dataUpdate.last_name = record.last_name;
    dataUpdate.is_superuser = record.is_superuser;
    dataUpdate.role = record.role;
    console.log(dataUpdate);
    setDatarequest(dataUpdate);

    var modalvisible = {};
    modalvisible[record.id] = true;
    setIsModalVisible(modalvisible);
  }

  function deleteclick(id) {
    setDeleteID(id);
    setIsModalVisibleDelete(true);
  }

  function handleDelOk() {
    const requestOptions = {
      method: "GET",
    };
    setLoading(true);
    fetch(`${apiURL}/api/users`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: deleteID,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
        fetch(`${apiURL}/api/users`, requestOptions)
          .then((res) => {
            res.json().then((db) => {
              setLoading(false);
              setData(db);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisibleDelete(false);
  }

  function handleDelCancel() {
    setDeleteID(undefined);
    setIsModalVisibleDelete(false);
  }

  function handleChangeName(key, value) {
    var dataUpdate = datarequest;
    dataUpdate[key] = value;
    setDatarequest(dataUpdate);
  }

  function handleChange(value) {
    var dataUpdate = datarequest;
    if (value === "admin") {
      dataUpdate.is_superuser = true;
    } else {
      dataUpdate.is_superuser = false;
    }
    dataUpdate.role = value;
    setDatarequest(dataUpdate);
  }

  const handleOk = () => {
    const requestOptions = {
      method: "GET",
    };
    setLoading(true);
    fetch(`${apiURL}/api/users`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: datarequest,
      }),
    })
      .then((res) => {
        fetch(`${apiURL}/api/users`, requestOptions)
          .then((res) => {
            res.json().then((db) => {
              setLoading(false);
              setData(db);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setEditData({});
    setIsModalVisible({});
  };

  const handleCancel = () => {
    setDatarequest({});
    setIsModalVisible({});
  };
  return (
    <>
      <Table
        rowKey={(record) => {
          return record.password;
        }}
        dataSource={data}
        loading={loading}
        bordered
        style={{ marginTop: "20px" }}
      >
        <ColumnGroup title={"Tên"}>
          <Column
            title="Tên"
            dataIndex="first_name"
            sorter={(a, b) => {
              return a.first_name.length - b.first_name.length;
            }}
          />
          <Column
            title="Họ"
            dataIndex="last_name"
            sorter={(a, b) => {
              return a.last_name.length - b.last_name.length;
            }}
          />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" />
        <Column
          title="Quyền quản lý"
          dataIndex="role"
          defaultSortOrder="ascend"
          sorter={(a, b) => {
            var key = {
              admin: 1,
              definer: 2,
              user: 3,
            };
            return key[a.role] - key[b.role];
          }}
          render={(record) => {
            if (record === "admin") {
              return <>Quản trị viên</>;
            } else if (record === "definer") {
              return <>Người định nghĩa</>;
            } else if (record === "user") {
              return <>Người dùng</>;
            }
          }}
        />
        <Column
          title="Hành động"
          render={(record) => (
            <>
              <Space size="middle">
                <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                    editclick(record);
                  }}
                >
                  Chỉnh sửa
                </Button>

                <Button
                  icon={<DeleteOutlined />}
                  onClick={() => deleteclick(record.id)}
                >
                  Xoá
                </Button>
              </Space>

              <Modal
                title="Chỉnh sửa"
                visible={isModalVisible[record.id]}
                onOk={handleOk}
                onCancel={handleCancel}
                okButtonProps={{ icon: <SaveOutlined /> }}
                cancelButtonProps={{ icon: <CloseOutlined /> }}
                okText="Lưu"
                cancelText="Hủy"
              >
                Tên:{" "}
                <Input
                  defaultValue={editData.first_name}
                  onChange={(e) =>
                    handleChangeName("first_name", e.target.value)
                  }
                ></Input>
                Họ:{" "}
                <Input
                  defaultValue={editData.last_name}
                  onChange={(e) =>
                    handleChangeName("last_name", e.target.value)
                  }
                ></Input>
                Quyền quản lí:
                <br></br>
                <Select
                  defaultValue={editData.role}
                  onChange={handleChange}
                  style={{ width: "40%" }}
                >
                  <Option value="admin">Quản trị viên</Option>
                  <Option value="definer">Người định nghĩa</Option>
                  <Option value="user">Người dùng</Option>
                </Select>
              </Modal>
            </>
          )}
        />
      </Table>
      <Modal
        title="Xác nhận"
        visible={isModalVisibleDelete}
        onOk={handleDelOk}
        onCancel={handleDelCancel}
        okButtonProps={{ icon: <DeleteOutlined /> }}
        cancelButtonProps={{ icon: <CloseOutlined /> }}
        okText="Xóa"
        cancelText="Hủy"
      >
        Xác nhận xóa?
      </Modal>
    </>
  );
}

export default MonitorComponent;
