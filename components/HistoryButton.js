import { CalendarIcon } from "@chakra-ui/icons";
import { IconButton, Tooltip } from "@chakra-ui/react";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import { fetcher } from "utils/api";

export default function HistoryButton({ MovieID }) {
  let { id } = useRouter().query;
  if (!id) {
    id = MovieID;
  }
  const { data } = useSWR(`/api/history/${id}`);
  const { mutate } = useSWRConfig();

  return (
    <Tooltip label={data?.found ? "Remove from history" : "Add to history"}>
      <IconButton
        isLoading={!data}
        colorScheme={data?.found ? "blue" : "gray"}
        size="sm"
        onClick={() => {
          mutate(`/api/history/${id}`, () =>
            fetcher(`/api/history/${id}`, {
              method: data.found ? "DELETE" : "PUT",
            }).then(() => mutate(`api/history/history`))
          );
          mutate(`/api/watchlist/${id}`, () =>
            fetcher(`/api/watchlist/${id}`, {
              method: "DELETE",
            })
          );
        }}
      >
        <CalendarIcon />
      </IconButton>
    </Tooltip>
  );
}
