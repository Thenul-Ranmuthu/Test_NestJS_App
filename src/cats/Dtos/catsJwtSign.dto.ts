// import { IsInt, IsString } from "class-validator";

// export class CatsJwtSignDto{
//     @IsInt()
//     id!: number

//     @IsString()
//     email!: string

//     set catId(ID: number){
//         this.id = ID
//     }

//     set catEmail(em: string){
//         this.email = em
//     }
// }

export interface CatJwtSignDto {
  id: number;
  email: string;
}
