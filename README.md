# Mock Store App

This is a mock store application built using React and fetching data from an external API provided by Fake API. The application allows users to browse products, add them to their cart, and complete a mock purchase. It serves as a demonstration of how to integrate React with an external API.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Contributing](#contributing)
- [License](#license)

## Features

- Browse products: Users can view a list of available products in the store.
- Product details: Users can click on a product to see its details, such as name, price, and description.
- Add to cart: Users can add products to their cart.
- Cart: Users can view the contents of their cart, modify quantities, and remove items.
- Checkout: Users can complete a mock purchase by entering their personal information and confirming the order.

## Installation

1. Clone the repository:

```shell
git clone https://github.com/your-username/mock-store-app.git
```

2. Navigate to the project directory:

```shell
cd mock-store-app
```

3. Install the dependencies:

```shell
npm install
```

## Usage

1. Start the development server:

```shell
npm start
```

2. Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

3. Browse the store, add products to the cart, and complete a mock purchase.

## API Integration

This mock store app integrates with the Fake API to fetch product data. The API endpoints used in this application are:

- `GET /products`: Returns a list of available products.
- `GET /products/{id}`: Returns details for a specific product.
- `POST /orders`: Creates a new order.

To configure the API endpoint, you can modify the `src/config.js` file and update the `API_BASE_URL` constant with the appropriate URL for the Fake API.

## Contributing

Contributions are welcome! If you find any bugs or want to enhance this mock store app, feel free to open an issue or submit a pull request. Please ensure that your contributions align with the coding standards and best practices used in the project.

## License

This project is licensed under the [MIT License](LICENSE). Feel free to use and modify this project for your own purposes.
