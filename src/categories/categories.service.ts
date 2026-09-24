import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { CategoriesRepository } from "./categories.repository";
import { CreateCategoryDto } from "./dtos/create-category.dto";
import { UserRepository } from "src/users/user.repository";
import { CategoryEntity } from "./entities/category.entity";
import { UpdateCategoryDto } from "./dtos/update-category.dto";




@Injectable()
export class CategoriesService{


    constructor(
        private readonly categoriesRepository : CategoriesRepository,
        private readonly userRepository : UserRepository,
    ){}


    async create(userId: number, dto: CreateCategoryDto ){

        const existingCategory = await this.categoriesRepository.findByNameAndUser(dto.name, userId)
        if(existingCategory) throw new ConflictException('CATEGORY ALREADY EXIST FOR THIS USER')
        
        const user = await this.userRepository.findById(userId)
        if(!user) throw new NotFoundException('Does not exist user')
        //AUNQUE SERIA RARO PORQUE SI ENTRASTE CON JWT DEBERIA EXISTIR BRO

        // const newCategory = new CategoryEntity

        // newCategory.name = dto.name,
        // newCategory.user = user

        // return await this.categoriesRepository.create(newCategory)

    
        return this.categoriesRepository.create({
            name: dto.name,
            user: user,
        });
    }


    getAllCategoriesByUser(userId: number){
        return this.categoriesRepository.findAllByUser(userId)
    }


    async findByIdAndUser(categoryId:number, userId: number){
        const exist = await this.categoriesRepository.findByIdAndUser(categoryId, userId)
        if(!exist) throw new NotFoundException('DOES NOT EXISTS CATEGORIES FOR THIS USER')

        return exist
        
    }


    async update(categoryId:number, userId: number, dto:UpdateCategoryDto){
        const category = await this.categoriesRepository.findByIdAndUser(categoryId, userId)
        if(!category) throw new NotFoundException('Category does not exist with this user')
        
          
        if(dto.name){
            const normalizedName = dto.name.toLowerCase().trim()
            const existCategory = await this.categoriesRepository.findByNameAndUser(normalizedName, userId)

            if(existCategory && existCategory.id!== category.id){
                throw new ConflictException('Category already exists')
            }

        category.name = normalizedName
        }

        return this.categoriesRepository.save(category)

    }


    async remove(categoryId: number, userId: number){
        const existingCategory = await this.categoriesRepository.findByIdAndUser(categoryId,userId)
        if(!existingCategory) throw new NotFoundException('Does not exist category for this User')
            
        await this.categoriesRepository.remove(existingCategory)
        return {
            message: 'Category removed successfully'
        }
    }



}