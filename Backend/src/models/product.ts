import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "products",
})
export class Products extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  product_name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  image!: string;
 
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  categories!: string;
}
