import NavBar from "./components/Navbar";
import Grid from "./components/Grid";

const getProperties = async() => {
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
        query Properties {
          properties {
            beds
            description
            id
            images {
              fileName
              url
            }
            location {
              latitude
              longitude
            }
            name
            rentalPrice
            slug
          }
        }
      `
    })
  })
  const json = await response.json();
  return json.data.properties;
}

const Home = async() => {
  const properties = await getProperties();
  const locations = properties.map(property => property.location)

  return (
    <>
      <NavBar/>
      <Grid properties={properties} />
    </>
  )
}

export default Home
