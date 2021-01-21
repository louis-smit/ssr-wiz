
const PAGE_LENGTH = 4

export interface Product {
  name: string
}

export interface ClientResponse {
  products: Product[]
}

interface ClientRequestOptions {
  query?: string
  after?: number
}

const PRODUCTS: Product[] = [
  { name: "Product 1 - Shirt" },
  { name: "Product 2 - Shirt" },
  { name: "Product 3 - Pants" },
  { name: "Product 4 - Jacket" },
  { name: "Product 5 - Ferrari" },
  { name: "Product 6 - Watch" },
  { name: "Product 7 - Hat" },
  { name: "Product 8 - Pants" },
  { name: "Product 9 - Pants" },
  { name: "Product 10 - Macbook" },
  { name: "Product 11 - Belt" },
  { name: "Product 12 - Socks" },
  { name: "Product 13 - Socks" },
  { name: "Product 14 - Warm Shirt" },
  { name: "Product 15 - Cool Shirt" },
  { name: "Product 16 - Short Shirt" },
  { name: "Product 17 - Long Shirt" },
  { name: "Product 18 - Hat" },

]

export const client = {
  request: async (options: ClientRequestOptions): Promise<ClientResponse> => {
    const after = options.after || 0
    let products: Product[] = PRODUCTS

    if (options.query && options.query !== 'null' && options.query !== "") {
      products = products.filter((product) =>
        product.name
          .toLocaleLowerCase()
          .includes(options.query.toLocaleLowerCase())
      )
    }

    products = products.slice(after, (after + PAGE_LENGTH))

    return {
      products,
    }
  },
}
