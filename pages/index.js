import {
  VStack,
  Center,
  Box,
  Heading,
  CircularProgress,
  Container,
} from "@chakra-ui/react";
import { SearchBar, SearchResults } from "components/Search";
import Layout from "components/Layout";
import Carousel from "components/Carousel";
import useSWR from "swr";

export default function IndexPage() {
  const trending = useSWR("/api/trending/trending");
  const history = useSWR("/api/history/history");
  const watchlist = useSWR("/api/watchlist/watchlist");

  const trendingMovies = trending.data?.results;
  const watchlistMovies = watchlist.data;
  const historyMovies = history.data?.movies;

  if (!trendingMovies) {
    return (
      <Center h="full">
        <CircularProgress isIndeterminate />
      </Center>
    );
  }

  return (
    <>
      <Layout title="Moviebase">
        <Container>
          <VStack spacing={4} align="stretch" mb="5">
            <SearchBar />
          </VStack>
        </Container>
        <Container>
          <Heading as="h3" size="md" textAlign="left" mb="5" color="#6897bb">
            {trendingMovies && "Trending movies"}
          </Heading>
          <Carousel data={trendingMovies} slides={1} height={"auto"} />
        </Container>
        <Container my="2">
          {watchlistMovies?.length > 0 && (
            <Box p="0" m="0">
              <Heading
                as="h3"
                size="md"
                textAlign="left"
                my="5"
                color="#6897bb"
              >
                {watchlistMovies && "Watchlist"}
              </Heading>
              <Carousel data={watchlistMovies} genre={true} slides={3} />
            </Box>
          )}
        </Container>
        <Container my="2">
          {historyMovies?.length > 0 && (
            <Box p="0" m="0">
              <Heading
                as="h3"
                size="md"
                textAlign="left"
                my="5"
                color="#6897bb"
              >
                {historyMovies && "Watch again"}
              </Heading>
              <Carousel data={historyMovies} genre={true} slides={3} />
            </Box>
          )}
        </Container>
      </Layout>
    </>
  );
}
