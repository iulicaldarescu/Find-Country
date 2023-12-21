import { IoIosSearch } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../utils/api";
import { Link } from "react-router-dom";
import { useState } from "react";

function Countries() {
  const [region, setRegion] = useState("Filter by region");
  const [input, setInput] = useState("");

  const { data: countries, isLoading } = useQuery({
    queryFn: () => fetchData("https://restcountries.com/v3.1/all"),
    queryKey: ["countries"],
  });

  if (isLoading) {
    return (
      <div role="status" className="flex justify-center mt-44">
        <svg
          aria-hidden="true"
          className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  // useEffect(() => {
  //   console.log(region);
  // }, [region]);
  const focusInput = () => {};

  return (
    <div className="bg-slate-700 h-full pb-32">
      <div>
        {/* input build */}
        <div className="flex justify-center">
          <div className="bg-slate-500 flex items-center mt-7 p-5 w-11/12 gap-4">
            <div onClick={focusInput}>
              <IoIosSearch color={"white"} size={"1.5rem"} />
            </div>

            <input
              type="text"
              className=" text-white  bg-slate-500"
              placeholder="Search for a country"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            ></input>
          </div>
        </div>

        {/* filter build */}
        <div>
          <select
            id="regions"
            className="bg-slate-500  text-white text-sm ml-4 block w-1/2 p-2 mt-4"
            onChange={(e) => setRegion(e.target.value)}
          >
            <option defaultValue={"Filter by"}>Filter by region</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="America">America</option>
            <option value="Oceania">Oceania</option>
            <option value="Africa">Africa</option>
          </select>
        </div>
      </div>

      {/* displaying the countries */}

      <div className="grid gap-10 lg:grid-cols-4 mt-10">
        {countries
          .filter(
            (country: any) =>
              (region === "Filter by region" || country.region === region) &&
              country.name.common.toLowerCase().startsWith(input.toLowerCase())
          )
          .map((country: any) => {
            return (
              <article key={country.name.official} className="px-7 text-white">
                <div className="bg-slate-500 rounded-lg">
                  <Link
                    to={{
                      pathname: `/${encodeURIComponent(
                        country.name.common.trim()
                      )}`,
                      search: `?lat=${country.latlng[0]}&lng=${country.latlng[1]}`,
                    }}
                  >
                    <img
                      src={country.flags.png}
                      className="w-full h-[180px] rounded-t-lg"
                      alt={country.name.official}
                    ></img>
                  </Link>

                  <div className="pl-7 pb-10">
                    <p className="text-xl font-bold py-6">
                      {country.name.common}
                    </p>
                    <p className="font-semibold">
                      Population:{" "}
                      <span className="font-normal">
                        {country.population.toLocaleString()}
                      </span>
                    </p>
                    <p className="font-semibold">
                      Region:{" "}
                      <span className="font-normal">{country.region}</span>{" "}
                    </p>
                    <p className="font-semibold">
                      Capital:{" "}
                      <span className="font-normal">{country.capital}</span>{" "}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
      </div>
    </div>
  );
}

export default Countries;
