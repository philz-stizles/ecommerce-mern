import StarRating from 'react-star-ratings';

type Props = {
  starClick: (clicks: number) => void;
  numberOfStars: number;
};
const Star = ({ starClick, numberOfStars }: Props) => (
  <>
    <StarRating
      changeRating={() => starClick(numberOfStars)}
      numberOfStars={numberOfStars}
      starDimension="20px"
      starSpacing="2px"
      starHoverColor="red"
      starEmptyColor="red"
    />
    <br />
  </>
);

export default Star;
