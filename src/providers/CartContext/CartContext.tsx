import { createContext, useEffect, useState, ReactNode } from 'react';
import toast from 'react-hot-toast';
import { api } from '../../services/api';

export interface ICartProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  img: string;
}

interface ICartContext {
  productList: ICartProduct[];
  cartList: ICartProduct[];
  addProductToCart: (cartProduct: ICartProduct) => void;
  removeProductFromCart: (productId: string) => void;
  removeAllProductFromCart: () => void;
}

export const CartContext = createContext<ICartContext>({} as ICartContext);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [productList, setProductList] = useState<ICartProduct[]>([]);
  useEffect(() => {
    async function loadProduct() {
      const token = localStorage.getItem('@TOKEN');

      if (token) {
        try {
          const response = await api.get<ICartProduct[]>('/products', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setProductList(response.data);
        } catch (error) {
          toast.error('Falhou');
        }
      }
    }
    loadProduct();
  }, []);

  const [cartList, setCartList] = useState<ICartProduct[]>([]);

  const addProductToCart = (cartProduct: ICartProduct) => {
    if (!cartList.some((product) => product.id === cartProduct.id)) {
      setCartList([...cartList, cartProduct]);
    } else {
      toast.error('Produto já adicionado.');
    }
  };

  const removeProductFromCart = (productId: string) => {
    const newProductList = cartList.filter(
      (product) => product.id !== productId
    );
    setCartList(newProductList);
  };

  const removeAllProductFromCart = () => {
    setCartList([]);
  };

  return (
    <CartContext.Provider
      value={{
        productList,
        cartList,
        addProductToCart,
        removeProductFromCart,
        removeAllProductFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
