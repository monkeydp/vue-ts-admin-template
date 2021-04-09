export default interface Model<T extends Model<T>> {
    id: number;
    createdAt: string;
    updatedAt: string;
    createdAtPretty: string;
    updatedAtPretty: string;
}

export abstract class BaseModel<T extends BaseModel<T>> implements Model<T> {
    id!: number
    createdAt!: string
    updatedAt!: string
    createdAtPretty!: string
    updatedAtPretty!: string
}
