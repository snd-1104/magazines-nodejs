# NodeJS Simple CRUD API with MySQL
Example of NodeJS CRUD (Create Read Update Delete) API with MySQL database, it has category and product table.

## Installation Steps
1. Clone this repository or download .zip file.
2. Create new database on your MySQL Server.
3. Import `digital_magazines.sql`
4. Install node module by run ``npm install`` on your console.
5. Edit database configuration in file `./config/config.json`
6. Execute ``node myapp.js`` to run this app.
7. When this app is running you can try to use this API.

## Run API Test
1. Execute ``node myapp.js`` to run this app.
2. Execute ``jasmine-node ./test/`` to start testing.

## API Documentation

## Category

#### List All Category [GET /category]
List all category with hierarchical tree data.

+ Response 200 (application/json)

#### Add New Category [POST /category]
Add new category

+ Body Params
    + name (string)
    + description (string) _optional_
    + parent (int) _optional_

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Update Category [PUT /category/{id}]
Update category data

+ Parameters
    + id (int)

+ Body Params
    + name (string)
    + description (string) _optional_
    + parent (int) _optional_

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Delete Category [DELETE /category/{id}]
Delete category

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Category Detail [GET /category/{id}]
Get detail data of specified category by id with hierarchical tree data.

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

## Product

#### List Product [GET /product]
Get list data of products, you can pass query string `limit` to set length of data. Default value for `limit` is 10.

+ Query String Params
    + limit (int) _optional_
    + page (int) _optional_

+ Response 200 (application/json)

#### Add New Product [POST /product]
Add new product

+ Body Params
    + name (string)
    + description (string) _optional_
    + category_id (int)
    + stock (int)
    + price (double)
    + cost (double)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Update Product [PUT /product/{id}]
Update product data

+ Parameters
    + id (int)

+ Body Params
    + name (string)
    + description (string) _optional_
    + category_id (int)
    + stock (int)
    + price (double)
    + cost (double)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Delete Product [DELETE /product/{id}]
Delete product

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)

#### Product Detail [GET /product/{id}]
Get detail data of specified product by id

+ Parameters
    + id (int)

+ Success Response 200 (application/json)
+ Error Response 400 (application/json)
