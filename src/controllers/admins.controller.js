import {
  PrismaClient
} from '@prisma/client'

const prisma = new PrismaClient()

async function getAll(req, res, next) {
  let body = req.body

  const users = await prisma.admin.findMany({})
  req.result = users
  next()
}

async function create(req, res, next) {
  let body = req.body

  try {
    const existingUser = await prisma.admin.findFirst({
      where: {
        name: body.name
      }

    })
    if (existingUser !== null) {
      return res.status(401).json({
        error: "Admin name already exists"
      })
    }

    const user = await prisma.admin.create({
      data: body
    })
    
    res.status(200).json({
      message: 'Succesfully created admin',
      data: user
    })
  }
  catch (error ){
    console.error(error),
    res.status(500).json({      
      error: error
    })
  }
  
}

async function getByName(req, res, next) {

  const user = await prisma.admin.findUnique({
    where: {
      name: req.params.name
    }
  })
  req.result = user
  next()
}

async function login(req, res) {
  const {
    name,
    password
  } = req.body

  try {
    // Query the database for a user with the provided studentID
    const user = await prisma.admin.findUnique({
      where: {
        name: name
      }
    });

    // If user not found, return an error response
    if (!user) {
      return res.status(401).json({
        error: 'Invalid name or password'
      })
    }

    // Compare the provided password with the stored hashed password
    // const passwordMatch = await bcrypt.compare(password, user.password);
    const passwordMatch = password === user.password

    // If password doesn't match, return an error response
    if (!passwordMatch) {
      return res.status(401).json({
        error: 'Invalid name or password'
      })
    }

    // If authentication is successful, respond with a success message
    res.status(200).json({
      message: 'Login successful',
      user: user
    })

  } catch (error) {
    // Handle any errors during the process
    console.error('Error during login:', error);
    res.status(500).json({
      error: 'Internal server error'
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
    const updatedAdmin = await prisma.admin.update({
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
  getByName,
  login,
  updateAdmin
}