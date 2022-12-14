import React, {useCallback, useEffect, useState} from 'react';
import {ApiPageType} from "../../types";
import axiosApi from "../../axiosApi";
import {useParams} from "react-router-dom";
import Spinner from "../Spinner/Spinner";
import {AxiosError} from "axios";

const Page: React.FC = () => {
  const {category} = useParams();

  const [pages, setPages] = useState<ApiPageType | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchPages = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axiosApi.get<ApiPageType | null>('/pages/' + category + '.json');
      const apiPages = response.data;

      if (apiPages !== null) {
        setPages(apiPages);
      }

      if (!category) {
        const response = await axiosApi.get<ApiPageType | null>('/pages/home.json');
        const apiPages = response.data;

        if (apiPages !== null) {
          setPages(apiPages);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [category]);

  useEffect(() => {
    fetchPages().catch((e: AxiosError) => console.log(e.message));
  }, [fetchPages]);

  const parse = require('html-react-parser');

  let showPage = (
    pages && (
      <div className="container-fluid mt-2">
        <h3>{pages.title}</h3>
        {parse(pages.content)}
      </div>
    ));

  if (loading) {
    showPage = <Spinner/>
  }

  return (
    <>
      {showPage}
    </>
  );
};

export default Page;