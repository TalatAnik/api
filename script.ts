import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main () {
  // const user = await prisma.user.create({ data: { name: "Anik"} })

  const user = await prisma.user.create({ 
    data: {
      name: "Manik",
      email:" stqh@email.com",
      password: "sddddd",
      phone: "0177778",
      studentID: "11157"
    } 
  })

  console.log(user)
  
}


main()
  .catch(e => {
    console.log(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })