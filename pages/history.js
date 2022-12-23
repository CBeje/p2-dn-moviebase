import Layout from "components/Layout";
import useSWR from "swr";

import {
  Box,
  Badge,
  Button,
  Card,
  CardBody,
  Center,
  CircularProgress,
  Container,
  SimpleGrid,
  Heading,
  Image,
  Stack,
  LinkOverlay,
  LinkBox,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";
import HistoryButton from "components/HistoryButton";
import WatchlistButton from "components/WatchlistButton";

export const History = () => {
  const { data, error } = useSWR(`/api/history/history`);
  if (error) {
    return <Center h="full">Error</Center>;
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
      {data.movies.length > 0 ? (
        data.movies.map(({ id, title, release_date, poster_path }, index) => (
          <Stack spacing="2" direction="row" key={id}>
            <Card
              borderRadius="0"
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="elevated"
              w={(200, 500)}
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "100px" }}
                src={buildImageUrl(poster_path)}
                alt="Movie Poster"
              />

              <Stack>
                <CardBody>
                  <Heading as="h5" size="sm">
                    {title}{" "}
                    <Heading as="span" size="sm">
                      ({release_date?.substring(0, 4)})
                    </Heading>
                    <Stack direction="row" flexWrap="wrap" mb="4">
                      {data.genres?.map((genre) => (
                        <Badge key={genre.id}>{genre.name}</Badge>
                      ))}
                    </Stack>
                    <Stack direction="row">
                      <WatchlistButton MovieID={id} />
                      <HistoryButton MovieID={id} />
                    </Stack>
                  </Heading>
                  <Box mt="2">
                    Watched on: {data.history[index].date.substring(0, 10)}
                  </Box>
                  <Stack my="4">
                    <LinkBox>
                      <LinkOverlay href={`/movies/${id}`}>
                        <Button colorScheme="blue" size="md" width="150px">
                          Details
                        </Button>
                      </LinkOverlay>
                    </LinkBox>
                  </Stack>
                </CardBody>
              </Stack>
            </Card>
          </Stack>
        ))
      ) : (
        <Center h="full">
          <Heading as="h3" size="lg">
            {data.data}
          </Heading>
        </Center>
      )}
    </>
  );
};
export default function HistoryCollection() {
  return (
    <Layout title="History">
      <Container>
        <Heading as="h3" size="md" textAlign="left" my="5" color="#6897bb">
          History
        </Heading>
        <SimpleGrid columns={3} spacingX="20px" spacingY="20px">
          <History />
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
