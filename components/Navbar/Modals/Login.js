import Link from 'next/link'
import {useState, useContext, useEffect} from 'react'
import shop from '../../../data/shop.json'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { firebaseContext } from '../../Firebase/firebase';

export default function Login({ closeModal, openModal }) {
    
    const initialData = {
        email: '',
        password: ''
    }

    const [data, setData] = useState(initialData)
    const [error, setError] = useState('')
    const { signin,setUserConnect, setUid, setIsLoading } = useContext(firebaseContext);

    let timeOut;

    const handleSubmit = e => {
        e.preventDefault()
        setIsLoading(true)
        signin(data.email, data.password)
        .then(userCredential => {
            setUid(userCredential.user.uid)
            setUserConnect(true);
            timeOut = setTimeout(()=>{
                closeModal()
                setIsLoading(false)
            }, 1500)
        }).catch(error => {
            setError("Mot de passe ou email invalide!")
            setIsLoading(false)
        })
        setData(initialData)
    }

    useEffect(()=>{
        setError('')
        return clearTimeout(timeOut)
    }, [data, timeOut])

    const button = data.email && data.password.length > 5 ? 
                    <button>Connexion</button> : 
                    <button disabled>Connexion</button>
    const errorMessage = error !== '' && <span className='error-signin'>{ error }</span>

  return (
    <div className='login-container'>
        <div className="img-container">
            <img
                src={shop.cars[0].image[1]}
                alt='Car'
            />
            <div className="close-modal">
                <FontAwesomeIcon 
                    icon={faClose} 
                    className='icon-close' 
                    onClick={closeModal} 
                />
            </div>
        </div>
        <h1>Connexion</h1>
        { errorMessage }
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <input 
                type="email" 
                id="email" 
                value={data.email}
                onChange={e => setData({...data, email: e.target.value})} 
            />
            <label htmlFor="password">Mot de passe: </label>
            <input 
                type="password" 
                id="password"
                value={data.password}
                onChange={e => setData({...data, password: e.target.value})} 
            />
            <Link href='/'>
                <a className="forget-password">Mot de passe oublié?</a>
            </Link>
            <p className="signup-p">
                Pas encore de compte? 
                <span onClick={()=>openModal("signup")}>S inscrire</span>
            </p>
            { button }
        </form>
    </div>
  )
}
