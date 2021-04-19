import { AppProps } from 'next/app'
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react'
import { ApolloProvider } from '@apollo/client/react'
import { client } from '../graphql/apollo-client'

import '@/styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />;
      </ChakraProvider>
    </ApolloProvider>
  )
}
