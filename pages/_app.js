import { ChakraProvider } from "@chakra-ui/react";
import theme from "utils/theme";
import "public/style.css";
import { SWRConfig } from "swr";
import { swrOptions } from "utils/api";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <SWRConfig value={swrOptions}>
        <Component {...pageProps} />
      </SWRConfig>
    </ChakraProvider>
  );
}

export default MyApp;
