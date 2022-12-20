import Layout from "components/Layout";
import useSWR from "swr";

import {
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
  LinkBox,
  LinkOverlay,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";
import HistoryButton from "components/HistoryButton";
import WatchlistButton from "components/WatchlistButton";

export const Watchlist = () => {
  const { data, error } = useSWR(`/api/watchlist/watchlist`);
  if (error) {
    return <Center h="full">Error</Center>;
  }

  if (!data) {
    return (
      <Center>
        <CircularProgress isIndeterminate />
      </Center>
    );
  }
  return (
    <>
      {data.length > 0 ? (
        data.map(({ id, title, release_date, poster_path }) => (
          <Wrap spacing="2" direction="row">
            <Card
              borderRadius="0"
              direction={{ base: "column", sm: "row" }}
              key={id}
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
          </Wrap>
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
export default function WatchlistCollection() {
  return (
    <Layout title="Watchlist">
      <Container>
        <SimpleGrid columns={3} spacingX="20px" spacingY="20px">
          <Watchlist />
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
