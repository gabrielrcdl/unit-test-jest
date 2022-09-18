/* eslint-disable prettier/prettier */
import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEmail, IsOptional } from "class-validator";


@InputType()
export class UpdateUserInput{
    @IsString()
    @IsNotEmpty({message: 'Este campo não pode ser vazio'})
    // Aplica as validações acima apenas se o nome for passado
    @IsOptional()
    name?: string;


    @IsEmail({message: 'E-mail é obrigatório!'})
    @IsNotEmpty({message: 'Este campo não pode ser vazio'})
    email?: string
}