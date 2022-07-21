import Link from 'next/link'
import data from '../../data/shop.json'

export default function HeadBody() {
  return (
    <div className='headbody-container'>
        <div className="headbody-img">
            <img src={data.cars[8].image[0]} alt="voiture" />
        </div>
        <div className="headbody-content">
            <h2>BUYCar</h2>
            <p>
            Lorem ipsum dolor sit amet consectetur 
            adipisicing elit. Eligendi dolorum cupiditate 
            expedita amet repellendus corporis est numquam 
            ipsam. Error quidem est?</p>
            <Link href='/offres'>
                <a>Nos Offres</a>
            </Link>
        </div>
    </div>
  )
}
