import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Form,
} from 'antd';
import { observer } from 'mobx-react';
import { Redirect } from 'react-router-dom';

export const Library = observer((props) => {
  const { library, match } = props;
  const [libraryData, setLibrary] = useState({});

  if (library.regionLibraries.length === 0) {
    return (<Redirect to="/main/home" />);
  }

  useEffect(() => {
    if (match.params.id && library.regionLibraries.length !== 0) {
      const lib = library.libraryData(match.params.id);
      setLibrary(lib.data);
    }
  }, [match.params.id, library.regionLibraries.length]);

  const { source = {} } = libraryData;

  const {
    address = '',
    email = '',
    phone = '',
    director = '',
    adesc = '',
    adescfull = '',
  } = source;

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
        initialValues={{
          size: 'default',
        }}
        size="default"
      >
        <Form.Item label="Address">
          {address}
        </Form.Item>
        <Form.Item label="Email">
          {email}
        </Form.Item>
        <Form.Item label="Phone">
          {phone}
        </Form.Item>
        <Form.Item label="Director">
          {director}
        </Form.Item>
        <Form.Item label="Краткое Описание">
          {adesc}
        </Form.Item>
        <Form.Item label="Полное описание">
          {adescfull}
        </Form.Item>
      </Form>
    </>
  );
});
