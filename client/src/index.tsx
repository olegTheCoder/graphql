import {createRoot} from 'react-dom/client'
import {App} from './components/App'
import {ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client'

const client = new ApolloClient({uri:'http://localhost:4000/graphql', cache: new InMemoryCache()})

const root = document.getElementById('root')

if (!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

container.render(
<ApolloProvider client={client}>
    <App />
</ApolloProvider>
)
