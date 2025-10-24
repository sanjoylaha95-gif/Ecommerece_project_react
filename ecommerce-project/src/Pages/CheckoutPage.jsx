import axios from 'axios';
import dayjs from 'dayjs';
import { DeliveryOptions } from './DeliveryOptions';
import { PaymentSummary } from './PaymentSummary';
import { useEffect, useState } from 'react';
import './checkout-header.css';
import './CheckoutPage.css';



export function CheckoutPage({ cart ,loadCart}) {
    const [deliveryOptions, setDeliveryOptions] = useState([]);
    const [paymentSummary, setPaymentSummary] = useState(null);
    useEffect(() => {
        const fetchCheckoutData=async ()=>{
            const response=await axios.get('/api/delivery-options?expand=estimatedDeliveryTime');
            setDeliveryOptions(response.data);setDeliveryOptions(response.data);
        };
        fetchCheckoutData();
        const fetchPaymentData=async ()=>{
            const response=await axios.get('/api/payment-summary');
            setPaymentSummary(response.data);
        };
        fetchPaymentData();
    }, [cart]);
    return (
        <>
            <title>Checkout</title>

            <div className="checkout-header">
                <div className="header-content">
                    <div className="checkout-header-left-section">
                        <a href="/">
                            <img className="logo" src="images/logo.png" />
                            <img className="mobile-logo" src="images/mobile-logo.png" />
                        </a>
                    </div>

                    <div className="checkout-header-middle-section">
                        Checkout (<a className="return-to-home-link"
                            href="/">3 items</a>)
                    </div>

                    <div className="checkout-header-right-section">
                        <img src="images/icons/checkout-lock-icon.png" />
                    </div>
                </div>
            </div>

            <div className="checkout-page">
                <div className="page-title">Review your order</div>

                <div className="checkout-grid">
                    <div className="order-summary">
                        {deliveryOptions.length > 0 && cart.map((cartItem) => {
                            const selectedDeliveryOption = deliveryOptions.find((deliveryOption) => {
                                return deliveryOption.id === cartItem.deliveryOptionId;
                            })

                            const deleteCartItem=async ()=>{
                                await axios.delete(`/api/cart-items/${cartItem.productId}`);
                                await loadCart();
                            };

                            return (
                                <div key={cartItem.productId} className="cart-item-container">
                                    <div className="delivery-date">
                                        Delivery date:{dayjs(selectedDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}

                                    </div>

                                    <div className="cart-item-details-grid">
                                        <img className="product-image"
                                            src={cartItem.product.image} />

                                        <div className="cart-item-details">
                                            <div className="product-name">
                                                {cartItem.product.name}
                                            </div>
                                            <div className="product-price">
                                                ${(cartItem.product.priceCents / 100).toFixed(2)}
                                            </div>
                                            <div className="product-quantity">
                                                <span>
                                                    Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                                                </span>
                                                <span className="update-quantity-link link-primary">
                                                    Update
                                                </span>
                                                <span className="delete-quantity-link link-primary"
                                                onClick={deleteCartItem}>
                                                    Delete
                                                </span>
                                            </div>
                                        </div>

                                    <DeliveryOptions cartItem={cartItem} deliveryOptions={deliveryOptions} loadCart={loadCart}/>
                                    </div>
                                </div>
                            );
                        })}

                    </div>

                        <PaymentSummary paymentSummary={paymentSummary} loadCart={loadCart}/>
                </div>
            </div>
        </>
    );
}