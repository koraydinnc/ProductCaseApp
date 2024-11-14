import { useParams } from 'react-router'
import { useGetProductsQuery } from '../store/api/apiSlice'
import { Spin } from 'antd'
import Product from '../components/Product'

const ProductPage = () => {

  const {id} = useParams()

 const {data, isLoading, error } = useGetProductsQuery({limit:200})

 if (isLoading) return <Spin/>
 if (error) return <div>Product Not Found</div>

 const selectedProduct = data && data.products.filter((item) => item.id === Number(id))


  console.log(selectedProduct)

  return (
    <div>
       <Product product={selectedProduct}/>
    </div>
  )
}

export default ProductPage
