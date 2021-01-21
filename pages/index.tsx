import { GetServerSideProps } from "next"
import { useRouter } from "next/router"
import { useState } from "react"
import { client, ClientResponse, Product } from "utils/client"

const paramsBuilder = (search: string) => `?search=${search}`

const Home = ({ initialProducts }: { initialProducts: Product[] }) => {
  const { query, ...router } = useRouter()
  const { search } = query
  const [searchQuery, setSearchQuery] = useState<string>(search ? String(search) : "")
  const [products, setProducts] = useState<Product[]>(initialProducts)

  const handleSearch = async () => {
    // Soft replace the query params for refresh persistence
    router.replace(paramsBuilder(searchQuery))

    // Fetch the search results
    const result = await client.request({
      query: searchQuery
    })

    setProducts(result.products)
  }

  const fetchMore = async () => {
    // Fetch the new products
    const result = await client.request({
      query: searchQuery,
      after: products.length,
    })

    // Append to existing state
    setProducts((products) => [...products, ...result.products])
  }

  return (
    <div>
      <input
        type="text"
        name="query"
        placeholder="Search for something"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      <ul>
        {products.map((product) => (
          <li>{product.name}</li>
        ))}
      </ul>

      <button onClick={fetchMore}>Load more</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { search } = context.query

  const result: ClientResponse = await client.request({
    query: search && String(search),
  })

  const { products } = result

  return {
    props: {
      initialProducts: products,
    },
  }
}

export default Home
