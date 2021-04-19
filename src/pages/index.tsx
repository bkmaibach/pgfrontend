import Head from 'next/head'
import { Heading, Link, Text, Code, Flex, Box } from '@chakra-ui/react'
import { gql } from '@apollo/client'
import { client } from '../graphql/apollo-client'
import styles from '../styles/Home.module.css'
import { IUser } from '../types'

export default function Home({ users }: { users: IUser[] }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className={styles.main}>
        <Heading as='h1' size='3xl' mb='2'>
          Welcome to{' '}
          <Link color='teal.500' href='https://nextjs.org'>
            Next.js!
          </Link>
        </Heading>

        <Text fontSize='xl' mt='2'>
          Get started by editing <Code>pages/index.js</Code>
        </Text>

        <p className={styles.description}>This is not an official starter!</p>

        <Flex
          flexWrap='wrap'
          alignItems='center'
          justifyContent='center'
          maxW='800px'
          mt='10'
        >
          <Box
            as='a'
            href='https://nextjs.org/docs'
            p='6'
            m='4'
            borderWidth='1px'
            rounded='lg'
            flexBasis='45%'
          >
            <Heading as='h3' size='lg' mb='2'>
              Documentation &rarr;
            </Heading>
            <Text fontSize='lg'>
              Find in-depth information about Next.js features and API.
            </Text>
          </Box>

          <Box
            as='a'
            href='https://nextjs.org/learn'
            p='6'
            m='4'
            borderWidth='1px'
            rounded='lg'
            flexBasis='45%'
          >
            <Heading as='h3' size='lg' mb='2'>
              Learn &rarr;
            </Heading>
            <Text fontSize='lg'>
              Learn about Next.js in an interactive course with quizzes!
            </Text>
          </Box>

          <Box
            as='a'
            href='https://github.com/vercel/next.js/tree/master/examples'
            p='6'
            m='4'
            borderWidth='1px'
            rounded='lg'
            flexBasis='45%'
          >
            <Heading as='h3' size='lg' mb='2'>
              Examples &rarr;
            </Heading>
            <Text fontSize='lg'>
              Discover and deploy boilerplate example Next.js projects.
            </Text>
          </Box>

          <Box
            as='a'
            href='https://vercel.com/new?utm_source=typescript-nextjs-starter'
            p='6'
            m='4'
            borderWidth='1px'
            rounded='lg'
            flexBasis='45%'
          >
            <Heading as='h3' size='lg' mb='2'>
              Deploy &rarr;
            </Heading>
            <Text fontSize='lg'>
              {' '}
              Instantly deploy your Next.js site to a public URL with Vercel.
            </Text>
          </Box>

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
