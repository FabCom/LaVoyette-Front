import React from 'react'
import { QueryClient, QueryClientProvider} from "react-query";
import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from 'next/dist/shared/lib/router/router'
import Navbar from 'components/navbar'
import '../styles/globals.css'
import theme from 'styles/theme';

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </QueryClientProvider>

  )
}

