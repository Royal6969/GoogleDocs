import 'tailwindcss/tailwind.css'; // npx create-next-app -e with-tailwindcss google-docs
import '@material-tailwind/react/tailwind.css'; // npm i -E @material-tailwind/react
import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Material Icons Link */}
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
