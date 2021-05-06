const Sequelize = require('sequelize');
const db = require('./database.js');


const Product = db.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  slogan: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  category: {
    type: Sequelize.STRING
  },
  default_price: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

const Feature = db.define('feature', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  feature: {
    type: Sequelize.STRING,
    allowNull: true
  },
  value: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Feature.belongsTo(Product);

const Style = db.define('style', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  name: {
    type: Sequelize.STRING
  },
  original_price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sale_price: {
    type: Sequelize.STRING,
    allowNull: true
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Style.belongsTo(Product);

const Sku = db.define('sku', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  size: {
    type: Sequelize.STRING
  },
  quantity: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Sku.belongsTo(Style);

const Photo = db.define('photo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  fullsize_url: {
    type: Sequelize.STRING
  },
  thumbnail_url: {
    type: Sequelize.STRING
  },
  createdAt: {
    type: Sequelize.STRING,
    allowNull: true
  },
  updatedAt: {
    type: Sequelize.STRING,
    allowNull: true
  }
});

Photo.belongsTo(Style);

module.exports = { Product, Feature, Style, Sku, Photo };




