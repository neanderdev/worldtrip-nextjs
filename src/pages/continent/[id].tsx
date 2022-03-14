import { GetStaticPaths, GetStaticProps } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router'
import { Flex, Spinner } from '@chakra-ui/react';

import Gallery from '../../components/Gallery';
import Header from '../../components/Header';
import Jumbotron from '../../components/Jumbotron';
import TextInfo from '../../components/TextInfo';

import db from '../../../db.json';

export interface Country {
    id: number;
    image: string;
    name: string;
    capital: string;
    flag: string;
}

interface ContinentProps {
    continent: {
        id: number;
        name: string;
        description: string;
        text: string;
        numberOfCountries: number;
        numberOfLanguages: number;
        jumbotronImage: string;
        carrouselImage: string;
        countries: Country[];
    },
}

export default function Continent({ continent }: ContinentProps) {
    const router = useRouter();

    if (router.isFallback) {
        return (
            <Flex
                align="center"
                justify="center"
                bg="rgba(245, 248, 250, .9)"
                position="fixed"
                top="0"
                right="0"
                w="100vw"
                h="100vh"
                zIndex="20"
            >
                <Spinner size="xl" color="yellow.400" />
            </Flex>
        );
    }

    return (
        <>
            <Head>
                <title>Worldtrip | {continent.name}</title>
            </Head>

            <Flex
                w="100%"
                alignItems="center"
                direction="column"
                justifyContent="center">

                <Header />

                {continent && <Jumbotron
                    image={continent.jumbotronImage}
                    name={continent.name}
                />}

                {continent && <TextInfo
                    text={continent.text}
                    numberOfCountries={continent.numberOfCountries}
                    numberOfLanguages={continent.numberOfLanguages}
                />}

                {continent && <Gallery countries={continent.countries} />}
            </Flex>
        </>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { continents } = db;

    const paths = continents.map(continent => {
        return {
            params: {
                id: `${continent.id}`,
            }
        };
    });

    return {
        paths: paths,
        fallback: true,
    }
};

export const getStaticProps: GetStaticProps = async context => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    const { id } = context.params;
    const { continents } = db;

    const continent = continents.find(continent => continent.id === Number(id));

    return {
        props: {
            continent
        },
        revalidate: 1800,
    }
}
