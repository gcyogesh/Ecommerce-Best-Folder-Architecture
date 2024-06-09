import bcryptjs from 'bcryptjs'


export const hashPassword = (password:string) =>{
    const saltRounds = 10;
    const hashedPassword = bcryptjs.hashSync(password, saltRounds)
    return hashedPassword;
}

export const comparePassword = (password:string, hashedPassword:string) =>{
    return bcryptjs.compareSync(password, hashedPassword)

}

