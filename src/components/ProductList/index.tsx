import { useContext } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { CartContext } from '../../providers/CartContext/CartContext';

const ProductList = () => {
  const { productList } = useContext(CartContext);
  return (
    <StyledProductList>
      {productList.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          category={product.category}
          price={product.price}
          img={product.img}
          id={product.id}
        />
      ))}
    </StyledProductList>
  );
};

export default ProductList;
