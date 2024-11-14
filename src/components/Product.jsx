import React from 'react';
import { Carousel, Rate, Tag, Divider, Descriptions, Button, Spin } from 'antd';

const Product = ({ product }) => {

  console.log(product)

  if (!product) return <Spin fullscreen/>;


   const {
    title,
    description,
    price,
    rating,
    stock,
    category,
    brand,
    discountPercentage,
    tags,
    images,
    dimensions,
    weight,
    warrantyInformation,
    shippingInformation,
    reviews,
    availabilityStatus,
    returnPolicy,
  } = product[0];

  console.log(title)

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg mt-8">
      <Carousel autoplay>
        {images?.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Product image ${index + 1}`}
              className="w-full h-64 object-contain  rounded-lg"
            />
          </div>
        ))}
      </Carousel>

      <div className="mt-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="text-gray-500 text-sm mb-2">{category} | {brand}</p>
        <Rate disabled defaultValue={rating} />
        <p className="text-gray-800 text-lg font-semibold mt-4">
          {price} TL <span className="text-sm text-red-500">- {discountPercentage}% Off</span>
        </p>
        <p className="text-gray-500 mt-2">{description}</p>
        
        <div className="flex items-center gap-2 mt-4">
          <Tag color={availabilityStatus === 'In Stock' ? 'green' : 'red'}>
            {availabilityStatus}
          </Tag>
          {tags?.map((tag) => (
            <Tag key={tag} color="blue">
              {tag}
            </Tag>
          ))}
        </div>
        <Descriptions bordered column={1} size="small" className="mt-6">
          <Descriptions.Item label="Dimensions">
            {dimensions ? `${dimensions.width} x ${dimensions.height} x ${dimensions.depth} cm` : 'N/A'}
          </Descriptions.Item>
          <Descriptions.Item label="Weight">{weight} kg</Descriptions.Item>
          <Descriptions.Item label="Warranty">{warrantyInformation}</Descriptions.Item>
          <Descriptions.Item label="Shipping">{shippingInformation}</Descriptions.Item>
          <Descriptions.Item label="Return Policy">{returnPolicy}</Descriptions.Item>
        </Descriptions>

        <Button type="primary" block className="mt-6">
          Add to Cart
        </Button>
      </div>

      <Divider />

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Customer Reviews</h3>
        {reviews?.length ? (
          reviews.map((review, index) => (
            <div key={index} className="mb-4">
              <Rate disabled defaultValue={review.rating} className="mr-2" />
              <p className="text-gray-700">{review.comment}</p>
              <p className="text-gray-500 text-sm">- {review.author}</p>
              <Divider />
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available</p>
        )}
      </div>
    </div>
  );
};

export default Product;
