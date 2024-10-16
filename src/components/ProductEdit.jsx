import React, { useEffect, useState } from "react";
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import api from "../servies/axios";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const ProductEdit = () => {
  const nav = useNavigate();
  const client = useQueryClient();
  const {id} = useParams();
  const [form]= Form.useForm();
  const {data} = useQuery({
    queryKey : ['product'],
    queryFn : async () => { 
      const res =  await api.get(`/products/${id}`,);
      return res.data;
    },
  })
  useEffect(()=> { 
    if(data) { 
      form.setFieldsValue({
        name : data.name,
        price : data.price,
        imageUrl : data.imageUrl,
        available : data.available,
        category : data.category
      });
    }
  },[form ,data]);
  const mutation = useMutation ({
    mutationFn : async (data) => { 
      const res = await api.patch(`/products/${id}`, data)
    },
    onSuccess : () => { 
      message.success('Sua thanh cong');
      client.invalidateQueries({queryKey : ['products']});
      nav('/admin/products');
    }
  })
  const onFinish = (values) => {
    mutation.mutate(values);
  }
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  return (
    <>
      <Form
      form={form}
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
export default () => <ProductEdit />;
