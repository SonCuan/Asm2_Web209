import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Cascader,
  Checkbox,
  ColorPicker,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Radio,
  Rate,
  Select,
  Slider,
  Switch,
  TreeSelect,
  Upload,
} from "antd";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import api from "../servies/axios";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProductAdd = () => {
  const nav = useNavigate();
  const { mutate } = useMutation({
    mutationFn: async (product) => {
      const res = await api.post("/products", product);
      return res.product;
    },
    onSuccess: () => {
      message.success("Them thanh cong");
      nav("/admin/products");
    },
  });
  const onFinish = (values) => {
    mutate(values);
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        style={{
          maxWidth: 1000,
        }}
        onFinish={onFinish}
      >
        <Form.Item label="Trang thai">
          <Radio.Group>
            <Radio value="apple"> Con hang </Radio>
            <Radio value="pear"> Het hang </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Ten san pham"
          name="name"
          rules={[{ required: true, message: "Vui long nhap ten san pham" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Anh san pham"
          name="imageUrl"
          rules={[{ required: true, message: "Vui long nhap anh san pham" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Danh muc" name='category'>
          <Select>
            <Select.Option value="ao khoac nam ">Ao khoac nam</Select.Option>
            <Select.Option value="ao khoac nu">Ao khoac nu </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Gia san pham"
          name="price"
          rules={[{ required: true, message: "Vui long nhap gia san pham" }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item label="Mo ta">
          <TextArea rows={4} />
        </Form.Item>
        <Button htmlType="submit">Submit</Button>
      </Form>
    </>
  );
};
export default () => <ProductAdd />;
