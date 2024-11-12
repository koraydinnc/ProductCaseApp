import { Col, Row } from 'antd'
import RatingTopProducts from '../components/RatingTopProducts'
import CategoryList from '../components/CategoryList'


const HomePage = () => {
  return (
    <Row>
     <Col xs={24} lg={24}>
       <RatingTopProducts />
     </Col> 
     <Col xs={12} lg={18}>
      
      <CategoryList/>
      </Col>
    </Row>
  )
}

export default HomePage
