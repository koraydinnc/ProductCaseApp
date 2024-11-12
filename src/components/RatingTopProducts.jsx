import { Carousel, Card, Row, Col } from 'antd';
import { useGetProductsQuery } from '../store/api/apiSlice';

const { Meta } = Card;

const RatingTopProducts = () => {
  const { data, isLoading, isError } = useGetProductsQuery({ limit: 200 });

  const topRatedProducts = data && data.products ? data.products.filter(product => product.rating >= 4.5) : [];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products.</div>;
  }

  const groupedProducts = [];
  for (let i = 0; i < topRatedProducts.length; i += 4) {
    groupedProducts.push(topRatedProducts.slice(i, i + 4));
  }

  return (
    <Carousel arrows infinite={true} dots={true} autoplay>
      {groupedProducts.map((group, index) => (
        <div key={index}>
          <Row gutter={24} justify="center" style={{ padding: '40px' }}>
            {group.map((product) => (
              <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
                <Card
                  hoverable
                  style={{
                    height:'100%',
                    width: '100%',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    marginBottom: '10px',
                  }}
                  cover={<img alt={product.title} src={product.thumbnail} style={{ height: '200px', objectFit: 'contain' }} />}
                >
                  <Meta title={product.title}  />
                  <div style={{ textAlign: 'center', marginTop: '10px', color: '#084736', fontWeight: 'bold' }}>
                    Rating: {product.rating}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      ))}
    </Carousel>
  );
};

export default RatingTopProducts;
