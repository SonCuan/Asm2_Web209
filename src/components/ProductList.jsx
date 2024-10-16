import React from 'react';
import { message, Popconfirm, Space, Table, Tag, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from './../servies/axios';

const ProductList = () =>{
  const nav = useNavigate() ; 
  const queryClient = useQueryClient();
  const {data , error} = useQuery({
    queryKey : ['products'],
    queryFn : async () =>{
      const res = await api.get('/products');
      return res.data;
    } 
  })
  const {mutate} = useMutation({
    mutationFn : async (id) => { 
     await api.delete(`/products/${id}`);
    },
    onSuccess : () => { 
      message.success('Xoa thanh cong');
      queryClient.invalidateQueries({queryKey : ['products']});
    },
  })
  const handleEdit = (id) => { 
    nav(`/admin/products/${id}/update`);
  }
  const columns = [
    {
      title: 'Ten san pham',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'ImageUrl',
      dataIndex: 'imageUrl',
      key: 'imageUrl',
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, item ) => (
        <div>
          <Popconfirm
          title = "Ban co muon xoa khong"
          onConfirm={() => mutate(item.id)}
          onText = "Xoa"      
          cancelText = "Khong"
          > 
          <Button type='primary'>Xoa</Button>
          </Popconfirm>
          <Button type='primary' onClick={() => handleEdit(item.id)}>Edit </Button>
        </div>
      ),
    },
  ];
  return ( 
    <Table columns={columns} dataSource={data} rowKey='id' />
  )
};
export default ProductList;