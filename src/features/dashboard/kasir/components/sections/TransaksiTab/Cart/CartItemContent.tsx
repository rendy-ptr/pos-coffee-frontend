// LOCAL-IMPORTS
import { CARD_STYLES } from '../../../../constant/Style';

// HOOKS
import { useCartStore } from '@/store/cartStore';
import { useNavigate } from 'react-router-dom';

// THIRD-PARTY
import { Card } from '@/components/ui/card';

// FUNCTIONS
import { getTotalAmount } from '@/utils/totalAmount';

// TYPES
import CardHeaderCart from '../../../organisms/TransaksiTab/Cart/CardHeaderCart';
import CardContentCart from '../../../organisms/TransaksiTab/Cart/CardContentCart';

const CartItemContent = () => {
  const { cart, resetCart, updateQuantity } = useCartStore();
  const navigate = useNavigate();

  const totalItems = cart.length;
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = getTotalAmount(cart);
  const isCartEmpty = totalItems === 0;

  const handleCheckout = () => {
    // Validate cart before checkout
    if (isCartEmpty) {
      return;
    }

    // Navigate to checkout page with cart data
    navigate('/dashboard/kasir/checkout', {
      state: {
        cart,
        totalAmount,
        totalItems,
        totalQuantity,
      },
    });
  };

  return (
    <div className="order-1 lg:order-2 lg:col-span-1">
      <Card className={`sticky top-20 ${CARD_STYLES} shadow-lg`}>
        <CardHeaderCart
          totalItems={totalItems}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
          isCartEmpty={isCartEmpty}
          resetCart={resetCart}
        />
        <CardContentCart
          cart={cart}
          updateQuantity={updateQuantity}
          totalItems={totalItems}
          totalQuantity={totalQuantity}
          totalAmount={totalAmount}
          isCartEmpty={isCartEmpty}
          handleCheckout={handleCheckout}
        />
      </Card>
    </div>
  );
};

export default CartItemContent;
