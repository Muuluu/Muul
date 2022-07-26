import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { InstanceUpdateOptions } from 'sequelize/types';

@Table
export class User extends Model {
  @Column({primaryKey:true})
  id: string;

  @Column
  firstName: string;

  @Column
  userName: string;

  @Column({ defaultValue: true })
  isActive: boolean;
}