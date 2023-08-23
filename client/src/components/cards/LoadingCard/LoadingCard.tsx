import React from 'react';
import { Card, Skeleton } from 'antd';

type Props = { length: number };

const LoadingCard: React.FC<Props> = ({ length }) => {
  const cards = Array.from({ length }, (_, i) => (
    <Card className="col-md-4" key={i}>
      <Skeleton active></Skeleton>
    </Card>
  ));

  return <div className="row pb-5">{cards}</div>;
};

export default LoadingCard;
