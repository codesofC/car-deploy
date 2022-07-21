import Container from "../components/Container";
import "../components/Navbar/navbar.css";
import "../components/Navbar/Modals/modal.css";
import "../components/HeadBody/headbody.css";
import "../styles/index.css";
import "./[id]/car.css";
import "../styles/cart.css";
import '../components/Navbar/UserUI/userui.css';
import '../components/ModalPay/modalpay.css';
import '../components/Loading/loading.css';
import { Provider } from "react-redux";
import store from "../redux/store";
import Firebase from "../components/Firebase/firebase";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Firebase>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Firebase>
    </Provider>
  );
}

export default MyApp;
