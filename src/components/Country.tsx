import { useParams, Link } from "react-router-dom";
import { fetchData } from "../utils/api";
import { useQuery } from "@tanstack/react-query";
import Map from "./Map";

function Country() {
  const { countryName } = useParams();

  const { data: country, isLoading } = useQuery({
    queryFn: () =>
      fetchData(`https://restcountries.com/v3.1/name/${countryName}`),
    queryKey: ["country", countryName],
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

  return (
    <div className="bg-gray-300 dark:bg-slate-700 h-full sm:px-10">
      <Link to={"/"}>
        <div className="px-5 pt-10">
          <button className="bg-gray-100 dark:text-white dark:bg-slate-500 px-5">
            Back
          </button>
        </div>
      </Link>

      {/* country info */}
      <div className="pb-20 sm:w-3/4  md:flex md:gap-10">
        <div className="py-10 flex justify-center px-5">
          <img
            src={country[0].flags.png}
            className="w-full h-[180px]"
            alt={country[0].name.official}
          ></img>
        </div>

        <div className="pt-8">
          {/* first block of details */}
          <div className="text-black dark:text-white px-5">
            <p>
              Native name:{" "}
              <span className="text-cyan-800 dark:text-slate-300 ">
                {country[0].name.official}
              </span>
            </p>
            <p>
              Population:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {country[0].population.toLocaleString()}
              </span>
            </p>
            <p>
              Region:{" "}
              <span className=" text-cyan-800 dark:text-slate-300">
                {country[0].region}
              </span>
            </p>
            <p>
              Sub Region:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {country[0].subregion}
              </span>
            </p>
            <p>
              Capital:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {country[0].capital}
              </span>
            </p>
          </div>

          {/* second block of details */}
          <div className=" dark:text-white px-5 pb-10">
            <p>
              Domain:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {country[0].tld[0]}
              </span>
            </p>
            <p>
              Currencies:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {Object.keys(country[0]?.currencies).join(" ")}
              </span>
            </p>

            <p>
              Languages:{" "}
              <span className="text-cyan-800 dark:text-slate-300">
                {Object.keys(country[0]?.languages).join(" ")}
              </span>
            </p>
          </div>
        </div>

        {/* border countries block */}
      </div>
      <div className="dark:text-white px-5 pb-10">
        <p className="font-bold">Border Countries:</p>

        <div className="flex gap-5 py-5">
          {!country[0].borders && <p>No border countries to display</p>}
          {country[0]?.borders?.map((borderCountry: string) => (
            <p
              key={borderCountry}
              className=" bg-gray-100 dark:bg-slate-500 px-3"
            >
              {borderCountry}
            </p>
          ))}
        </div>
      </div>
      {/* map integration */}
      <div className="md:w-full pb-14">
        <Map></Map>
      </div>
    </div>
  );
}

export default Country;
