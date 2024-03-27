import AOSLogo from "./components/AOSLogo";
import SearchIcon from "./components/SearchIcon";
import SmallPlus from "./components/SmallPlus";

function HomePage() {
  return (
    <div className="flex flex-col fixed left-0 top-0 right-0 bottom-0 font-roboto-mono text-primary-dark-color bg-bg-color text-sm">
      <div className="flex justify-between p-5 border-b-1 border-light-gray-color">
        <AOSLogo />
      </div>
      <div className="grid grid-cols-[11.5rem,auto] flex-grow">
        <div className="flex flex-col gap-5 py-5 border-r-1 border-light-gray-color">
          <div className="flex flex-col gap-2.5 px-5">
            <span className="uppercase">MY PROCESSES</span>
            <div className="flex flex-col gap-1.5">
              <label className="relative" htmlFor="searchProcesses">
                <input
                  type="text"
                  name="searchProcesses"
                  placeholder="Search"
                  className="w-full pr-3 pl-8 py-2 
                  outline outline-light-gray-color bg-bg-color outline-1 rounded-smd 
                  leading-none font-dm-sans 
                  placeholder:text-gray-text-color
                  focus:outline-primary-dark-color
                  peer transition-colors"
                ></input>
                <SearchIcon className="absolute left-2.5 top-0 bottom-0 m-auto transition-colors text-gray-text-color peer-focus:text-primary-dark-color" />
              </label>
              <button className="flex justify-center items-center gap-1.5 bg-primary-dark-color text-bg-color uppercase py-2 px-3.5 rounded-smd">
                <SmallPlus />
                <span>Add Process</span>
              </button>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default HomePage;
