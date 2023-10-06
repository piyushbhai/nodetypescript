import { Table, Model, Column, DataType, BeforeCreate, BeforeUpdate } from "sequelize-typescript";
const bcrypt = require("bcrypt")
const saltRounds = 10;

@Table({
  timestamps: false,
  tableName: "users",
})
export class Users extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  last_name!: string;
  
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;
 
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;
 
  @Column({
    type: DataType.INTEGER,
  })
  mobile!: number;
  
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profileImage?: string;
  
  @BeforeCreate
  static hashPassword(user: Users) {
    if (user.password) {            
        var salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
        // console.log(user.password);
        
    }
  }
 
  @BeforeUpdate
  static hashPasswordBeforeUpdate(user: Users) {
    if (user.password) {            
        var salt = bcrypt.genSaltSync(saltRounds);
        user.password = bcrypt.hashSync(user.password, salt);
    }
}
}
