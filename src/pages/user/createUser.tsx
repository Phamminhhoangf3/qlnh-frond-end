import React, { useEffect } from "react";
import { Button, Form, Input } from "antd";
import BaseLayout from "../../Layout";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

type FieldType = {
  userName?: string;
  password?: string;
  description?: string;
};

const CreateUser: React.FC = () => {
  const [queryParameters] = useSearchParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    if (queryParameters.get("id")) {
      handleUpdate({
        ...values,
        id: queryParameters.get("id"),
      });
    } else {
      handleCreate(values);
    }
  };

  const handleCreate = async (data: any) => {
    try {
      const params = new URLSearchParams(data).toString();
      await fetch("https://localhost:44397/User?" + params, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }).then((x) => console.log(x));
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (data: any) => {
    try {
      const params = new URLSearchParams(data).toString();
      const res = await fetch(`https://localhost:44397/User?${params}`, {
        method: "PUT",
      });

      if (res.status === 200) {
        navigate("/user");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const getData = async (id: any) => {
    try {
      const response = await fetch(`https://localhost:44397/User/Id?Id=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const result = await response.json();
      if (result) {
        console.log(result);
        form.setFieldsValue(result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (queryParameters.get("id")) getData(queryParameters.get("id"));
  }, [queryParameters.get("id")]);

  return (
    <BaseLayout title="Tạo tài khoản">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        form={form}
      >
        <Form.Item<FieldType>
          label="Username"
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          // rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item<FieldType>
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </BaseLayout>
  );
};

export default CreateUser;
