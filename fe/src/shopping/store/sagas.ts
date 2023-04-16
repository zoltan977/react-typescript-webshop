import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { AddToShoppingCartActionInterface, RemoveFromShoppingCartActionInterface, ShoppingActionTypes } from './types';
import { shoppingActions } from './actions';
import { getCart, clearCart, addToCart, removeFromCart } from '../services/shopping-cart.service';
import { ShoppingCart } from '../../shared/models/shopping-cart';
import globalErrorHandler from '../../shared/utils/globalErrorHandler';

const safe = (handler:any = null, saga:any, ...args:any) => function* (action:any) {
    try {
      yield call(saga, ...args, action)
    } catch (err) {
      yield call(handler, ...args, err)
    }
}

const onError = (err:any) => {
    globalErrorHandler(err)
}


function* watchers() {
    yield takeEvery(ShoppingActionTypes.GET_SHOPPING_CART, safe(onError, onGetShoppingCart));
    yield takeEvery(ShoppingActionTypes.CLEAR_SHOPPING_CART, safe(onError, onClearShoppingCart));
    yield takeEvery(ShoppingActionTypes.ADD_TO_SHOPPING_CART, safe(onError, onAddToShoppingCart));
    yield takeEvery(ShoppingActionTypes.REMOVE_FROM_SHOPPING_CART, safe(onError, onRemoveFromShoppingCart));
}

function* onGetShoppingCart() {
    let cart: ShoppingCart = yield call(getCart);
    if (cart.isEmpty) {
        cart = yield call(clearCart)
    }
    yield put(shoppingActions.setShoppingCart(cart));
}

function* onClearShoppingCart() {
    const cart: ShoppingCart = yield call(clearCart);
    yield put(shoppingActions.setShoppingCart(cart));
}

function* onAddToShoppingCart(action: AddToShoppingCartActionInterface) {
    const cart: ShoppingCart = yield call(addToCart, action.product);
    yield put(shoppingActions.setShoppingCart(cart));
}

function* onRemoveFromShoppingCart(action: RemoveFromShoppingCartActionInterface) {
    let cart: ShoppingCart = yield call(removeFromCart, action.product);
    if (cart.isEmpty) {
        cart = yield call(clearCart)
    }
    yield put(shoppingActions.setShoppingCart(cart));
}

export default function* shoppingSaga() {
    yield all([fork(watchers)]);
}