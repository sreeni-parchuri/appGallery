var productManager = require('../view_controllers/productManager');


module.exports = function(app) {
  
  app.get('/:page', function(req, res){
    res.render(req.params.page, {'products' : [
      {'Name' : 'Are we Related?', 'Category' : 'Android', 'imagePath' : 'img/product1.jpg', 'categoryBtn' : ['android', 'tree access'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
      {'Name' : 'Family Map', 'Category' : 'iPhone &amp; iPad', 'imagePath' : 'img/product2.jpg', 'categoryBtn' : ['iphone', 'ipad'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
      {'Name' : 'MagiPhoto for Mobile Phone Users', 'Category' : 'Windows Phone', 'imagePath' : 'img/product3.jpg', 'categoryBtn' : ['windows phone'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.'},
      {'Name' : 'Legacy Mobile for IOS', 'Category' : 'iPhone &amp; iPad', 'imagePath' : 'img/product4.jpg', 'categoryBtn' : ['iphone'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content.'},
      {'Name' : 'MobileFamilyTree', 'Category' : 'iPhone', 'imagePath' : 'img/product5.jpg', 'categoryBtn' : ['iphone'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content.'},
      {'Name' : 'RootsMagic for IOS', 'Category' : 'iPhone &amp; iPad', 'imagePath' : 'img/product6.jpg', 'categoryBtn' : ['iphone', 'ipad'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content.'},
      {'Name' : 'iLived', 'Category' : 'iPhone &amp; iPad', 'imagePath' : 'img/product7.jpg', 'categoryBtn' : ['iphone', 'ipad'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content.'},
      {'Name' : 'BillionGraves', 'Category' : 'Android', 'imagePath' : 'img/product8.jpg', 'categoryBtn' : ['Android'], 'Desc' : 'It is a long established fact that a reader will be distracted by the readable content.'}
      ],
      'viewCategory' : [
       {'categoryName' : 'Viewing all categories', 'categoryValue' : '1'}, 
       {'categoryName' : 'View category1', 'categoryValue' : '2'}, 
       {'categoryName' : 'View category2', 'categoryValue' : '3'}
      ],
      'viewPlatform' : [
       {'platformName' : 'Viewing all Platforms', 'platformValue' : '1'},
       {'platformName' : 'IOS', 'platformValue' : '2'},
       {'platformName' : 'Android', 'platformValue' : '3'},
       {'platformName' : 'Windows', 'platformValue' : '4'}
      ]
    });
  });
  app.get('/', function(req, res){
    res.render("index", {});
  });
  app.post("/products", function (req,res) {
    productManager.create(req.body);
    console.log(req.body);
    res.status(201);
    res.set("Location","http://localhost:5000/products/list/" + req.body.prodKey);
    res.send("");
  });

  app.get("/products/:prodKey", function (req,res) {
    var product = productManager.read(req.params.prodKey);
    console.log(product);
    if(product) {
      res.status(200);
      res.send(product);
    } else {
      res.status(404);
    }

  });
}
