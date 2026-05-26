import { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext(null);

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find(
        i => i.productId === action.payload.productId && 
             i.size === action.payload.size && 
             i.color === action.payload.color
      );
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.productId === action.payload.productId && 
            i.size === action.payload.size && 
            i.color === action.payload.color
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(
          i => !(i.productId === action.payload.productId && 
                 i.size === action.payload.size &&
                 i.color === action.payload.color)
        ),
      };
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(i =>
          i.productId === action.payload.productId && 
          i.size === action.payload.size &&
          i.color === action.payload.color
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case 'CLEAR_CART':
      return { ...state, items: [] };
    case 'LOAD_CART':
      return { ...state, items: action.payload };
    default:
      return state;
  }
};

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sfh_cart');
      if (saved) dispatch({ type: 'LOAD_CART', payload: JSON.parse(saved) });
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem('sfh_cart', JSON.stringify(state.items));
  }, [state.items]);

  const cartCount = state.items.reduce((acc, i) => acc + i.quantity, 0);
  const cartTotal = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ ...state, cartCount, cartTotal, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
