import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Divider, Flex, Heading } from '@chakra-ui/react';

import Banner from '../components/Banner';
import Carousel from '../components/Carousel';
import Header from '../components/Header';
import TravelTypes from '../components/TravelTypes';

import db from '../../db.json';

interface CountrieProps {
  id: number;
  name: string;
  flag: string;
  capital: string;
  image: string;
}
interface ContinentProps {
  id: number;
  name: string;
  description: string;
  text: string;
  numberOfCountries: number;
  numberOfLanguages: number;
  carrouselImage: string;
  jumbotronImage: string;
  countries: CountrieProps[];
}

interface HomeProps {
  continents: ContinentProps[];
};

export default function Home({ continents }: HomeProps) {
  return (
    <>
      <Head>
        <title>Worldtrip | Home</title>
      </Head>

      <Flex
        w="100%"
        alignItems="center"
        direction="column"
        justifyContent="center"
      >

        <Header />

        <Banner />

        <TravelTypes />

        <Divider as="hr" w={["60px", "90px"]} h='2px' bg="gray.700" />

        <Heading
          w="100%"
          textAlign="center"
          mt={["8", "16"]}
          mb={["4", "8"]}
          fontSize={["20px", "36px"]}
          color="gray.700"
          fontWeight="500"
        >
          Vamos nessa? <br />
          Então escolha seu continente
        </Heading>

        <Carousel continents={continents} />
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { continents } = db;

  return {
    props: {
      continents,
    }
  }
}