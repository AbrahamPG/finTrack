import { CategoryEntity } from "src/categories/entities/category.entity";
import { TransactionType } from "src/common/enums/transaction.enums";
import { UserEntity } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
export class TransactionEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column({
        type: 'numeric',
        precision: 12,
        scale: 2,
    })
    amount!: number

    @Column({
        type: 'enum',
        enum: TransactionType,
    })
    type!: TransactionType

    @Column()
    description!: string

    @Column({
        type: 'date'
    })
    date!: Date

    @ManyToOne(()=>UserEntity, user=>user.transactions)
    @JoinColumn()
    user!: UserEntity

    @ManyToOne(()=>CategoryEntity, category=>category.transactions)
    @JoinColumn()
    category!: CategoryEntity

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date


}