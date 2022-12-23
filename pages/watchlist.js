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
} from "@chakra-ui/react";
import { buildImageUrl } from "utils/api";
import HistoryButton from "components/HistoryButton";
import WatchlistButton from "components/WatchlistButton";

export const Watchlist = () => {
  //let dateAdded = new Date().toLocaleDateString();
  const { data, error } = useSWR(`/api/watchlist/watchlist`);
  if (error) {
    return <Center h="full">{JSON.stringify(error)}</Center>;
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
        data.map(({ id, title, release_date, poster_path, genres }) => (
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
                    <Stack direction="row" flexWrap="wrap" my="2">
                      {genres?.map((genre) => (
                        <Badge key={genre.id}>{genre.name}</Badge>
                      ))}
                    </Stack>
                    <Stack direction="row">
                      <WatchlistButton MovieID={id} />
                      <HistoryButton MovieID={id} />
                    </Stack>
                  </Heading>
                  <Stack my="4">
                    <LinkBox width="150px">
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
export default function WatchlistCollection() {
  return (
    <Layout title="Watchlist">
      <Container>
        <Heading as="h3" size="md" textAlign="left" my="5" color="#6897bb">
          Watchlist
        </Heading>
        <SimpleGrid columns={[1, 2, 3]} spacingX="20px" spacingY="20px">
          <Watchlist />
        </SimpleGrid>
      </Container>
    </Layout>
  );
}
