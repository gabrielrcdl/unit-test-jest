/* eslint-disable prettier/prettier */
import { InputType } from "@nestjs/graphql";
import { IsNotEmpty, IsString, IsEmail } from "class-validator";


@InputType()
export class CreateUserInput{
    @IsString()
    @IsNotEmpty({message: 'Este campo não pode ser vazio'})
    name: string;


    @IsEmail({message: 'E-mail é obrigatório!'})
    @IsNotEmpty({message: 'Este campo não pode ser vazio'})
    email: string
}