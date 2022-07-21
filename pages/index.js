import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import HeadBody from '../components/HeadBody'
import { useDispatch } from "react-redux";

export default function Home({ data } ) {

  const router = useRouter()
  const dispatch = useDispatch()
  const addInfo = useRef()

  let timeAdd;

  const viewMore = id => {
    router.push(`/${id}`)
  }

  const addItem = (e, id) => {
    const itemAdded = {
      ...data[id - 1],
      quantity: 1
    }
    dispatch({
      type: 'ADDITEM',
      payload: itemAdded
    })
    e.target.innerHTML = 'AJOUT EFFECTUÉ'
    e.target.style.backgroundColor = 'green'
    timeAdd = setTimeout(()=>{
      e.target.innerHTML = 'Ajouter au panier'
      e.target.style.backgroundColor = ''
    }, 1000)
  }

  useEffect(()=>{
    return ()=>{
      clearTimeout(timeAdd)
    }
  }, [timeAdd])

  return (
    <>
      <Head>
        <title>Car Shop</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeadBody />
      <section className="sold">
        <h2 className="sold-title">En Vente</h2>
        <div className="grid">
          {data.map((car) => {
            let id=uuidv4()

            return <div key={id} className="card">
              <div className="card-image">
                <img src={car.image[0]} alt="" />
                <div className="see-more" onClick={() => viewMore(car.model.toLowerCase())}>
                  <p>Voir plus</p>
                </div>
              </div>
              <div className="card-description">
                <h1>{car.brand}</h1>
                <h2>{car.model}</h2>
                <h3>{car.year}</h3>
                <h4>{car.category}</h4>

                <p className="price-car">$ {car.price}</p>
                <button
                  onClick={e => addItem(e, car.id)}
                  ref={addInfo}
                >
                    Ajouter au panier
                </button>
                  
              </div>
            </div>
          })}
        </div>
      </section>
    </>
  );
}

export async function getStaticProps(){

  const file = await import('../data/shop.json')
  const data = file.cars;

  return {
    props: {
      data
    }
  }
}