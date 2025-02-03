interface UserFromLocalStorage {
    id: string;
    username: string;
    role: string;
}

/**
 * 
 * @param userId 
 * @param userData 
 * @returns bollean
 */
const compareUserId = (userId: string | undefined, userData: IUserInfo) => {
  return userId === userData.user?.id;
}

const getUserDataFromLocalStorage = (): UserFromLocalStorage | null => {
    if (typeof window !== 'undefined') {
        const user = window.localStorage.getItem("user");
        return user ? JSON.parse(user) : null;
    }
    return null;
}

export { 
    compareUserId,
    getUserDataFromLocalStorage
};