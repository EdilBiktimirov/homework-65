import React, {FormEvent, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axiosApi from "../../axiosApi";
import slugify from "react-slugify";
import ReactQuill from 'react-quill';
import type {ApiPageType, PageType} from "../../types";

interface Props {
  isEdit?: boolean;
  pages: string[];
}

const PageForm: React.FC<Props> = ({isEdit, pages}) => {
  const navigate = useNavigate();

  const [page, setPage] = useState<PageType>({
    title: '',
    content: '',
    name: '',
  });

  const onSlugChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;

    setPage(prev => ({
      ...prev,
      [name]: slugify(value),
    }));
  };

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

    if (isEdit) {
      try {
        const response = await axiosApi.get<ApiPageType | null>('/pages/' + value + '.json');
        const newPage = response.data;

        if (newPage !== null) {
          setPage(prev => ({
            ...prev,
            title: newPage.title,
            content: newPage.content,
          }));
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (isEdit) {
      try {
        await axiosApi.put('/pages/' + page.name.toLowerCase() + '.json', page);
        navigate('/pages/' + page.name);
      } catch (e) {
        console.log(e)
      }
    } else {
      try {
        await axiosApi.put('/pages/' + page.name + '.json', page);
        navigate('/pages/' + page.name);
      } catch (e) {
        console.log(e)
      }
    }
  };

  let select = (
    <select
      className="form-select my-2 w-75"
      id={"page"}
      name={"name"}
      value={page.name}
      onChange={onSelectChange}
    >
      <option disabled value=''>Select page</option>
      {pages.map((elem) => (
        <option value={elem} key={Math.random()}>{elem}</option>
      ))}
    </select>
  );

  let input = (
    <input
      className="form-control my-2 w-75"
      name="name"
      type="text"
      value={page.name}
      placeholder={"Enter category:"}
      onChange={onSlugChange}
    />
  );

  return (
    <form onSubmit={onFormSubmit} className="container-fluid mt-2">
      {isEdit ? <h3>Edit page:</h3> : <h3>Add page:</h3>}
      {isEdit ? select : input}
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
        id="content"
        style={{height: '150px'}}
        value={page.content}
        placeholder={"Enter content:"}
        onChange={onQuillChange}
      />
      <button className="btn btn-success mt-5" type="submit">Save</button>
    </form>
  );
};

export default PageForm;