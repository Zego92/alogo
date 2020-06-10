import store from '../../store'
export default function guest ({ next })
{
    if(store.state.auth.isAuth)
    {
        if (localStorage.getItem('userId'))
        {
            return next({name: 'Dashboard'})
        }
    }
    return next()
}
