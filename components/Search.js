import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { buildImageUrl } from "utils/api";
import useSWR from "swr";
import {
  Input,
  Image,
  IconButton,
  LinkOverlay,
  Heading,
  Progress,
  Text,
  InputGroup,
  InputRightElement,
  Badge,
  Card,
  CardBody,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export function SearchBar() {
  const router = useRouter();
  const { terms } = router.query;
  const [text, setText] = useState("");

  // Update text input when route changes (ex when user goes back/forward)
  useEffect(() => {
    setText(terms || "");
  }, [terms]);

  // Update router history if a search was performed
  const handleSearch = (event) => {
    event.preventDefault();
    if (text !== terms) {
      router.push(`/search/?terms=${text}`, undefined, { shallow: true });
    }
  };

  return (
    <InputGroup as="form" onSubmit={handleSearch} mb="5">
      <Input
        placeholder="Search for a movie..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <InputRightElement>
        <IconButton
          aria-label="Search for a movie"
          icon={<SearchIcon />}
          type="submit"
        />
      </InputRightElement>
    </InputGroup>
  );
}
export function SearchResults() {
  const { terms } = useRouter().query;
  const { data, error } = useSWR(terms && `/api/search?terms=${terms}`);

  if (!terms) {
    return <Text>Type some terms and submit for a quick search</Text>;
  }
  if (error) {
    return (
      <Text color="red">
        Error fetching movies for {terms}: {JSON.stringify(error)}
      </Text>
    );
  }
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }
  if (!data.results.length) {
    return <Text>No results</Text>;
  }

  return (
    <Stack spacing="4">
      {data.results.map(
        ({ id, title, overview, release_date, poster_path, vote_average }) => (
          <Stack key={id}>
            <Card
              direction={{ base: "column", sm: "row" }}
              overflow="hidden"
              variant="elevated"
            >
              <Image
                objectFit="cover"
                maxW={{ base: "100%", sm: "200px" }}
                src={buildImageUrl(poster_path)}
                alt="Movie Poster"
              />

              <Stack>
                <LinkOverlay href={`/movies/${id}`}>
                  <CardBody>
                    <Heading size="md">
                      {title}{" "}
                      <Heading as="span" size="sm">
                        ({release_date?.substring(0, 4)})
                      </Heading>
                    </Heading>
                    <Text as="span">Rating: </Text>
                    <Badge>{vote_average}/10</Badge>
                    <Text py="2">{overview}</Text>
                  </CardBody>
                </LinkOverlay>
              </Stack>
            </Card>
          </Stack>
        )
      )}
    </Stack>
  );
}
