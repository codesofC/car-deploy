import { useState, useContext, useEffect } from "react";
import shop from "../../../data/shop.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { firebaseContext } from "../../Firebase/firebase";
import { setDoc } from "firebase/firestore";

export default function Signup({ closeModal, openModal, userConnect }) {
  const initialData = {
    email: "",
    password: "",
    confirmPassword: "",
    fullname: "",
    errorMessage: "",
  };

  const [data, setData] = useState(initialData);
  const [error, setError] = useState("");
  const { signup, setUserConnect, user, setUid, setIsLoading } =
    useContext(firebaseContext);
  let timeOut;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setData({ ...data, errorMessage: "Mots de passes incompatibles" });
    } else {
      setIsLoading(true);
      signup(data.email, data.password)
        .then((authUser) => {
          setUid(authUser.user.uid);
          setIsLoading(false);

          return setDoc(user(authUser.user.uid), {
            fullname: data.fullname,
            email: data.email,
            password: data.password,
          });
        })
        .then(() => {
          setUserConnect(true);
          timeOut = setTimeout(() => {
            closeModal();
            setIsLoading(false);
          }, 1500);
        })
        .catch((error) => {
          setError(error.message);
          setIsLoading(false);
        });
      setData(initialData);
    }
  };

  useEffect(() => {
    setData({ ...data, errorMessage: "" });
    return clearTimeout(timeOut);
  }, [data, timeOut]);

  const button =
    data.email &&
    data.fullname &&
    data.password.length > 5 &&
    data.confirmPassword.length > 5 ? (
      <button>Valider</button>
    ) : (
      <button disabled>Valider</button>
    );
  const errorMessage = error != "" && (
    <span className="error-signup">{error}</span>
  );

  return (
    <div className="login-container">
      <div className="img-container">
        <img src={shop.cars[1].image[1]} alt="Car" />
        <div className="close-modal">
          <FontAwesomeIcon
            icon={faClose}
            className="icon-close"
            onClick={closeModal}
          />
        </div>
      </div>
      <h1>Inscription</h1>
      {errorMessage}
      <form onSubmit={handleSubmit}>
        <label htmlFor="fullname">FullName: </label>
        <input
          required
          type="text"
          id="fullname"
          value={data.fullname}
          onChange={(e) => setData({ ...data, fullname: e.target.value })}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />
        <label htmlFor="cpassword">Confirm Password: </label>
        <input
          type="password"
          id="cpassword"
          value={data.confirmPassword}
          onChange={(e) =>
            setData({ ...data, confirmPassword: e.target.value })
          }
        />
        <span className="error-message">{data.errorMessage}</span>
        <p className="signup-p">
          Déjà inscrit?{" "}
          <span onClick={() => openModal("login")}>Se Connecter</span>
        </p>
        {button}
      </form>
    </div>
  );
}
