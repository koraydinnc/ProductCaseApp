import { Col, Row, Menu } from 'antd';
import { HomeOutlined, ProductOutlined, ContactsOutlined } from '@ant-design/icons'; 
import logo from '../assets/Logo.png';
import InputProductList from './InputProductList';
import { useNavigate } from 'react-router';

const Navbar = () => {

  const navigate = useNavigate()

  return (
    <Row 
      justify="space-between" 
      align="middle" 
      className="p-4 bg-white shadow-md" 
    >
      <Col className='cursor-pointer'>
        <img  onClick={() => navigate('/')} src={logo} alt="Logo" className="h-12" />
      </Col>
      <Col span={12} >
        <InputProductList/>
      </Col>
      <Col span={6}>
        <Menu mode="horizontal" className="space-x-6">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            Home
          </Menu.Item>
          <Menu.Item key="products" icon={<ProductOutlined />}>
            Products
          </Menu.Item>
          <Menu.Item key="about" icon={<ContactsOutlined />}>
            About
          </Menu.Item>
        </Menu>
      </Col>
    </Row>
  );
};

export default Navbar;
