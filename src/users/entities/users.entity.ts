import { CategoryEntity } from "src/categories/entities/category.entity"
import { Role } from "src/common/enums/role.enums"
import { UserStatus } from "src/common/enums/status.enums"
import { TransactionEntity } from "src/transactions/entities/transaction.entity"
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"




@Entity()
export class UserEntity {


    @PrimaryGeneratedColumn()
    id!: number

    @Column({unique: true})
    email!: string
    
    @Column({unique: true})
    username!: string

    @Column()
    password!: string

    @Column({
        type: 'enum',
        enum: Role,
        default: Role.user
    })
    role!: Role

    @Column({
        type: 'enum',
        enum: UserStatus,
        default: UserStatus.active
    })
    status!: UserStatus
    
    @Column({
        type: "varchar",
        nullable: true
    })
    refreshTokenHash!: string | null
    
    @Column({
        type: 'timestamp',
        nullable: true
    })
    deletionScheduledAt!: Date | null

    @OneToMany(()=>CategoryEntity, category => category.user)
    categories!: CategoryEntity[]

    @OneToMany(()=>TransactionEntity, transaction=> transaction.user)
    transactions!: TransactionEntity[]

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}