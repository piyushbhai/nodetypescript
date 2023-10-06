import { Table, Model, Column, DataType } from "sequelize-typescript";

@Table({
  timestamps: false,
  tableName: "category",
})
export class Category extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  category_name!: string; 

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  parent_category!: string;
}
