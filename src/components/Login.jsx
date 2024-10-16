import { useMutation } from "@tanstack/react-query";
import { Button, Form, Input, message } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import api from "../servies/axios";

const Login = () => {
  const nav = useNavigate();
  const mutation = useMutation({
    mutationFn : async (data) => { 
        const res = await api.post('/register', data)
        return res.data;
    },
    onSuccess : () => { 
        message.success('Dang nhap thanh cong');
        nav('/admin/products');
    }
  })
  return (
    <Form
      onFinish={(data) => mutation.mutate(data)}
      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      style={{
        maxWidth: 600,
      }}
    >
      <Form.Item
        label="email"
        name="email"
        rules={[
          {
            required: true, message : 'Vui long nhap email',
            type : 'email' , message : 'Email khong hop le'
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[
          {
            required: true, message : 'Vui long nhap password'
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Button htmlType="submit" type="primary">
        Submit
      </Button>
    </Form>
  );
};

export default Login;