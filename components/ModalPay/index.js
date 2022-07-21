import { useContext } from 'react'
import { firebaseContext } from "../Firebase/firebase.js"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

export default function ModalPay({ modalpay, setModalpay }) {

    const dispatch = useDispatch()
    const router = useRouter();
    const { setIsLoading } = useContext(firebaseContext)

    const handlePath = () => {
      setIsLoading(true);
      setTimeout(() => {
        setModalpay(false);
        setIsLoading(false);
        dispatch({
          type: "DELETE"
        })
        router.push("/")
      }, 1500);
    }

  return (
    <div className={ modalpay ? "modal-pay-container active" : "modal-pay-container"}>
        <div className="modal-pay-body">
            <span>✔</span>
            <h2>Paiement réussi</h2>
            <h4>Merci de nous avoir choisi</h4>
            <button onClick={handlePath}>Revenir à l acceuil</button>
        </div>
    </div>
  )
}
