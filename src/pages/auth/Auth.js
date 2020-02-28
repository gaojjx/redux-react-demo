export const Auth = {
    isAuthenticated: false,
    authenticate(userInfo) {
        Auth.isAuthenticated = true
        localStorage.setItem('isAuthenticated', true)
        localStorage.setItem('token', userInfo.token)
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    signout() {
        Auth.isAuthenticated = false
        localStorage.removeItem('token')
    }
}