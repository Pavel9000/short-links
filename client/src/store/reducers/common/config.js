
const initialState = {
    url: {
        // isDev: false,
        isDev: true,
        dev: {
            clientPort: ':3000',
            serverPort: ':5000',
            url: 'http://localhost'
            // url: 'http://127.0.0.1'
        }, 
        url: 'http://site.ru'
        // url: 'http://45.84.224.154'
    }
}

export default function configReducer(state = initialState, action) {
    switch (action.type) {
        
        default:
            return state
    }
}