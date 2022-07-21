import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function Car ({ data }){

    const [slideIndex, setSlideIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)
    const dispatch = useDispatch()

    const handleImage = button => {
        if(button === 'left'){
            slideIndex === 0 ? setSlideIndex(data.image.length - 1) 
            : setSlideIndex(slideIndex - 1)
        }
        if(button === 'right'){
            slideIndex === data.image.length - 1 ? setSlideIndex(0) 
            : setSlideIndex(slideIndex + 1)
        }
    }

    const addItem = e => {
        e.preventDefault();
        const itemAdded = {
            ...data,
            quantity: Number(quantity)
        }
        dispatch({
            type: 'ADDITEM',
            payload: itemAdded
        })

        setQuantity(1)
    }

  return (
    <div className='details-container'>
         <div className="left-container">
            <div className="slide-content">
                <FontAwesomeIcon 
                    icon={faArrowLeft} 
                    onClick={()=>handleImage('left')} 
                    className='arrow left'
                />
                <img 
                    src={data.image[slideIndex]} 
                    alt="Voiture" 
                />
                <FontAwesomeIcon 
                    icon={faArrowRight} 
                    onClick={()=>handleImage('right')} 
                    className='arrow right'
                />
            </div>
            <div className="details-content">
                <p className="head-content">
                    <span>
                        {`${data.brand} ${data.model}`}
                    </span>
                    <span>
                        {`$ ${data.price}`}
                    </span>
                </p>
                <p className="colors-content">
                    {data.color.map((color, index)=>(
                        <span key={index} className="active">
                            {color}
                        </span>
                    ))}
                </p>
                <div className="infos-content">
                    <span>Marque: {data.brand}</span>
                    <span>Model: {data.model}</span>
                    <span>Année: {data.year}</span>
                    <span>Catégorie: {data.category}</span>
                    <p>
                        Description: <br />
                            {data.description}
                    </p>
                </div>
            </div>
         </div>
         <div className="right-container">
            <img src={data.image[0]} alt="" />
            <p>{`${data.brand} ${data.model}`}</p>
            <p>$ {data.price}</p>
            <form>
                <div className="quantity-content">
                    <label htmlFor="quantity">Quantité</label>
                    <input 
                        type="number" 
                        min={1} 
                        max={5}
                        value={quantity}
                        onChange={e => setQuantity(e.target.value)} 
                    />
                </div>
                <button onClick={addItem}>Ajouter au panier</button>
                <button>Acheter maintenant</button>
            </form>
         </div>
    </div>
  )
}

export async function getStaticProps(context){
    const path = context.params.id;
    const file = await import('../../data/shop.json')
    const data = file.cars.find(car => car.model.toLowerCase() === path)

    return {
        props: {
            data
        }
    }
}

export async function getStaticPaths(){
    const file = await import('../../data/shop.json')
    const data = file.cars;
    const paths = data.map(car => (
        {params: {id: car.model.toLowerCase()}}
    ))

    return {
        paths,
        fallback: false
    }
}