import { Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";



@Injectable()
export class CategoriesRepository {

    constructor(
        @InjectRepository(CategoryEntity)
        private readonly repository: Repository<CategoryEntity>
    ){}


    async findAllByUser(userId: number): Promise<CategoryEntity[]> {
    return this.repository.find({
        where: {
        user: {
            id: userId,
        },
        },
    });
    }

    async findByIdAndUser (categoryId: number, userId: number): Promise<CategoryEntity | null>{
        return this.repository.findOne({
            where:{
                id: categoryId,
                user:{
                    id: userId
                }
            }
        })
    }

    async findByNameAndUser (categoryName: string, userId: number): Promise<CategoryEntity | null>{
        return this.repository.findOne({
            where:{
                name: categoryName,
                user:{
                    id: userId
                }
            }
        })
    }


    async create(data: Partial<CategoryEntity> ): Promise<CategoryEntity>{
        return this.repository.save(data)
    }

    async save(data: Partial<CategoryEntity>): Promise <CategoryEntity>{
        return this.repository.save(data)
    }


    async remove(category: CategoryEntity): Promise<void> {
        await this.repository.remove(category);
    }





}