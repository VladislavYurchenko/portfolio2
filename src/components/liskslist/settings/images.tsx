import { ChangeEvent, FC, useState } from "react";
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import noImg from "./../../../static/img/no-img.png";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/splide.min.css";
import { ImageData } from "../../../types/LinksTypes";
import { useAction } from "../../../hooks/useAction";
const Images: FC = () => {
  const { currentLink } = useTypedSelector((state) => state.links);
  const { selectLink } = useAction();
  const [activePreview, setActivePreview] = useState(0);

  if (!currentLink) {
    return <div>link is't selected</div>;
  }

  function selectPreview(slider: any, index: number, prev: number, dest: number): void {
    setActivePreview(index);
    // console.log(slider.Components.Move.jump(3));
  }
  function deleteImage(index: number): void {
    if (currentLink) {
      currentLink.deletedFiles.push(currentLink.images[index].name);
      currentLink.images.splice(index, 1);
      console.log(currentLink);
      selectLink(currentLink);
    }
  }
  function pickFiles(e: ChangeEvent<HTMLInputElement>) {
    const inputRes: FileList | null = e.target.files;
    if (inputRes === null) return;
    const files = Array.from(inputRes);
    for (const file of files) {
      const source = "";
      const type = file.type;
      const url = URL.createObjectURL(file);
      currentLink?.images.push({ url, type, source, file } as ImageData);
    }

    selectLink(currentLink);
    // console.log(currentLink);
  }

  const MainImage: FC = () => {
    // console.log(currentLink.images);
    if (currentLink.images.length > 0) {
      return <img src={currentLink.images[0].url} alt="" />;
    }
    return <img src={noImg} alt="" />;
  };
  const Slider: FC = () => {
    return (
      <Splide
        options={{
          height: "100%",
          width: "100%",
          speed: 1000,
          type: "loop",
          pauseOnFocus: false,
          autoplay: false,
          arrows: false,
          pagination: false,
          gap: "5px",
          start: activePreview,
        }}
        onMoved={selectPreview}
      >
        {currentLink.images.map((image, index) => {
          return (
            <SplideSlide key={index}>
              <img src={image.url} alt="" />
            </SplideSlide>
          );
        })}
      </Splide>
    );
  };

  const Preview: FC<{ image: ImageData; index: number }> = ({ image, index }) => {
    return (
      <div className={"preview " + (index === activePreview ? "preview__active" : "")}>
        <img
          src={image.url}
          alt=""
          onClick={() => {
            setActivePreview(index);
          }}
        />
        <a href={image.url} target="_blank" className="preview__zoom" rel="noopener noreferrer nofollow">
          <button>
            <i className="icon-search"></i>
          </button>
        </a>
        <button
          className="preview__delete"
          onClick={() => {
            deleteImage(index);
          }}
        >
          <i className="icon-cancel"></i>
        </button>
      </div>
    );
  };

  return (
    <div className="settings-window__images-block">
      <input className="hidden" id="file" type="file" onChange={pickFiles} multiple accept="image/*" />
      <div className="view">{currentLink.images.length > 1 ? <Slider /> : <MainImage />}</div>
      <div className="previews">
        <label className="btn add-image-btn" htmlFor="file">
          <i className="icon-folder"></i>загрузить
        </label>
        <div className="previews__list">
          {currentLink.images?.map((image, index) => (
            <Preview image={image} key={index} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Images;
