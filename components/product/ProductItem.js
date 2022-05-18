/* eslint-disable @next/next/no-img-element */
const ProductItem = ({ product }) => {

  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={product.images[0].url} alt={product.images[0].url} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title" title={product.tittle} >
          {product.tittle}
        </h5>
        <div className="row justify-content-between">
          <h6 className="text-danger">${product.price}</h6>
          {
            product.inStock > 0
            ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
            : <h6 className="text-danger">Out Stock</h6>
          }
        </div>
        <p className="card-text" title={product.description}>
          {product.description}
        </p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
    </div>
  );
};

export default ProductItem;