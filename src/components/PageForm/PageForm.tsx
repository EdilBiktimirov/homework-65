import React, {FormEvent, useState} from 'react';
import {ApiPageType, PageType} from "../../types";
import axiosApi from "../../axiosApi";
import {useNavigate} from "react-router-dom";
import ReactQuill from 'react-quill';

const PageForm = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState<PageType>({
      title: '',
      content: '',
      name: '',
    }
  );


  const onInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPage(prev => ({
      ...prev,
      [name]: value,
    }));
  };


  const onQuillChange = (text: string) => {
    setPage(prev => ({
      ...prev,
      content: text,
    }));
  };


  const onSelectChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const {name, value} = e.target;

    setPage(prev => ({
      ...prev,
      [name]: value,
    }));

    try {
      const response = await axiosApi.get<ApiPageType | null>('/pages/' + value + '.json');
      const newPage = response.data

      if (newPage !== null) {
        setPage(prev => ({
          ...prev,
          title: newPage.title,
          content: newPage.content,
        }))
      }
    } finally {


    }
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await axiosApi.put('/pages/' + page.name.toLowerCase() + '.json', page);
    } finally {
      navigate('/pages/' + page.name);
    }
  };


  return (
    <form onSubmit={onFormSubmit}>
      <select
        className="form-select mb-2 w-75"
        id={"page"}
        name={"name"}
        value={page.name}
        onChange={onSelectChange}
      >
        <option disabled value=''>Select page</option>
        <option value="home">Home</option>
        <option value="info">Info</option>
        <option value="products">Products</option>
        <option value="contacts">Contacts</option>
        <option value="about">About</option>
      </select>

      <input
        className="form-control mb-2 w-75"
        name="title"
        type="text"
        value={page.title}
        placeholder={"Enter title:"}
        onChange={onInputChange}
      />

      <ReactQuill
        theme="snow"
        className="form-control mb-2 w-75"
        id="content"
        // name="content"
        value={page.content}
        placeholder={"Enter content:"}
        onChange={onQuillChange}
      />

      <button className="btn btn-success" type="submit">Save</button>
    </form>
  );
};

export default PageForm;