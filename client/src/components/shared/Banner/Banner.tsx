import { BannerWrapper } from './Banner.styles';

type Props = {
  message: string;
  color?: string;
  icon?: string;
  onClick?: () => void;
};

const Banner = ({ message, color, icon, onClick }: Props) => {
  return (
    <BannerWrapper color={color}>
      <div className="content-area">{message}</div>
      <div className="close-area">
        <button className="btn-plain" onClick={onClick}>
          <i className="la la-close" />
        </button>
      </div>
    </BannerWrapper>
  );
};

export default Banner;
