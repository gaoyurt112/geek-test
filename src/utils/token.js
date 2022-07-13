const Token_key = 'geek-pc'

const getToken = () => localStorage.getItem(Token_key)
const setToken = (token) => localStorage.setItem(Token_key, token)
const removeToken = () => localStorage.removeItem(Token_key)

export { getToken, setToken, removeToken }