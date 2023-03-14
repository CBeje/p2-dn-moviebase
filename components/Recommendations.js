import {
  Badge,
  Card,
  CardBody,
  Center,
  CircularProgress,
  Heading,
  Image,
  LinkOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";
import React from "react";
import useSWR from "swr";
import { buildImageUrl } from "utils/api";
import Link from "next/link";

const Recommendations = ({ id }) => {
  const { data, error } = useSWR(id && `/api/recommendations/${id}`);

  if (error) {
    return <Text color="red">Error</Text>;
  }

  if (!data) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <>
      {data.results.length > 0 ? (
        <Heading as="h3" size="lg" py="3">
          Movies you might like:
        </Heading>
      ) : (
        <Heading as="h3" size="lg" py="3">
          Recommendations:
        </Heading>
      )}
      <Stack spacing="4">
        {data.results.length > 0 ? (
          data.results.map((item) => (
            <Card
              borderRadius="0"
              direction={{ base: "column", sm: "row" }}
              key={item.id}
              overflow="hidden"
              variant="elevated"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={buildImageUrl(item.poster_path)}
                alt="Movie Poster"
              />
              <Stack>
                <Link href={`/movies/${item.id}`} passHref legacyBehavior>
                  <LinkOverlay>
                    <CardBody>
                      <Heading size="md">
                        {item.title}{" "}
                        <Heading as="span" size="sm">
                          ({item.release_date?.substring(0, 4)})
                        </Heading>
                      </Heading>
                      <Text as="span">Rating: </Text>
                      <Badge>
                        {Math.round(item.vote_average * 10) / 10}/10
                      </Badge>
                      <Text py="2">{item.overview}</Text>
                    </CardBody>
                  </LinkOverlay>
                </Link>
              </Stack>
            </Card>
          ))
        ) : (
          <Heading>Please add some movies to your history list</Heading>
        )}
      </Stack>
    </>
  );
};

export default Recommendations;
