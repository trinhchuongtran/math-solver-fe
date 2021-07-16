import React, { useState, useEffect, useCallback } from "react";
import { Table, Space, Button, Modal } from "antd";
import authHeader from "../services/auth-header";
// import { Icon } from 'antd';
import {
  EditOutlined,
  SaveOutlined,
  DeleteOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Input, Select } from "antd";

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

  const requestOptions = {
    method: "GET",
    // headers: authHeader(),
  };
  useEffect(() => {
    fetch("http://api.bkmathapp.tk/api/users", requestOptions)
      .then((res) => {
        res.json().then((db) => {
          setLoading(false);
          // for (let value of db) {
          //   value.is_superuser = value.is_superuser
          //     ? "Quản trị viên"
          //     : "Người định nghĩa";
          // }
          setData(db);
          console.log(db);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function editclick(record) {
    // let temp = record;
    // if (temp.is_superuser == "Quản trị viên") {
    //   temp.is_superuser = true
    // }
    // else {
    //   temp.is_superuser = false
    // }
    // console.log(temp);
    // console.log(record);

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
    setLoading(true)
    fetch(`http://api.bkmathapp.tk/api/users/${deleteID}`, {
      method: "DELETE",
      // headers: authHeader(),
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
        fetch("http://api.bkmathapp.tk/api/users", requestOptions)
          .then((res) => {
            res.json().then((db) => {
              setLoading(false);
              // for (let value of db) {
              //   value.is_superuser = value.is_superuser
              //     ? "Quản trị viên"
              //     : "Người định nghĩa";
              // }
              setData(db);
              console.log(db);
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
    const x = data;

    // for (var i = 0; i < data.length; i++){
    //   if (data[i]["id"] == deleteID){
    //     console.log(data)
    //     x.splice(i, 1)
    //     console.log(x)
    //     // console.log(deleteID)
    //     // setData([{email: "w@a.com",
    //     // first_name: "Nguyen",
    //     // id: 15,
    //     // is_superuser: "Người định nghĩa",
    //     // last_name: "Nguyen",
    //     // password: "pbkdf2_sha256$216000$f5RauNJFd36s$yvCDRbKgK8QFByucN/n8/1e1R0jDWNOL9hssYkVmImo="}])
    //     break;
    //   }
    // }
    // setData(x);
    //  setData([{email: "w@a.com",
    //     first_name: "Nguyen",
    //     id: 15,
    //     is_superuser: "Người định nghĩa",
    //     last_name: "Nguyen",
    //     password: "pbkdf2_sha256$216000$f5RauNJFd36s$yvCDRbKgK8QFByucN/n8/1e1R0jDWNOL9hssYkVmImo="}])
  }

  function handleDelCancel() {
    setDeleteID(undefined);
    setIsModalVisibleDelete(false);
  }

  function ModalVisible(value) {
    if (value == editData.id) {
      return true;
    } else {
      return false;
    }
  }

  function handleChangeName(key, value) {
    var dataUpdate = datarequest;
    dataUpdate[key] = value;
    setDatarequest(dataUpdate);
  }

  function handleChange(value) {
    var dataUpdate = datarequest;
    if (value == "admin") {
      dataUpdate.is_superuser = true;
    } else {
      dataUpdate.is_superuser = false;
    }
    dataUpdate.role = value;
    setDatarequest(dataUpdate);
    console.log(datarequest);
  }

  const handleOk = () => {
    // setIsModalVisible(false);
    // console.log("pingOk");
    // if (datarequest.is_superuser == "Người định nghĩa") {
    //   datarequest.is_superuser = false;
    // } else if (datarequest.is_superuser == "Quản trị viên") {
    //   datarequest.is_superuser = true;
    // }
    setLoading(true)
    fetch(`http://api.bkmathapp.tk/api/users/${datarequest.id}`, {
      // fetch(`http://api.bkmathapp.tk/api/user/${id}`, {
      method: "PUT",
      // headers: authHeader(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: datarequest,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
        fetch("http://api.bkmathapp.tk/api/users", requestOptions)
          .then((res) => {
            res.json().then((db) => {
              setLoading(false);
              // for (let value of db) {
              //   value.is_superuser = value.is_superuser
              //     ? "Quản trị viên"
              //     : "Người định nghĩa";
              // }
              setData(db);
              console.log(db);
            });
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsModalVisible({});
  };

  const handleCancel = () => {
    setDatarequest({});
    // setIsModalVisible(false);
    setIsModalVisible({});
  };

  // function upgrade(id) {
  //   // fetch(`http://128.0.0.1:6900/api/users/${id}`, {
  //   fetch(`http://api.bkmathapp.tk/api/user/${id}`, {
  //     method: "PUT",
  //     headers: authHeader(),
  //   })
  //     .then((res) => {
  //       res.json().then((data) => {
  //         console.log(data);
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function delete_user(id) {
    fetch(`http://api.bkmathapp.tk/api/users/${id}`, {
      // fetch(`http://api.bkmathapp.tk/api/user/${id}`, {
      method: "DELETE",
      // headers: authHeader(),
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then((res) => {
        res.json().then((data) => {
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function test(text) {
    console.log(text);
  }
  return (
    <>
      <Table dataSource={data} loading={loading}>
        <Column title="ID" dataIndex="id" key="id" />
        <ColumnGroup title={"Tên"}>
          <Column title="Họ" dataIndex="first_name" key="first_name" />
          <Column title="Tên" dataIndex="last_name" key="last_name" />
        </ColumnGroup>
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Quyền quản lý" dataIndex="role" key="role" />
        <Column
          title="Hành động"
          key="action"
          render={(record) => (
            <>
              <Space size="middle">
                {/*<Button onClick={() => test(record.id)}>Test</Button>*/}
                {/* <Button onClick={() => upgrade(record.id)}>Nâng cấp quyền</Button> */}
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
                <Select defaultValue={editData.role} onChange={handleChange}>
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
        Xác nhận xóa chứ?
      </Modal>
    </>
  );
}

// function Modalcomponent(data){
//   const [isModalVisible, setIsModalVisible] = useState(data.isModalVisible);

//   // useEffect(() => {
//   //   setIsModalVisible(data.isModalVisible)
//   // },[])

//   console.log(data)
//   const handleOk = () => {
//     setIsModalVisible(false);
//   };

//   const handleCancel = () => {
//     setIsModalVisible(false);
//   };
//   return(
//     <Modal
//         title="Chỉnh sửa"
//         visible={isModalVisible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         hksdhfkashkfhdks
//         {/* {editData.id}
//         First name: <Input> {data.first_name}</Input>
//         First name: <Input defaultValue={data.first_name}></Input> */}
//       </Modal>
//   )
// }

export default MonitorComponent;
