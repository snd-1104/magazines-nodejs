var frisby = require('frisby');
frisby.create('Get List of All Category')
    .get('http://localhost:3000/category')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("data.*", {
        name: String,
        description: String,
        parent: Number,
        deleted_at: String
    })
    .toss();

frisby.create('Get Detail of Category')
    .get('http://localhost:3000/category/1/')
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("data", {
        name: String,
        description: String,
        parent: Number,
        deleted_at: String,
    })
    .toss();

frisby.create('Create New Category')
    .post('http://localhost:3000/category', {
        name: "Frisby Category",
        description: "Here's is the description of Frisby",
        parent: 1
    }, {
        json: true
    })
    .expectStatus(200)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "ok"
    })
    .expectJSONTypes("inserted_id", Number)
    .afterJSON(function(json) {
        frisby.create('Update category data').
        put('http://localhost:3000/category/' + json.inserted_id, {
                name: "Frisby Category (updated)",
                description: "Here's is the description of Frisby (updated)",
                parent: 2
            }, {
                json: true
            })
            .expectStatus(200)
            .expectHeaderContains('content-type', 'application/json')
            .expectJSON({
                status: "ok"
            })
            .expectJSONTypes("updated_id", Number)
            .afterJSON(function(json) {
                frisby.create('Delete category')
                    .delete('http://localhost:3000/category/' + json.updated_id)
                    .expectJSON({
                        status: "ok"
                    })
                    .expectJSONTypes("deleted_id", Number)
                    .toss();
            })
            .toss();
    })
    .toss();

frisby.create('Get error on update with wrong body content')
    .put('http://localhost:3000/category/7/', {
        name: ""
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on update with wrong params')
    .put('http://localhost:3000/category/7s/', {
        name: "Frisby Category (updated)",
        description: "Here's is the description of Frisby (updated)",
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on update with non existed ID')
    .put('http://localhost:3000/category/99999/', {
        name: "Frisby Category (updated)",
        description: "Here's is the description of Frisby (updated)"
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on delete data with wrong params type')
    .delete('http://localhost:3000/category/asas/')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on delete data with non existed ID')
    .delete('http://localhost:3000/category/99999/')
    .expectJSON({
        status: "error"
    })
    .toss();

frisby.create('Get error on create new category with wrong body content type')
    .post('http://localhost:3000/category', {
        name: "",
        description: "Here's is the description of Frisby",
        stock: 10,
        price: "asas",
        cost: "ass"
    }, {
        json: true
    })
    .expectStatus(400)
    .expectHeaderContains('content-type', 'application/json')
    .expectJSON({
        status: "error"
    })
    .toss();
