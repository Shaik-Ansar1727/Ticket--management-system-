import { useEffect, useState } from "react";
import styled from "styled-components";
import slide1 from "../assets/slide1.png";
import slide2 from "../assets/slide2.webp";
import slide3 from "../assets/slide3.png";
import slide4 from "../assets/slide4.png";
const SliderWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;

  animation: fade 0.6s ease;

  @keyframes fade {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const images = [
  slide1,
  slide2,
  slide3,
  slide4
];

const ImageSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <SliderWrapper>
      <Slide
        key={index}
        style={{ backgroundImage: `url(${images[index]})` }}
      />
    </SliderWrapper>
  );
};

export default ImageSlider;
