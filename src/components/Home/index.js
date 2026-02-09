import {useState, useEffect, useContext} from 'react'
import Loader from 'react-loader-spinner'
import {useHistory} from 'react-router-dom'
import Header from '../Header'
import DishItem from '../DishItem'
import Category from '../Category'
import CartContext from '../../context/CartContext'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const Home = () => {
  const history = useHistory()
  const {cartList, addCartItem} = useContext(CartContext)

  const [restaurantInfo, setRestaurantInfo] = useState({})
  const [menuList, setMenuList] = useState([])
  const [activeCategory, setActiveCategory] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      setApiStatus(apiStatusConstants.loading)

      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const data = await response.json()

      if (response.ok) {
        const restaurant = data[0]

        setRestaurantInfo({
          restaurantName: restaurant.restaurant_name,
          restaurantImage: restaurant.restaurant_image,
          branchName: restaurant.branch_name,
        })

        setMenuList(restaurant.table_menu_list)
        setActiveCategory(restaurant.table_menu_list[0].menu_category)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    }

    fetchRestaurantDetails()
  }, [])

  const onClickCart = () => {
    history.push('/cart')
  }

  const onClickRestaurantName = () => {
    history.push('/')
  }

  const renderLoadingView = () => (
    <div>
      <Loader type="ThreeDots" color="#f7931e" height={50} width={50} />
    </div>
  )

  const renderFailureView = () => <h1>Something went wrong</h1>

  const renderSuccessView = () => {
    const {restaurantName, restaurantImage, branchName} = restaurantInfo

    const activeMenu = menuList.find(
      each => each.menu_category === activeCategory,
    )

    return (
      <>
        <Header
          restaurantName={restaurantName}
          restaurantImage={restaurantImage}
          branchName={branchName}
          onClickCart={onClickCart}
          onClickRestaurantName={onClickRestaurantName}
        />

        <Category />
        <ul className="table_menu_list">
          {menuList.map(each => (
            <li key={each.menu_category_id}>
              <button
                type="button"
                className={
                  activeCategory === each.menu_category
                    ? 'active-category'
                    : 'category-button'
                }
                onClick={() => setActiveCategory(each.menu_category)}
              >
                {each.menu_category}
              </button>
            </li>
          ))}
        </ul>

        {/* DISHES */}
        <ul className="category_dishes">
          {activeMenu.category_dishes.map(dish => (
            <DishItem
              key={dish.dish_id}
              dishDetails={dish}
              addCartItem={addCartItem}
              cartList={cartList}
            />
          ))}
        </ul>
      </>
    )
  }

  const renderHomeView = () => {
    switch (apiStatus) {
      case apiStatusConstants.loading:
        return renderLoadingView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return <div>{renderHomeView()}</div>
}

export default Home
