import { IsEmail, IsOptional, IsString, IsUrl, Min, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
    @ApiProperty({
        description: 'El nombre del usuario',
        type: String,
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    public name: string;

    @ApiProperty({
        description: 'El apellido del usuario',
        type: String,
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    public lastname: string;

    @ApiProperty({
        description: 'El correo electrónico del usuario',
        type: String,
        minLength: 12,
    })
    @IsString()
    @MinLength(12)
    @IsEmail()
    public email: string;

    @ApiProperty({
        description: 'La contraseña del usuario',
        type: String,
        minLength: 6,
    })
    @IsString()
    @MinLength(6)
    public password: string;

    @ApiProperty({
        description: 'La URL de la imagen de perfil del usuario',
        type: String
    })
    @IsString()
    @IsUrl()
    @IsOptional()
    public avatarUrl?: string;

    @ApiProperty({
        description: 'El nombre de usuario del usuario',
        type: String,
        minLength: 3,
    })
    @IsString()
    @MinLength(3)
    @IsOptional()
    public username?: string;
}

export class CreateGoogleUserDTO extends CreateUserDto {
    @ApiProperty({
        description: 'La contraseña del usuario',
        type: String,
        minLength: 0,
    })
    @IsString()
    @MinLength(0)
    public password: string;
}