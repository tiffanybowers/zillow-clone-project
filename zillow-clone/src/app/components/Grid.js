"use client"
import { useState } from "react"
import Card from "./Card"
import Map from "./Map"


const Grid = ({ properties }) => {

    const [input, setInput] = useState("")
    const [houses, setHouses] = useState(properties)
    const [locations, setLocations] = useState(houses.map(house => house.location))


    const setInputAndMapLocations = (value) => {
        setInput(value)
        setHouses(properties.filter(property => property.name.toLowerCase().includes(value.toLowerCase())))
        setLocations(houses.map(house => house.location))
    }

    return (
        <>
            <div className="search-bar">
                <input 
                    placeholder="Search location"
                    onChange={(e) => {setInputAndMapLocations(e.target.value)}} 
                    value={input}
                />
                <button>Search</button>
            </div>
            <main>
                <article>
                <Map locations={locations}/>
                </article>
                <article className="listings">
                <h2>Rental Listings</h2>
                <div className="card-container">
                    {houses.map(property => <Card
                    key={property.id}
                    propertyName={property.name}
                    slug={property.slug}
                    rentalPrice={property.rentalPrice}
                    beds={property.beds}
                    image={property.images[0]}
                    />)}
                </div>
                </article>
            </main>
        </>
    )   
}

export default Grid