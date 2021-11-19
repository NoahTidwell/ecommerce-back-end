// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Associations

Product.belongsTo(Category, {
  foreignKey: 'category_id'
});

Category.hasMany(Product, {
  foreignKey: 'category_id'
});

ProductTag.belongsTo(Tag, {
  foreignKey: 'tag_id'
});

ProductTag.belongsTo(Product, {
  foreignKey: "product_id"
});

Tag.hasMany(ProductTag, {
  foreignKey: 'tag_id'
});

Product.hasMany(ProductTag, {
  foreignKey: 'product_id'
});

Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
