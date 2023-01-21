import './App.css'
import Header from './components/Header'
import UserForm from './components/UserForm'
import TailwindToaster from './components/TailwindToaster'

function App() {
  return (
    <main className="bg-fetch-offWhite dark:bg-fetch-purple h-full">
      <Header />
      <div className="p-5">
        <UserForm />
        <TailwindToaster />
      </div>
    </main>
  )
}

export default App
