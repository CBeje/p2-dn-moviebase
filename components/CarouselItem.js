import {
  Badge,
  Image,
  LinkOverlay,
  Stack,
  Heading,
  Text,
} from "@chakra-ui/react";

import { buildImageUrl } from "utils/api";
const CarouselItem = ({ movie, genre, rating }) => {
  return (
    <>
      <LinkOverlay
        href={`/movies/${movie.id || movie.data.id}`}
        passHref
        legacyBehavior
      >
        <Image
          objectFit="cover"
          objectPosition="center"
          maxHeight={550}
          w={{ base: "100%" }}
          src={buildImageUrl(
            movie.backdrop_path || movie.poster_path || movie.data.backdrop_path
          )}
          alt="Movie poster"
        />
        <Stack py="3" align="center">
          <Heading as="h4" size="md" my="1" mx="2" textAlign="center">
            {movie.title || movie.data.title}
          </Heading>
          {genre ? (
            <Stack direction="row" flexWrap="wrap" mb="4" my="2">
              {movie.genres?.map((genre) => (
                <Badge key={genre.id} p="1">
                  {genre.name}
                </Badge>
              ))}
            </Stack>
          ) : (
            <Text px="2" noOfLines={[1, 2, 3]}>
              {movie.overview}
            </Text>
          )}
        </Stack>
      </LinkOverlay>
    </>
  );
};

export default CarouselItem;
