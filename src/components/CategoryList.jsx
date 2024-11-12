import { useGetProductsQuery } from '../store/api/apiSlice';
import {  Select } from 'antd';


const { Option } = Select;

const CategoryList = () => {
  const { data } = useGetProductsQuery({ limit: 200 });

  const category = data?.products?.map((item) => item.category) || [];
  const categoryArray = [...new Set(category.flat())];

  return (
    <div>
      <Select 
        style={{ width: '200px' }}
        placeholder="Category"
        showSearch
        optionFilterProp="children"
      >
        {categoryArray.map((category, index) => (
          <Option key={index} value={category}>{category}</Option>
        ))}
      </Select>


    </div>
  );
};

export default CategoryList;
