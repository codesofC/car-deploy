import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faUser } from "@fortawesome/free-solid-svg-icons";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import Login from "./Modals/Login";
import Signup from "./Modals/Signup";
import { useSelector } from "react-redux";
import { firebaseContext } from "../Firebase/firebase";
import UserUI from "./UserUI";

export default function Navbar() {
  const [menuToggle, setMenuToggle] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalOpen, setModalOpen] = useState('')
  const router = useRouter();

  const { userConnect } = useContext(firebaseContext)

  const shopCart = useSelector(state => state)

  const handlePage = () => {
    router.push("/cart");
  };
  const closeModal = () => {
      setModal(false)
  }
  const openModal = modal => {
      setModal(true)
      setModalOpen(modal)
  }

  let quantityCart = 0;
  for(const item of shopCart.cart){
    quantityCart += item.quantity
  }

  return (
    <nav>
      <div className="menu-icon" onClick={() => setMenuToggle(!menuToggle)}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <h2>
        <span className="buy">BUY</span>Car🚘
      </h2>
      <ul className={menuToggle ? "first active" : `first`}>
        <li className="">
          <Link href="/">
            <a onClick={() => setMenuToggle(!menuToggle)}>Accueil</a>
          </Link>
        </li>
        <li className="">
          <Link href="/offres">
            <a onClick={() => setMenuToggle(!menuToggle)}>Offres</a>
          </Link>
        </li>
        <li>
          <Link href="/buycarmodel">
            <a onClick={() => setMenuToggle(!menuToggle)}>BuyCar modèles</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a onClick={() => setMenuToggle(!menuToggle)}>A propos</a>
          </Link>
        </li>
      </ul>
      <div className="icons">
        {!userConnect ? <div className="login-signup" onClick={()=>openModal('login')}>
          <FontAwesomeIcon icon={faUser} />
        </div> : <div className="login-signup">
                    <UserUI />
                </div>}
        <div className="cart" onClick={handlePage}>
          <FontAwesomeIcon icon={faCartShopping} />
          <span className="value-cart">{quantityCart}</span>
        </div>
      </div>
      {modal && <div className="modals">
        {modalOpen === 'login' ? <Login closeModal={closeModal} openModal={openModal} />
        : <Signup closeModal={closeModal} openModal={openModal} />}
      </div>}
    </nav>
  );
}
