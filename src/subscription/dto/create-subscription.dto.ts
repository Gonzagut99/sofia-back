import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";
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
  

export class CreateSubscriptionDto {
    @ApiProperty({
        description: 'El plan del usuario',
        type: String,
        enum: ['FREE', 'PRO'],
        default: 'FREE',
    })
    @IsString()
    public plan: string;

    @ApiProperty({
        description: 'El ID del usuario',
        type: String,
    })
    @IsString()
    public userId: string;

    @ApiProperty({
        description: 'El periodo de la suscripción',
        type: String,
        enum: ['MONTHLY', 'YEARLY'],
    })
    @IsString()
    public period: string;

    @ApiProperty({
        description: 'La fecha de inicio de la suscripción',
        type: Date,
    })
    @IsOptional()
    public startDate: Date;

    @ApiProperty({
        description: 'La fecha de fin de la suscripción',
        type: Date,
    })
    public endDate: Date;
}
