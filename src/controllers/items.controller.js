import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req, res, next) {
  let body = req.body

  const allitems = await prisma.item.findMany({})
  req.result = allitems
  next()
}

async function getByRestaurantID(req, res) {
  try {
    const items = await prisma.item.findMany({
      where: {
        restaurantId: req.params.id
      }
    })
    res.status(200).json({
     items: items
    })
  }
  catch(e){
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: toString(e)
    })
  }
  
}



async function create(req, res) {
  let {
    name,
    description,
    price,
    offerPrice,
    onOffer,
    rating,
    restaurantId
  } = req.body

  try {
    const item = await prisma.item.create({
      data: {
        name: name,
        description: description,
        price: price,
        offerPrice: offerPrice,
        onOffer: onOffer,
        rating: rating,
        owner: { // Associate item with the provided restaurant
          connect: {
            id: restaurantId
          }
        }
      }
    })
    
    res.status(200).json({
      message: 'Succesfully created Item!',
      data: item
    })
  }
  catch (error ){
    console.error(error),
    res.status(500).json({      
      error: error
    })
  }
  
}

async function getByItemID(req, res) {

  try {
    const item = await prisma.item.findFirst({
      where: {
        id: req.params.id
      },
      include: {
        owner: true
      }
    })
    res.status(200).json({
      message: "Item found!",
      item: item
    })
  } catch (e) {
    console.error(e)
    res.status(500).json({
      error: 'Internal server error',
      errorMessage: e.toString()
    })
  }
}



async function updateAdmin(req, res) {
  const {
    name,
    newRole,
    newStatus
  } = req.body

  try {
    // Use Prisma Client to update the admin's role and status in the database
    const updatedAdmin = await prisma.item.update({
      where: {
        name: name // Use the admin ID to find the admin to update
      },
      data: {
        role: newRole, // Update the role
        status: newStatus // Update the status
      }
    });

    // Return the updated admin object
    res.status(200).json({
      message: 'Update successful',
      data: updatedAdmin
    })
  } catch (error) {
    // console.error('Error updating admin information:', error);
    
    // throw error; // Optionally, throw the error to be handled by the caller
    return res.status(500).json({
      error: 'Internal server error'
    })
  }

}



export default {
  create,
  getAll,
  getByRestaurantID,
  getByItemID,
  updateAdmin
}