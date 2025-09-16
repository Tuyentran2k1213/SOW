import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Product extends Model {
  public id!: number;
  public articleNo!: string;
  public productService!: string;
  public inPrice!: number;
  public price!: number;
  public unit!: string;
  public inStock!: number;
  public description!: string;
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    articleNo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    productService: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    unit: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    inStock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Product',
    tableName: 'products',
    timestamps: true,
  }
);