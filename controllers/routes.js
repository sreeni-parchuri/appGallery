module.exports = function(app) {
  
  /* Optionally include this to use this alternative template when wanting to create your own header and footer
  app.set("view options", {
    layout: "layout/layout-skills"
  });
  */
  
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
}
