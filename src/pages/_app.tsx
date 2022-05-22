import React from 'react'
import { QueryClient, QueryClientProvider} from "react-query";
import { AppProps } from 'next/dist/shared/lib/router/router'
import Navbar from 'components/navbar'
import '../styles/globals.css'

const queryClient = new QueryClient();

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Navbar />
      <Component {...pageProps} />
    </QueryClientProvider>

  )
}

