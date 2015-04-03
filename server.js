// server.js

// set up ======================================================================
// get all the tools we need
var express = require('express')
var app = express()
var port = process.env.PORT || 80
var bodyParser = require('body-parser')
var http = require('http')
var mongoose = require('mongoose');
var proplock = require('proplock');

mongoose.connect('mongodb://morgan:morgan@ds059821.mongolab.com:59821/stockmarket', function(err, db) {
    if (err) throw err;
    console.log("Connected to Database");
    _db = db //this is our global database object
})

// LOCK THE DATABASE ======================================

proplock.lock(mongoose);


// DATBASE CRUMS ======================================

var transactionOrSomethingSchema = mongoose.Schema({
    timestamp: Date,
    size: Number,
    price: Number,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aUniqueCompanySchemaName'
    }
});
var Transactions = mongoose.model('Transactions', transactionOrSomethingSchema);

var sellOrderSchema = mongoose.Schema({
    timestamp: Date,
    size: Number,
    price: Number,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aUniqueCompanySchemaName'
    }

});
var SellOrders = mongoose.model('SellOrders', sellOrderSchema);

var buyOrderSchema = mongoose.Schema({
    timestamp: Date,
    size: Number,
    price: Number,
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'aUniqueCompanySchemaName'
    }
});
var BuyOrders = mongoose.model('BuyOrders', buyOrderSchema);


var aUniqueCompanySchemaName = mongoose.Schema({
    name: String,
    symbolURL: String,
    openPrice: String,
    currentPrice: {
        type: Number,
        default: 0.0
    },
    changeValue: {
        type: Number,
        default: 0.0
    },
    changeIcon: {
        type: String,
        default: 'images/noChange.png'
    },
    changePercentage: {
        type: Number,
        default: 0.0
    },
    changeDirection: {
        type: Number,
        default: 0
    },
    shareVolume: {
        type: Number,
        default: 0
    },
    buyOrders: [buyOrderSchema],
    sellOrders: [sellOrderSchema],
    transactions: [transactionOrSomethingSchema]
});
var Companies = mongoose.model('Companies', aUniqueCompanySchemaName);

app.use(bodyParser.json()) // get information from html forms
app.use(bodyParser.urlencoded({
    extended: true
}))

// for our index
app.use(express.static(__dirname + '/public'))



// routes ======================================================================

app.get('/companies', function(req, res) {
    Companies.find(function(err, companies) {
        if (err) res.send(err);
        res.json({
            companies: companies
        });
    });
});

app.get('/buyOrders', function(req, res) {
    BuyOrders.find(function(err, buyOrders) {
        if (err) res.send(err);
        res.json({
            buyOrders: buyOrders
        });
    });
});

app.get('/saleOrders', function(req, res) {
    SellOrders.find(function(err, saleOrders) {
        if (err) res.send(err);
        res.json({
            saleOrders: saleOrders
        });
    });
});

app.post('/companies', function(req, res) {

    console.log(req.body);

    var company = new Companies({
        name: req.body.company.name,
        symbolURL: req.body.company.symbolURL,
        openPrice: req.body.company.openPrice,
        currentPrice: req.body.company.currentPrice,
        changeValue: req.body.company.changeValue,
        changeIcon: req.body.companychangeIcon,
        changePercentage: req.body.company.changePercentage,
        changeDirection: req.body.company.changeDirection,
        shareVolume: req.body.company.shareVolume
    });
    company.save(function(err) {
        if (err) res.send(err);
        res.status(201).json({
            companies: company
        });
    });
});
app.post('/buyOrders', function(req, res) {

    console.log(req.body);

    var buyOrder = new BuyOrders({
        timestamp: req.body.buyOrder.date,
        size: req.body.buyOrder.size,
        price: req.body.buyOrder.price,
        company: req.body.buyOrder.company
    });
    buyOrder.save(function(err) {
        if (err) res.send(err);
        res.status(201).json({
            buyOrders: buyOrder
        });
    })
});
app.post('/saleOrders', function(req, res) {

    console.log(req.body);

    var saleOrder = new SellOrders({
        timestamp: req.body.saleOrder.date,
        size: req.body.saleOrder.size,
        price: req.body.saleOrder.price,
        company: req.body.saleOrder.company
    });
    saleOrder.save(function(err) {
        if (err) res.send(err);
        res.status(201).json({
            buyOrders: saleOrder
        });
    })
});
app.post('/transactions', function(req, res) {

    console.log(req.body);

    var transaction = new Transactions({
        timestamp: req.body.transaction.date,
        size: req.body.transaction.size,
        price: req.body.transaction.price,
        company: req.body.transaction.company
    });
    transaction.save(function(err) {
        if (err) res.send(err);
        res.status(201).json({
            transaction: transaction
        });
    })
});


app.put('/companies/:company_id', function(req, res) {
    Companies.findById(req.params.company_id, function(err, company) {
        if (err) res.send(err);

        company.name = req.body.company.name,
        company.symbolURL = req.body.company.symbolURL,
        company.openPrice = req.body.company.openPrice,
        company.currentPrice = req.body.company.currentPrice,
        company.changeValue = req.body.company.changeValue,
        company.changeIcon = req.body.company.changeIcon,
        company.changePercentage = req.body.company.changePercentage,
        company.changeDirection = req.body.company.changeDirection,
        company.shareVolume = req.body.company.shareVolume;

        company.save(function(err) {
            if (err) res.send(err);
            res.status(201).json({
                companies: company
            });
        });
    });
});

app.delete('/buyOrders/:buyOrder_id', function(req, res) {
    BuyOrders.remove({
        _id: req.params.buyOrder_id
    }, function(err, buyOrder) {
        if (err) res.send(err);
        res.status(201).json({
            buyOrders: BuyOrders
        });
    });
});
app.delete('/saleOrders/:saleOrder_id', function(req, res) {
    SellOrders.remove({
        _id: req.params.saleOrder_id
    }, function(err, saleOrder) {
        if (err) res.send(err);
        res.status(201).json({
            saleOrders: SellOrders
        });
    });
});

// launch ======================================================================
app.listen(port)
console.log('The magic happens on port ' + port)