# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints 
#### Products
- Index 
- Show (args: product id)(findById)
- Create (args: Product)[token required]
- Update
- delete

#### Users
- Index [token required]
- Show (args: id)[token required] (findById)
- Create (args: User)[token required]
- FindByEmail
- Update
- Delete

#### Orders
- Create (args: order)[token required]
- Update
- delete
- findById (args: order id)(findById)
- list

#### Review
- create
- findById
- listByProduct
- update
- delete

 #### Category
- create
- findById
- update
- delete

#### CartItem
- create
- findById
- update
- delete
- list

#### Cart
- create
- list
- findById
- update
- delete

## Data Shapes
#### Product
-  id
- name
- sku
- description
- price
- stock
- category_id
- created_at

#### User
- id
- name
- email
- password_hash
- role

#### Categories
- id
- name
- slug
- created_at

#### Carts
- id
- user_id
- checked_out
- created_at

#### cart_items
- id
- cart_id
- product_id
- quantity
- unit_price
- created_at

#### Orders
- id
- total
- address
- user_id
- status
- created_at

#### Order_items
-  id
- order_id
- product_id
- quantity
- unit_price

#### Reviews
- id
- user_id
- product_id
- rating
- comment
- created_at


