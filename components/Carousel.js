import { Card, Center, CircularProgress } from "@chakra-ui/react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import CarouselItem from "./CarouselItem";

const Carousel = ({ data, genre, rating, slides, height }) => {
  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <>
      <Center>
        <Splide
          options={{
            pagination: false,
            rewind: true,
            perPage: slides,
            width: "65vw",
            height: "auto",
            gap: "1rem",
          }}
        >
          {data?.filter(Boolean).map((movie) => (
            <SplideSlide key={movie.id || movie.data.id}>
              <Card w="100%" h="100%" cursor="pointer" borderRadius="0">
                <CarouselItem movie={movie} genre={genre} rating={rating} />
              </Card>
            </SplideSlide>
          ))}
        </Splide>
      </Center>
    </>
  );
};

export default Carousel;
