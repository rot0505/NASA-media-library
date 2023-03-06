import React, { useState, useEffect } from "react";
import { Form, Button, Input, DatePicker, Pagination } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import dayjs from "dayjs";

import SearchItem from "../SearchItem";
import styles from "./SearchPage.module.scss";
import { useSearchContext } from "../../contexts/SearchContext";
import { SearchResult } from "../../types";
import { validateMessages, searchValidator } from "../../utils/helper";
import { API_ENDPOINT } from "../../config";

const { RangePicker } = DatePicker;

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SearchPage: React.FC = () => {
  const [form] = Form.useForm();
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [noResult, setNoResult] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { searchState, setSearchState } = useSearchContext();
  // const [initialValues, setInitialValues] = useState<any>();
  const { query, yearRange: { startYear, endYear }, page, pageSize } = searchState;

  useEffect(() => {
    if (query !== "") handleSearch();
  }, [page, pageSize])

  const handleSearchState = (field: string, value: any) => {
    setSearchState((prev) => ({ ...prev, [field]: value }));
  }

  const handleQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleSearchState('query', e.target.value);
  };

  const handleYearChange = (_: any, dateString: any) => {
    handleSearchState('yearRange', { startYear: dateString[0], endYear: dateString[1] })
  }

  const handlePageSize = (_page: number, _pageSize: number) => {
    handleSearchState('page', _page);
    handleSearchState('pageSize', _pageSize);
  }

  const handleSearch = async () => {
    setLoading(true);
    setNoResult(false);
    try {
      const response = await axios.get(`${API_ENDPOINT}/search`, {
        params: {
          q: query,
          media_type: "image",
          year_start: startYear,
          year_end: endYear,
          page: page,
          page_size: pageSize,
        },
      });

      setTotal(response.data.collection.metadata.total_hits);
      const searchRes = await Promise.all(
        response.data.collection.items.map((item: any) => {
          const result = {
            nasaId: item.data[0].nasa_id,
            title: item.data[0].title,
            thumbnail: item.links[0].href,
            location: item.data[0].location,
            photographer: item.data[0].photographer,
          };
          return result;
        })
      );
      setSearchResults(searchRes);
      if (searchRes.length == 0) setNoResult(true)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    query: query,
    yearRange: [startYear ? dayjs(startYear) : null, endYear ? dayjs(endYear) : null]
  }

  return (
    <div className="container">
      <div className={styles.searchPage}>
        <Form
          {...layout}
          form={form}
          className={styles.searchForm}
          validateMessages={validateMessages}
          onFinish={handleSearch}
          initialValues={initialValues}
        >
          <Form.Item className={styles.searchInput} name="query" rules={[{ required: true }, searchValidator]}>
            <Input
              className={styles.searchInput}
              prefix={<SearchOutlined />}
              placeholder="Please insert any queries"
              onChange={handleQuery}
              value={query}
            />
          </Form.Item>
          <Form.Item name="yearRange" className={styles.yearRageContainer}>
            <RangePicker picker="year" onChange={handleYearChange} className={styles.yearRange} />
          </Form.Item>
          <div className={styles.formActions}>
            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SearchOutlined />} loading={loading}>
                Search
              </Button>
            </Form.Item>
          </div>
        </Form>
        <div className={styles.searchResult}>
          {searchResults.map((result: SearchResult, index) => (
            <div className={styles.searchItem} key={index} >
              <SearchItem item={result} />
            </div>
          ))}
          {noResult &&
            <div className={styles.noResult}>
              There is no result. Please check your search keyword again.
            </div>
          }
        </div>
        <div className={styles.pagination}>
          {total > pageSize &&
            <Pagination
              defaultCurrent={page}
              defaultPageSize={pageSize}
              pageSizeOptions={[8, 12, 24, 36]}
              total={total}
              onChange={handlePageSize}
            />
          }
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
