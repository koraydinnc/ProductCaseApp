import React, { useState, useEffect } from 'react';
import { useGetProductsQuery } from '../store/api/apiSlice';
import { Pagination, Rate, Select, Slider, Checkbox } from 'antd';
import { useNavigate } from 'react-router';

const { Option } = Select;

const ProductsTable = () => {
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [rating, setRating] = useState(0);
  const [inStock, setInStock] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const { data, isLoading, error } = useGetProductsQuery({
    limit: 20, 
    page,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data?.products) {
      let filtered = data.products;

      if (category) {
        filtered = filtered.filter((product) => product.category === category);
      }

      filtered = filtered.filter(
        (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
      );

      if (rating) {
        filtered = filtered.filter((product) => product.rating >= rating);
      }

      if (inStock) {
        filtered = filtered.filter((product) => product.availabilityStatus === 'In Stock');
      }

      setFilteredProducts(filtered);
    }
  }, [data, category, priceRange, rating, inStock]);

  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleNavigate = (id) => {
    navigate(`Product/${id}`);
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleInStockChange = (e) => {
    setInStock(e.target.checked);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Something went wrong. Please try again.</p>;

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="mb-8">
          <h3 className="text-lg font-semibold">Filtreler</h3>

          <div className="mb-4">
            <Select
              style={{ width: 200 }}
              placeholder="Kategori Seçin"
              onChange={handleCategoryChange}
            >
              <Option value="">Tüm Kategoriler</Option>
              <Option value="beauty">Güzellik</Option>
              <Option value="furniture">Mobilya</Option>
              <Option value="groceries">Market</Option>
              <Option value="electronics">Elektronik</Option>
            </Select>
          </div>

          <div className="mb-4">
            <h4 className="text-sm">Fiyat Aralığı</h4>
            <Slider
              range
              min={0}
              max={1000}
              step={10}
              defaultValue={priceRange}
              onChange={handlePriceChange}
              tipFormatter={(value) => `${value} TL`}
            />
          </div>

          <div className="mb-4">
            <h4 className="text-sm">Rating</h4>
            <Rate
              allowClear
              onChange={handleRatingChange}
              value={rating}
            />
          </div>

          <div className="mb-4">
            <Checkbox checked={inStock} onChange={handleInStockChange}>
              Sadece stokta olanlar
            </Checkbox>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <a key={product.id} onClick={() => handleNavigate(product.id)} className="group">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                <img
                  src={product.thumbnail}
                  alt={product.description}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
              <Rate disabled defaultValue={product.rating} />
              <p className="mt-1 text-lg font-medium text-gray-900">{product.price} TL</p>
            </a>
          ))}
        </div>

        <Pagination
          className="my-12"
          align="end"
          current={page}
          total={data?.total || 0} 
          pageSize={20}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default ProductsTable;
