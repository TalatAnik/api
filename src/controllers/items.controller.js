import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req, res, next) {
  let body = req.body

  const allitems = await prisma.item.findMany({
    include: {
      owner: {
        select: {
          id: true,
          name: true,
          bannerImg: false,
          description: true,
          createdAt: false,
          items: false,
          password: false
        }
       
      }
    }
    
  })
  req.result = allitems
  next()
}

async function getByRestaurantID(req, res) {
  try {
    const items = await prisma.item.findMany({
      include: {
        owner: true
      },
      where: {
        restaurantId: req.params.id,
        
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



async function updateItem(req, res) {
  let body = req.body

  try {
    // Use Prisma Client to update the admin's role and status in the database
    const updatedItem = await prisma.item.update({
      where: {
        name: body.name // Use the admin ID to find the admin to update
      },
      data: {
        ...body
      }
    });

    // Return the updated admin object
    res.status(200).json({
      message: 'Update successful',
      data: updatedItem
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
  updateItem
}