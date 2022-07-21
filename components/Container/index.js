import { useContext } from "react"
import Navbar from "../Navbar"
import Loading from "../Loading"
import { firebaseContext } from "../Firebase/firebase"


export default function Container({children}) {

  const { isLoading } = useContext(firebaseContext)

  return (
    <>
        <Navbar />
        { isLoading ? <Loading /> :
         children }
    </>
  )
}
