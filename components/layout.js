import Head from 'next/head'


export default function Layout({children, home}) {
  return (
    <>
      <Head>
        <meta 
          name="description" 
          content="Store your ingredients and recipes nutrition values so you can stop worring about them"
        />
      </Head>
    </>
  )
}
