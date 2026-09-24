import { AppDataSource } from '../config/data-source';
import { CategoryEntity } from '../categories/entities/category.entity';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/entities/users.entity';
import { Role } from 'src/common/enums/role.enums';
import { UserStatus } from 'src/common/enums/status.enums';

async function seed() {
  await AppDataSource.initialize();

  console.log('Database connected');

  const userRepository = AppDataSource.getRepository(UserEntity);
  const categoryRepository = AppDataSource.getRepository(CategoryEntity);

  const adminPassword = await bcrypt.hash('Admin123!', 10);
  const userPassword = await bcrypt.hash('User123!', 10);

  let admin = await userRepository.findOne({
    where: { email: 'admin@fintrack.com' },
  });

  if (!admin) {
    admin = userRepository.create({
      email: 'admin@fintrack.com',
      username: 'admin',
      password: adminPassword,
      role: Role.admin,
      status: UserStatus.active,
    });

    admin = await userRepository.save(admin);
    console.log('Admin created');
  }

  let user = await userRepository.findOne({
    where: { email: 'user@fintrack.com' },
  });

  if (!user) {
    user = userRepository.create({
      email: 'user@fintrack.com',
      username: 'user',
      password: userPassword,
      role: Role.user,
      status: UserStatus.active,
    });

    user = await userRepository.save(user);
    console.log('User created');
  }

  const categories = [
    { name: 'alimentación', user: admin },
    { name: 'transporte', user: admin },
    { name: 'salario', user: admin },
    { name: 'alimentación', user },
    { name: 'transporte', user },
    { name: 'salario', user },
  ];

  for (const categoryData of categories) {
    const existingCategory = await categoryRepository.findOne({
      where: {
        name: categoryData.name,
        user: { id: categoryData.user.id },
      },
    });

    if (!existingCategory) {
      const category = categoryRepository.create(categoryData);
      await categoryRepository.save(category);
    }
  }

  console.log('Seed completed');

  await AppDataSource.destroy();
}

seed();