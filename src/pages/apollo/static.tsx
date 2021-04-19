import Head from 'next/head'
import { Heading, Text, Flex, Box } from '@chakra-ui/react'
import { gql } from '@apollo/client'
import { client } from '../../graphql/apollo-client'
import styles from '../../styles/Home.module.css'
import { IUser } from '../../types'

export default function Home({ users }: { users: IUser[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Text fontSize='xl' mt='2'>
          These data were loaded at build time
        </Text>

        <Flex
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          maxW='800px'
          mt='10'
        >
          {users.map((user) => (
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

// This loads the data from the API to the next server ONCE at build time
export async function getStaticProps() {
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
