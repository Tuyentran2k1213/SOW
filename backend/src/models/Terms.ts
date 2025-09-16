import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../database';

export class Terms extends Model {
  public id!: number;
  public language!: string;
  public title!: string;
  public content!: string;
  public section!: string;
  public order!: number;
}

Terms.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    language: {
      type: DataTypes.STRING(2),
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    section: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Terms',
    tableName: 'terms',
    timestamps: true,
  }
);