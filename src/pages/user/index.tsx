import React, { useEffect, useState } from "react";
import { Button, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import BaseLayout from "../../Layout";
import { useNavigate } from "react-router-dom";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const User: React.FC = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "userName",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "role",
      dataIndex: "roleUser.name",
      key: "role",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "Description",
    },
    {
      title: "created",
      dataIndex: "created",
      key: "created",
    },
    {
      title: "action",
      render: (e) => {
        return (
          <Space>
            <Button danger>xóa</Button>
            <Button onClick={() => navigate(`/create-account?id=${e?.id}`)}>
              sửa
            </Button>
          </Space>
        );
      },
    },
  ];

  const getData = async () => {
    try {
      const response = await fetch("https://localhost:44397/User", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <BaseLayout
      title="Tài khoản"
      textButton="Tạo tài khoản"
      onClickBtn={() => navigate("/create-account")}
    >
      <Table columns={columns} dataSource={data} />
    </BaseLayout>
  );
};

export default User;
