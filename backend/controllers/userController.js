const { expense } = require('../config/database')
const prisma = require('../config/database')

export const userController ={
  getProfile: async(req, res)=>{
    try{
      const userId = req.user.id 
      const user = await prisma.user.findUnique({
        where:{id:userId},
        select:{
          id:true,
          email: true,
          createdAt: true,
          updatedAt: true,
          _count:{
            select:{
              expenses:true,
              incomes:true,
              categories: true
            }
          }
        }
      })
      if(!user){
        return res.status(404).json({error:'User not found man'});
        }
        res.status(200).json(user)
      }catch{error}{
        console.error('Error to get profile:',error);
        res.status(500).json({error: 'Internal server error'})
        
      }
    }
  }

