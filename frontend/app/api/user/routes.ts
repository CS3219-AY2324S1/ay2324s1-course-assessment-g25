import {PrismaClient} from '@prisma/client';
 
const prisma = new PrismaClient();
 
// Function to delete a user by ID
export async function deleteUserById(userId: string) {
  try {
    const deletedUser = await prisma.user.delete({
      where: {
        id: userId,
      },
    });
    console.log(`User with ID ${userId} deleted successfully.`);
    return deletedUser;
  } catch (error) {
    console.error(`Error deleting user: ${error}`);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
  }
}
 
// Function to update image for a user by ID
export async function updateUserImageById(userId: string, newImageUrl: string) {
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        image: newImageUrl,
      },
    });
    console.log(`User with ID ${userId} image updated.`);
    return updatedUser;
  } catch (error) {
    console.error(`Error updating user image: ${error}`);
  } finally {
    await prisma.$disconnect(); // Disconnect Prisma client after the operation
  }
}
 
//deleteUserById('userIdToDelete');
//updateUserImageById('userIdToUpdate', 'newImageUrl');