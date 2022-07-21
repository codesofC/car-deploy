import Image from 'next/image'
import { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import ModalPay from "../../components/ModalPay";
import { firebaseContext } from "../../components/Firebase/firebase";

export default function Cart() {
  const [modalpay, setModalpay] = useState(false);
  const items = useSelector((state) => state);
  const dispatch = useDispatch();

  const { uid } = useContext(firebaseContext)

  const handleChange = (e, id) => {
    const index = items.cart.findIndex((item) => item.id === id);

    const updateObj = {
      ...items.cart[index],
      quantity: Number(e.target.value),
    };
    dispatch({
      type: "UPDATEITEM",
      payload: updateObj,
    });
  };

  const deleteItem = (id) => {
    dispatch({
      type: "DELETEITEM",
      payload: {
        id,
      },
    });
  };

  let totalPrice = 0;

  for (const item of items.cart) {
    totalPrice += item.price * item.quantity;
  }

  return (
    <div className="cart-container">
      <div className="cart">
        <h1>Votre panier</h1>
        <div className="display-container">
          <div className="container-cart">
            {items.cart.length === 0 ? (
              <h4 className="cart-empty">Votre panier est vide</h4>
            ) : (
              items.cart.map((item) => (
                <div key={uuidv4()} className="cart-content-item">
                  <div className="content-item">
                    <div className="item-img">
                      <img alt='photo' />
                    </div>
                    <div className="item-name">
                      <h4>{`${item.brand} ${item.model} ${item.year}`}</h4>
                      <h5>{`$ ${item.price}`}</h5>
                    </div>
                  </div>
                  <div className="item-input-container">
                    <input
                      type="number"
                      min={1}
                      max={5}
                      value={item.quantity}
                      onChange={(e) => handleChange(e, item.id)}
                    />
                    <span className="icon-delete">
                      <FontAwesomeIcon
                        icon={faClose}
                        title="Effacer"
                        onClick={() => deleteItem(item.id)}
                      />
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
          <div className="total-price">
            <p>
              <span>Prix Total: </span>
              <span>$ {totalPrice}</span>
            </p>
            
            {totalPrice > 0 ? 
              <button onClick={()=>setModalpay(true)}>Payer maintenant</button> : 
              <button disabled>Payer maintenant</button>}
          </div>
        </div>
      </div>
      <ModalPay modalpay={modalpay} setModalpay={setModalpay} />
    </div>
  );
}
