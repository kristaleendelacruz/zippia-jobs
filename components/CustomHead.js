import Head from "next/head";

const CustomHead = ({title, description}) => {
  return <Head>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="icon" href="/favicon.ico" />
  </Head>
}

export default CustomHead;