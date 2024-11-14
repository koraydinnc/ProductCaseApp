import { Col, Row } from 'antd'
import RatingTopProducts from '../components/RatingTopProducts'
import ProductsTable from '../components/ProductsTable'


const HomePage = () => {
  return (
    <Row>
     <Col xs={24} lg={24}>
       <RatingTopProducts />
     </Col> 
     
      <Col xs={24} lg={24}>
        <ProductsTable/>
      </Col>
    </Row>
  )
}

export default HomePage
