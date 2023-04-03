import { Model, DataTypes } from "sequelize";
import { Sequelize } from "sequelize";

class Order extends Model {
  public id!: number;
  public customerName!: string;
  public email!: string;
  public products!: { productId: number; quantity: number }[];
  public createdAt!: Date;
}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    products: {
      type: DataTypes.ARRAY(
        DataTypes.JSONB({
          allowNull: false,
        })
      ),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    Sequelize,
    tableName: "orders",
  }
);

export { Order };