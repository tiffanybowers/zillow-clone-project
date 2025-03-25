import ImageCard from '../../components/ImageCard'
import Link from 'next/link'

const getProperty = async(slug) => {
    const hygraph_endpoint = process.env.hygraph_endpoint;
    if(!hygraph_endpoint) {
        throw new Error("Hygraph endpoint is not set")
    }
    const response = await fetch(hygraph_endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query Property($slug: String) {
                    property(where: {slug: $slug}) {
                        id,
                        name,
                        description,
                        rentalPrice,
                        parking,
                        pool,
                        petFriendly,
                        inUnitDryer,
                        elevator,
                        beds,
                        images {
                            id,
                            url,
                            fileName
                        },
                        managingBroker {
                            name,
                            phoneNumber
                        }
                    }
                }
            `,
            variables: {
                slug: slug
            },
        }),
    })
    const data = await response.json();
    return data.data.property;
}

const Property = async({params}) => {
    const property = await getProperty(params.slug)
    
    return (
        <div className="property">
            <div className="property-images-container">
                {property.images.map(image => (
                    <ImageCard 
                        key={image.id} 
                        url={image.url}
                        fileName={image.fileName}
                        width={2000}
                        height={550}
                    />
                ))}
            </div>
            <div className="property-info-container">
                <h1>{property.name}</h1>
                <h2><span>{property.beds} Beds</span><span>${property.rentalPrice}</span></h2>
                <br/>
                <h2>Overview</h2>
                <p>{property.description}</p>
                <br/>
                <h2>Amenities</h2>
                <ul>
                    {property.parking && <li>Private Parking</li>}
                    {property.pool && <li>Pool</li>}
                    {property.petFriendly && <li>Pet Friendly</li>}
                    {property.elevator && <li>Elevator</li>}
                    {property.inUnitDryer && <li>In-Unit Dryer</li>}
                </ul>
                <br/>
                <h3>Licencewd Brokerage</h3>
                <p>Managing Broker: {property.managingBroker.name}</p>
                <p>Phone Number: {property.managingBroker.phoneNumber}</p>
                <br/>
                <Link href={"/"}><button>Go back</button></Link>
            </div>
        </div>
    )
}
export default Property