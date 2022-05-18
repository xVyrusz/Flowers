import Head from 'next/head';
import { useState } from 'react';

import { getData } from '../utils/fetchData';
import ProductItem from '../components/product/ProductItem';

const Home = (props) => {
  const [products, setProducts] = useState(props.products);

  return (
    <div>
      <Head>
        <title>Home Page</title>
      </Head>

      {
        products.length === 0
          ? <h2>No Products</h2>
          : products.map(product => (
            <ProductItem key={product.id} product={product} />
          ))
      }
    </div>
  );
}

export async function getServerSideProps() {
  const res = await getData('product');
  return {
    props: {
      products: res.products,
      result: res.result,
    } // will be passed to the page component as props
  }
}

export default Home;