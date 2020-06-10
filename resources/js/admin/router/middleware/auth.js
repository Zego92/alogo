import store from '../../store'
export default function auth ({next}){
    if(!store.state.auth.isAuth)
    {
        if(!localStorage.getItem('userId'))
        {
            return next({name: 'Login'})
        }
    }
    return next()
}
