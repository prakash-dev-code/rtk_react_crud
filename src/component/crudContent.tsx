import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/store";
import { addUser, updateUser, deleteUser, clearUsers } from "../redux/userSlice";
import { Button, Modal, Space, Table, TableProps, Typography } from "antd";
import { DataType } from "../types/common";
import { v4 as uuidv4 } from "uuid";

const CrudContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [formData, setFormData] = useState<DataType>({
    id: "",
    name: "",
    email: "",
    age: "",
    contact: "",
    address: "",
  });

  const users = useSelector((state: RootState) => state.user.users);
  const dispatch = useDispatch();

  const handleOk = () => {
    if (isEdit) {
      dispatch(updateUser(formData));
    } else {
      dispatch(addUser({ ...formData, id: uuidv4() }));
    }
    setIsModalOpen(false);
    setFormData({
      id: "",
      name: "",
      email: "",
      age: "",
      contact: "",
      address: "",
    });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFormData({
      id: "",
      name: "",
      email: "",
      age: "",
      contact: "",
      address: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showModal = (edit: boolean, record?: DataType) => {
    setIsEdit(edit);
    if (edit && record) {
      setFormData(record);
    }
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleClearTable = () => {
    dispatch(clearUsers());
  };

  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Name",
      dataIndex: "name",
      render: (name) => <Typography>{name}</Typography>,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (email) => <Typography>{email}</Typography>,
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (age) => <Typography>{age}</Typography>,
    },
    {
      title: "Contact",
      dataIndex: "contact",
    },
    {
      title: "Address",
      dataIndex: "address",
      render: (address: any) => <Typography>{address}</Typography>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: DataType) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal(true, record)}>
            Edit
          </Button>
          <Button danger onClick={() => handleDelete(record.id)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col gap-5 w-full mt-10">
        <div className="text-end">
          <Button
            className="bg-black text-white mr-2"
            onClick={handleClearTable}
          >
            Clear Table
          </Button>
          <Button
            className="bg-black text-white"
            onClick={() => showModal(false)}
          >
            Add User
          </Button>
        </div>
        <div className="border rounded">
          <Table
            columns={columns}
            dataSource={users}
            pagination={false}
            rowKey="id"
          />
        </div>
      </div>

      <Modal
        title={isEdit ? "Edit User" : "Add User"}
        open={isModalOpen}
        onOk={handleOk}
        okText={"Submit"}
        onCancel={handleCancel}
      >
        <div className="p-4">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Name here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Age here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Email here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Contact here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Enter Address here..."
              className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CrudContent;
