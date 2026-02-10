import {useState, Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Restaurant from './components/Restaurant'
import Home from './components/Home'
import Cart from './components/Cart'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

class App extends Component {
  state = {cartList: []}

  addCartItem = dish => {
    const {cartList} = this.state
    const dishObject = cartList.find(
      eachCartItem => eachCartItem.dishId === dish.dishId,
    )

    if (dishObject) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(eachCartItem => {
          if (dishObject.dishId === eachCartItem.dishId) {
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

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.dishId === dishId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: item.quantity - 1}
            : item,
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
            <Route exact path='/login' component={Login} />
            <ProtectedRoute exact path='/' component={Home} />
            <ProtectedRoute exact path='/cart' component={Cart} />
            <Redirect to='/login' />
          </Switch>
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}
export default App
