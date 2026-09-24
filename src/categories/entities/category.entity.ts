import { TransactionEntity } from "src/transactions/entities/transaction.entity";
import { UserEntity } from "src/users/entities/users.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";




@Entity()
@Unique(['user', 'name'])
export class CategoryEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string

    @ManyToOne(()=>UserEntity, user => user.categories,
    {
        onDelete: 'CASCADE'
    }
    )
    @JoinColumn()
    user!: UserEntity 

    @OneToMany(()=>TransactionEntity, transaction=>transaction.category)
    transactions!: TransactionEntity[]

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}