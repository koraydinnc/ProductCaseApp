import { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/api/apiSlice';
import { Input, List, Spin, Avatar } from 'antd';
import VirtualList from 'rc-virtual-list';
import debounce from 'lodash/debounce';

const { Search } = Input;
const ContainerHeight = 400;

function InputProductList() {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');

  const debouncedSearch = debounce((value) => {
    setSearchText(value);
    setPage(1); 
  }, 300);

  const { data, error, isLoading } = useGetProductsQuery({ page, limit: 200 });

  useEffect(() => {
    if (data?.products) {
      setProducts((prevProducts) => ( data.products && [...prevProducts, ...data.products]));
    }
  }, [data, page]);

  const filteredProducts = searchText
    ? products.filter((product) => product.title.toLowerCase().includes(searchText.toLowerCase()))
    : products;

  const onSearch = (value) => {
    debouncedSearch(value);
  };

  const onInputChange = (e) => {
    debouncedSearch(e.target.value);
  };





  if (error) return <p>Bir hata oluştu: {error.message}</p>;

  return (
    <div style={{ position: 'relative' }}> 
      <Search
        placeholder="Ürün ara"
        allowClear
        size="large"
        onSearch={onSearch}
        onChange={onInputChange}
      />
      
      {searchText && (
        <div
          style={{
            position: 'absolute',
            top: '48px', 
            width: '100%',
            maxHeight: `${ContainerHeight}px`,
            backgroundColor: 'white',
            border: '1px solid #ddd',
            borderRadius: '4px',
            zIndex: 1000, 
          }}
        >
          <List>
            <VirtualList
              data={filteredProducts}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="id"
            >
              {(product) => (
                <List.Item key={product.id}>
                  <List.Item.Meta
                    avatar={<Avatar src={product.thumbnail} />}
                    title={product.title}
                    description={`Fiyat: ${product.price} $`}
                  />
                </List.Item>
              )}
            </VirtualList>
          </List>
        </div>
      )}

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '24px' }}>
          <Spin />
        </div>
      )}
    </div>
  );
}

export default InputProductList;
