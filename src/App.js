import {useState, Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Restaurant from './components/Restaurant'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: [], setCartList: []}

  //   addCartItem = dish => {
  //     this.setState(prevState => {
  //       const item = prevState.cartList.find(
  //         each => each.dish_id === dish.dish_id,
  //       )
  //       if (item) {
  //         return {
  //           cartList: prevState.cartList.map(each =>
  //             each.dish_id === dish.dish_id
  //               ? {...each, quantity: each.quantity + dish.quantity}
  //               : each,
  //           ),
  //         }
  //       }
  //       return {cartList: [...prevState.cartList, dish]}
  //     })
  //   }

  addCartItem = dish => {
    const {cartList} = this.state
    const productObject = cartList.find(
      eachCartItem => eachCartItem.id === dish.id,
    )

    if (productObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (productObject.id === eachCartItem.id) {
            const updatedQuantity = eachCartItem.quantity + dish.quantity

            return {...eachCartItem, quantity: updatedQuantity}
          }

          return eachCartItem
        }),
      }))
    } else {
      const updatedCartList = [...cartList, dish]

      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = dish => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.dish !== dish),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === id ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.id === id ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Restaurant} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}
export default App
