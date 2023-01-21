import ModeToggle from './ModeToggle'

const Header = () => {
  return (
    <div className="flex items-center w-full p-2 bg-fetch-gold dark:bg-fetch-offWhite">
      <div className="flex grow-1 basis-1/3">
        <img
          className="w-24 sm:w-52 float-left"
          src="fetch.svg"
          alt="Fetch logo"
        />
      </div>
      <div className="flex justify-center grow-1 basis-1/3">
        <h1 className="justify-self-center text-2xl sm:text-5xl text-fetch-purple font-semibold">
          User Form
        </h1>
      </div>
      <div className="flex justify-end grow-1 basis-1/3">
        <ModeToggle />
      </div>
    </div>
  )
}

export default Header
