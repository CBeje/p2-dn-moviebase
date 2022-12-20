import Layout from "components/Layout";
import { Container, Progress } from "@chakra-ui/react";
import useSWR from "swr";
import Recommendations from "components/Recommendations";
export const SimilarMovies = () => {
  const { data } = useSWR(`/api/recommendations/recommendations`);
  if (!data) {
    return <Progress size="xs" isIndeterminate />;
  }

  return <Recommendations id={data.id} title={data.title} />;
};

export default function Watchlist() {
  return (
    <Layout title="Recommendations">
      <Container>
        <SimilarMovies />
      </Container>
    </Layout>
  );
}
