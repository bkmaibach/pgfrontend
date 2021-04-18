import { AppProps } from 'next/app'
import { ChakraProvider, theme, CSSReset } from '@chakra-ui/react'
import '@/styles/global.css'

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />;
    </ChakraProvider>
  )
}
