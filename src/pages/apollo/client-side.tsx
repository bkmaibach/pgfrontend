import Head from 'next/head'
import { Heading, Text, Flex, Box } from '@chakra-ui/react'
import { gql, useQuery } from '@apollo/client'
import { client } from '../../graphql/apollo-client'
import { ClientOnly } from '../../graphql/client-only'
import styles from '../../styles/Home.module.css'
import { IUser } from '../../types'

export default function Home() {
  const { data, loading, error } = useQuery(gql`
    {
      users {
        id
        username
        email
        articlesCount
      }
    }
  `)

  if (loading) {
    return <h2>Loading...</h2>
  }

  if (error) {
    return <h2>{error}</h2>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <ClientOnly>
        <main className={styles.main}>
          <Text fontSize='xl' mt='2'>
            This data was loaded asynchronously on the front end.
          </Text>

          <Flex
            flexWrap='wrap'
            alignItems='center'
            justifyContent='center'
            maxW='800px'
            mt='10'
          >
            {data.slice(0, 4).users.map((user: IUser) => (
              <Box
                as='a'
                href={`http://localhost:3000/users/${user.id}`}
                p='6'
                m='4'
                borderWidth='1px'
                rounded='lg'
                flexBasis='45%'
              >
                <Heading as='h3' size='lg' mb='2'>
                  {user.username}
                </Heading>
                <Text fontSize='md'>Email: {user.email}</Text>
              </Box>
            ))}
          </Flex>
        </main>
      </ClientOnly>

      <footer className={styles.footer}>
        <a
          href='https://vercel.com?utm_source=typescript-nextjs-starter'
          target='_blank'
          rel='noopener noreferrer'
        >
          Powered by{' '}
          <img src='/vercel.svg' alt='Vercel Logo' className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}

// This one loads the data to next server from the API one page load
export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      {
        users {
          id
          username
          email
          articlesCount
        }
      }
    `,
  })

  return {
    props: {
      users: data.users.slice(0, 4),
    },
  }
}
