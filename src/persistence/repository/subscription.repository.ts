import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { encryption } from 'src/utils/encryption';

// model Subscription {
//     id        String   @id @default(uuid())
//     userId    String  @unique
//     plan      Plan
//     period    SubscriptionPeriod
  
//     startDate DateTime @default(now())
//     endDate   DateTime
  
//     createdAt DateTime @default(now())
//     updatedAt DateTime @updatedAt
  
//     user      User     @relation(fields: [userId], references: [id])
//   }

@Injectable()
export class SubscriptionRepository
  extends PrismaClient
  implements OnModuleInit
{
  private readonly logger = new Logger(SubscriptionRepository.name);

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Connected to the database');
  }

    async createSubscription(data:any) {
        return this.subscription.create({data: data as any});
    }

    async findSubscriptionById(id: string) {
        return this.subscription.findUnique({ where: { id } });
    }

    async updateSubscription(id: string, data: any) {
        return this.subscription.update({ where: { id }, data });
    }

    async deleteSubscription(id: string) {
        return this.subscription.delete({ where: { id } });
    }

    async findAll() {
        return this.subscription.findMany();
    }

    async findOne(id: string) {
        return this.subscription.findUnique({ where: { id } });
    }


}
