import {Component} from 'react'
import CartContext from "./CartContext"

class CartProvider extends Component {
  state = {
    cartList: [],
  }

  addCartItem = dish => {
    const {cartList} = this.state
    const itemExists = cartList.find(each => each.id === dish.id)

    if (itemExists) {
      this.incrementCartItemQuantity(dish.id)
    } else {
      this.setState(prev => ({
        cartList: [...prev.cartList, {...dish, quantity: 1}],
      }))
    }
  }

  removeCartItem = id => {
    this.setState(prev => ({
      cartList: prev.cartList.filter(each => each.id !== id),
    }))
  }

  incrementCartItemQuantity = id => {
    this.setState(prev => ({
      cartList: prev.cartList.map(each =>
        each.id === id ? {...each, quantity: each.quantity + 1} : each,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const item = cartList.find(each => each.id === id)

    if (item.quantity > 1) {
      this.setState(prev => ({
        cartList: prev.cartList.map(each =>
          each.id === id ? {...each, quantity: each.quantity - 1} : each,
        ),
      }))
    } else {
      this.removeCartItem(id)
    }
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    const {children} = this.props

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    )
  }
}

export default CartProvider
