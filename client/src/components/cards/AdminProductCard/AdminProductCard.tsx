import React from "react";
import { Card } from "antd";
import laptop from "../../../images/laptop.png";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Product } from './../../../types'

const { Meta } = Card;

type Props = {
  product: Product,
  handleRemove: (slug: string) => void
}

const AdminProductCard: React.FC<Props> = ({ product, handleRemove }) => {
  const { title, description, images, slug } = product;

  return (
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : laptop}
          alt=""
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1" />
      }
      actions={[
        <Link to={`/admin/products/update/${slug}`}><EditOutlined className="text-warning" /></Link>,
        <DeleteOutlined onClick={() => handleRemove(slug)} className="text-danger" />,
      ]}>
      <Meta title={title} description={`${description && description.substring(0, 40)}...`}/>
    </Card>
  );
};

export default AdminProductCard;
