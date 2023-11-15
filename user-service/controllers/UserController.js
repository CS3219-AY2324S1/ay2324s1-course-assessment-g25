import { User } from '../data-sources/cloudSQL/Model/UserModel'

export const updateUser = async (req, res, next) => {
  try {
    const image = req.body.image
    const email = req.params.email

    const user = await User.findOne({where: {email: email}})
    if (!image) {
      res.status(404).json({error: "image link is empty"})
    }
    user.image = image
    await user.save();
    res.status(200).json({res: user})
  } catch (err) {
    next(err)
  }
}

export const deleteUser = async (req, res, next) => {
  try {
  const id = req.params.id
  await User.destroy({where: {id: id}})
  res.sendStatus(204)
  } catch (err) {
    next(err)
  }
} 
