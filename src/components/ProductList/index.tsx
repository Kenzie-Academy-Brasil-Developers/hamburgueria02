import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { StyledProductList } from './style';
import { api } from '../../services/api';

const ProductList = () => {
  const [productList, setProductList] = useState([]);
  useEffect(() => {
    async function loadProduct() {
      try {
        const response = await api.get('products');
        setProductList(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    loadProduct();
  }, []);

  return (
    <StyledProductList>
      <ProductCard />
    </StyledProductList>
  );
};

export default ProductList;
