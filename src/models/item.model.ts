import { Column, Table, Model } from 'sequelize-typescript';
import { UUIDV4 } from 'sequelize';

@Table
export class Item extends Model {
  @Column({ primaryKey: true, defaultValue: UUIDV4() })
  id: string;


}