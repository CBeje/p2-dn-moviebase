import Head from "next/head";
import Link from "next/link";
import {
  Box,
  Heading,
  Image,
  Button,
  Container,
  useDisclosure,
  HStack,
  Stack,
  Spacer,
  Text,
  VStack,
  Grid,
  Center,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const MenuItem = ({ href, children, ...props }) => (
  <Link href={href} passHref legacyBehavior>
    <Button as="a" variant="link" {...props}>
      {children}
    </Button>
  </Link>
);

function Header() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Box bg="#6897BB">
      <Container>
        <Stack
          as="nav"
          direction={["column", , "row"]}
          justify="space-between"
          wrap="wrap"
          py="1.5rem"
        >
          <HStack justify="space-between">
            <Link href="/">
              <Heading id="appTitle" size="lg" mr={8}>
                Moviebase
              </Heading>
            </Link>

            <Box display={["block", , "none"]} onClick={onToggle}>
              <Button variant="outline">
                <HamburgerIcon />
              </Button>
            </Box>
          </HStack>

          <Stack
            direction={["column", , "row"]}
            justify="start"
            align={["start", , "center"]}
            display={[isOpen ? "flex" : "none", , "flex"]}
            spacing={4}
          >
            <MenuItem href="/search">Search</MenuItem>
            <MenuItem href="/watchlist">Watchlist</MenuItem>
            <MenuItem href="/history">History</MenuItem>
          </Stack>

          <Spacer />

          <Box display={[isOpen ? "block" : "none", , "block"]}>
            <MenuItem href="/recommendations" variant="outline">
              Recommendations
            </MenuItem>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

export default function Layout({ title, children }) {
  return (
    <>
      <Head>
        {title && <title>{title}</title>}
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Grid minH="100vh">
        <VStack w="full" align="stretch" spacing={8}>
          <Header />
          <Box as="main" h="full">
            {children}
          </Box>
        </VStack>
      </Grid>
      <Box align="center" w="full" my="5">
        <Image maxHeight="15px" src="TMDB_Logo.svg"></Image>
        <Text>
          This product uses the TMDB API but is not endorsed or certified by
          TMDB.
        </Text>
      </Box>
    </>
  );
}
