import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { ImageData, LinkData } from "../../../types/LinksTypes";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import noImg from "./../../../static/img/no-img.png";

import "@splidejs/splide/dist/css/splide.min.css";
import { useAction } from "../../../hooks/useAction";
import { LinkSettingsContext } from "..";
import "./link.scss";
import deepcopy from "deepcopy";
interface ImagesProps {
  images: ImageData[];
}
interface imageProps {
  image: ImageData;
}
const Link1: FC<LinkData> = ({ id, user, name, url, images, deletedFiles }) => {
  const ctx = useContext(LinkSettingsContext);
  const { selectLink } = useAction();
  const Image: FC<imageProps> = ({ image }) => {
    if (!image) {
      return <img src={noImg} alt="" />;
    }
    return <img src={image.url} alt="" />;
  };

  const Slider: FC<ImagesProps> = ({ images }) => {
    return (
      <Splide
        options={{
          height: "100%",
          speed: 1000,
          type: "loop",
          pauseOnFocus: false,
          autoplay: true,
          arrows: false,
          pagination: false,
          gap: "5px",
        }}
      >
        {images.map((image, index) => {
          return (
            <SplideSlide key={index}>
              <img src={image.url} alt="" />
            </SplideSlide>
          );
        })}
      </Splide>
    );
  };

  return (
    <div className="link">
      <Link to={{ pathname: url }} target="_blank" className="link__img" rel="noopener noreferrer nofollow">
        {images.length > 1 ? <Slider images={images} /> : <Image image={images[0]} />}
      </Link>
      <Link to={{ pathname: url }} target="_blank" className="link__name" rel="noopener noreferrer nofollow">
        {name}
      </Link>
      <i
        className="icon-cog link__settings-btn"
        onClick={() => {
          ctx?.toggleWindow();
          const link = deepcopy({ id, user, name, url, images, deletedFiles } as LinkData);
          selectLink(link);
        }}
      ></i>
    </div>
  );
};

export default Link1;
