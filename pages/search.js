import { SearchBar, SearchResults } from "components/Search";
import Layout from "components/Layout";
import { Container } from "@chakra-ui/react";

export default function Search() {
  return (
    <Layout title="Search" selected="/search">
      <Container>
        <SearchBar route="/search" />
        <SearchResults />
      </Container>
    </Layout>
  );
}
